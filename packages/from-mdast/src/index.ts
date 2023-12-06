import type { Point } from 'unist';
import { position, pointEnd, pointStart } from 'unist-util-position';
import type { Root as MdastRoot, PhrasingContent, RootContent } from 'mdast';
import { MddlDocumentation, MddlObject, MddlParameter } from '@mddl/ast';
import { name } from 'estree-util-is-identifier-name'
import { inspect } from 'unist-util-inspect'

export function toMddl(tree: MdastRoot): MddlDocumentation {
    const documentation = new MddlDocumentation({
        position: position(tree)
    });

    let i = 0;
    while (i < tree.children.length) {
        const child = tree.children[i];
        if (child.type === 'heading') {
            let endPoint = pointEnd(child);
            if (child.children.length !== 1) {
                throw new Error(`Expected heading to only contain text 'Object: <Identifier>'`);
            }

            const text = child.children[0];

            if (text.type !== 'text' || !text.value.startsWith('Object: ')) {
                throw new Error(`Expected heading to match: 'Object: <Identifier>'`)
            }

            const identifier = text.value.slice(8);

            // if there are no more nodes, bail early.
            // also, increment `i` to the next node here
            if (i++ >= tree.children.length) {
                continue;
            }

            // scan remaining nodes for the next 'heading' node
            const nextHeadingNodeIndex = tree.children.findIndex((n, j) => j>=i && n.type === 'heading');

            let description: RootContent[] = [], parameters: MddlParameter[] = [];

            if (nextHeadingNodeIndex === -1) {
                // there exist more nodes (we bailed early above), and they are all non-heading
                ({ description, parameters, endPoint } = transformObjectContents({ nodeSlice: tree.children.slice(i)}));
                i = tree.children.length;
            } else {
                // there exists another heading node at `nextHeadingNodeIndex`. slice the ones between and process before continuing
                ({ description, parameters, endPoint } = transformObjectContents({ nodeSlice: tree.children.slice(i, nextHeadingNodeIndex)}));
                i = nextHeadingNodeIndex;
            }

            const object = new MddlObject({
                children: description,
                identifier,
                parameters,
                position: {
                    start: pointStart(child)!,
                    end: endPoint
                }
            })

            documentation.children.push(object);
        } else {
            throw new Error(`Unhandled node type: ${child.type}`)
        }
    }

    return documentation;
}

function transformObjectContents ({ nodeSlice }: { nodeSlice: RootContent[] }): { description: RootContent[], parameters: MddlParameter[], endPoint: Point } {
    let parameters: MddlParameter[] = [];

    // the last paragraph node sibling should be the one containing 'Parameters:'
    const parametersParagraphNodeIndex = nodeSlice.findIndex(node =>
        node.type === 'paragraph'
        && node.children.length > 0
        && node.children[0].type === 'text'
        && node.children[0].value === 'Parameters:'
    );

    // slice the nodes between the heading and the potential parameters list - these are the description nodes
    const description = parametersParagraphNodeIndex === -1 ? nodeSlice.slice(0) : nodeSlice.slice(0, parametersParagraphNodeIndex);

    let endPoint = pointEnd(description[description.length - 1])!;

    const parameterListNode = nodeSlice[parametersParagraphNodeIndex+1];
    // the following node is a list, and contains children
    if (parameterListNode.type === 'list' && parameterListNode.children.length > 0) {
        // List node children are always ListItem nodes, no need to check
        for (const parameterListItemNode of parameterListNode.children) {
            // ListItem nodes can contain lots of stuff, at a minimum they need to contain _something_ in order for it to potentially be a parameter
            if (parameterListItemNode.children.length > 0) {
                // The minimum parameter text is "**<Identifier>** - `<Type>`".
                // This will parse as a Paragraph node containing at least:
                // - a Strong node containing the identifier
                // - a Text node containing the "-" character
                // - a InlineCode node containing the type
                const parameterParagraphNode = parameterListItemNode.children[0];
                if (parameterParagraphNode.type === 'paragraph' && parameterParagraphNode.children.length >= 3) {
                    let parameterIdentifier, parameterType;

                    // Identifier will be the first child, must be within a Strong node, and must contain a single Text node child
                    const parameterIdentifierNode = parameterParagraphNode.children[0];
                    if (parameterIdentifierNode.type === 'strong' && parameterIdentifierNode.children.length > 0 && parameterIdentifierNode.children[0].type === 'text') {
                        // Validate the text as an ECMAScript identifier
                        parameterIdentifier = parameterIdentifierNode.children[0].value;
                        if (!name(parameterIdentifier)) {
                            throw new Error(`Invalid JavaScript identifier`)
                        }
                    } else {
                        throw new Error(`Invalid parameter identifier`);
                    }

                    // Type will be the third child, must be within an Inline Code node, and will be accessible via the `value` property
                    const parameterTypeNode = parameterParagraphNode.children[2];
                    if (parameterTypeNode.type === 'inlineCode') {
                        // TODO:
                        // Validate the value as an TypeScript Type Expressions
                        parameterType = parameterTypeNode.value;
                    } else {
                        throw new Error(`Invalid parameter type`);
                    }

                    // TODO:
                    // Optionally, check for the `_optional_` flag, `Default:` value, and Description (list item node will have at least more than 3 children)
                    let parameterDescription: PhrasingContent[] = [];
                    let parameterOptional = false;
                    let parameterDefaultValue;
                    if (parameterParagraphNode.children.length > 3) {
                        // At a minimum the next node after InlineCode should be a Text node starting with the ` - `.
                        // It could only contain that, indicating that the subsequent node could be the Emphasis containing `_optional_`,
                        // or that the start of the Description is not plain text (such as `_The parameter_ description starting with emphasis`)
                        let i = 3;
                        let nextNode = parameterParagraphNode.children[i];
                        if (nextNode.type === 'text') {
                            if (nextNode.value === ` - `) {
                                // direct match indicates next node is either the Emphasis with `_optional_`, or the start of a Description
                                nextNode = parameterParagraphNode.children[++i];
                                // TODO: the above could fail in the case of `- **a** - \`string\` - ` where the user ends with the ` - `
                                if (nextNode.type === 'emphasis'
                                    && nextNode.children.length === 1
                                    && nextNode.children[0].type === 'text'
                                    && nextNode.children[0].value === 'optional'
                                ) {
                                    parameterOptional = true;

                                    if (i === parameterParagraphNode.children.length - 2) {
                                        // only one node remains, can't be a DefaultValue
                                        // make sure it at least starts with ` - ` and then set that as the description + trim
                                        nextNode = parameterParagraphNode.children[++i];
                                        if (nextNode.type === 'text'
                                            && nextNode.value.startsWith(' - ')
                                            && nextNode.value.length > 3
                                        ) {
                                            nextNode.value = nextNode.value.slice(3);
                                            if (nextNode.position) {
                                                nextNode.position.start.column -= 3;
                                            }
                                            parameterDescription = [nextNode]
                                        } else {
                                            throw new Error(`Expected \` - Description\` Descript Node`)
                                        }
                                    } else if (i < parameterParagraphNode.children.length - 3) {
                                        // there is at least 2 more nodes
                                        nextNode = parameterParagraphNode.children[++i];
                                        let defaultValueNode = parameterParagraphNode.children[++i];
                                        if (nextNode.type === 'text'
                                            && nextNode.value === ' - Default: '
                                            && defaultValueNode.type === 'inlineCode'
                                        ) {
                                            parameterDefaultValue = defaultValueNode.value;
                                            if (i < parameterParagraphNode.children.length - 1) {
                                                // more nodes remain, check first one to validate start of Description
                                                nextNode = parameterParagraphNode.children[++i];
                                                if (nextNode.type === 'text'
                                                    && nextNode.value.startsWith(' - ')
                                                    && nextNode.value.length > 3
                                                ) {
                                                    parameterDescription = parameterParagraphNode.children.slice(i);
                                                    nextNode.value = nextNode.value.slice(3);
                                                    if (nextNode.position) {
                                                        nextNode.position.start.column -= 3;
                                                    }
                                                    parameterDescription[0] = nextNode
                                                } else if (nextNode.type === 'text' && nextNode.value === ' - ') {
                                                    parameterDescription = parameterParagraphNode.children.slice(i);
                                                } else {
                                                    throw new Error(`Expected \` - Description\`, Found ${inspect(nextNode)}`)
                                                }
                                            }
                                        } else {
                                            parameterDescription = parameterParagraphNode.children.slice(i);
                                        }
                                    }
                                } else {
                                    // Description
                                    parameterDescription = parameterParagraphNode.children.slice(i);
                                    // (no need to trim, just don't include the ` - ` Text node)
                                }
                            } else {
                                // otherwise, its a Description!
                                parameterDescription = parameterParagraphNode.children.slice(i);
                                // trim the ` - ` from the first Description node
                                nextNode.value = nextNode.value.slice(3);
                                if (nextNode.position) {
                                    nextNode.position.start.column -= 3;
                                }
                                parameterDescription[0] = nextNode
                            }
                        } else {
                            throw new Error(`Expected next node to be text`)
                        }
                    }

                    parameters.push(
                        new MddlParameter({
                            children: parameterDescription,
                            defaultValue: parameterDefaultValue,
                            identifier: parameterIdentifier,
                            typeValue: parameterType,
                            optional: parameterOptional,
                            position: position(parameterListItemNode)
                        })
                    )
                } else {
                    throw new Error(`Expected parameter to at least be comprised of an identifier and a type in the form: '**identifier** - \`type\`'`)
                }
            }
        }
        endPoint = pointEnd(parameterListNode)!;
    } else {
        throw new Error(`Expected parameter list to immediately follow 'Parameters:' text`)
    }

    return { description, parameters, endPoint }
}