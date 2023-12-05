import type { Point } from 'unist';
import { position, pointEnd, pointStart } from 'unist-util-position';
import type { Root as MdastRoot, RootContent } from 'mdast';
import { MDDLDocumentation, MDDLObject, MDDLParameter } from '@mddl/ast';
import { name } from 'estree-util-is-identifier-name'

export function toMddl(tree: MdastRoot): MDDLDocumentation {
    const documentation = new MDDLDocumentation({
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

            let description: RootContent[] = [], parameters: MDDLParameter[] = [];

            if (nextHeadingNodeIndex === -1) {
                // there exist more nodes (we bailed early above), and they are all non-heading
                ({ description, parameters, endPoint } = transformObjectContents({ nodeSlice: tree.children.slice(i)}));
                i = tree.children.length;
            } else {
                // there exists another heading node at `nextHeadingNodeIndex`. slice the ones between and process before continuing
                ({ description, parameters, endPoint } = transformObjectContents({ nodeSlice: tree.children.slice(i, nextHeadingNodeIndex)}));
                i = nextHeadingNodeIndex;
            }

            const object = new MDDLObject({
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

function transformObjectContents ({ nodeSlice }: { nodeSlice: RootContent[] }): { description: RootContent[], parameters: MDDLParameter[], endPoint: Point } {
    let parameters: MDDLParameter[] = [];

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
                        // TODO:
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

                    parameters.push(
                        new MDDLParameter({
                            identifier: parameterIdentifier,
                            typeValue: parameterType,
                            optional: false,
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