import type { Point } from 'unist';
import { position, pointEnd, pointStart } from 'unist-util-position';
import type { Root as MdastRoot, PhrasingContent, RootContent } from 'mdast';
import { MddlDocumentation, MddlObject, MddlParameter } from '@mddl/ast';
import { name } from 'estree-util-is-identifier-name'
import { inspect } from 'unist-util-inspect'
import { transformParameterList } from './transformParameterList.js';

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
        parameters = transformParameterList(parameterListNode);

        endPoint = pointEnd(parameterListNode)!;
    } else {
        throw new Error(`Expected parameter list to immediately follow 'Parameters:' text`)
    }

    return { description, parameters, endPoint }
}