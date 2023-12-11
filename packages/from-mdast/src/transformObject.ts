import { MddlObject, MddlParameter } from '@mddl/ast';
import { RootContent } from 'mdast';
import { pointEnd, pointStart, position } from 'unist-util-position';
import type { VFile } from 'vfile';
import { transformParameterList } from './transformParameterList.js';
import { VFileMessage, Options as VFileMessageOptions } from 'vfile-message';

class FromMdastVFileMessage extends VFileMessage {
    constructor (reason: string, options?: VFileMessageOptions) {
        super(reason, { ...options, source: '@mddl/from-mdast' })
    }
}

class MinimumFormObjectRule extends FromMdastVFileMessage {
    constructor(options?: VFileMessageOptions) {
        super(`Failed to parse Object. Expected minimum form: \`# Object: <Identifier>\``, options)
    }
}

class ParseRule extends FromMdastVFileMessage {
    constructor(parseNode: string, expectedNode: string, extraReasonOrOptions?: string | VFileMessageOptions, options?: VFileMessageOptions) {
        if (typeof extraReasonOrOptions !== 'string') {
            options = extraReasonOrOptions;
            extraReasonOrOptions = undefined;
        }
        super(`Failed to parse ${parseNode}. Expected ${expectedNode} node${extraReasonOrOptions ? `${extraReasonOrOptions}.` : '.'}`, options);
    }
}

export function transformObject (
    nodes: RootContent[],
    { file }: { file: VFile }
): MddlObject {
    if (nodes.length === 0) {
        throw file.fail(new ParseRule('Object', 'Heading', { place: { line: 1, column: 1 } }));
    }

    let description: RootContent[] = [],
        identifier: string,
        parameters: MddlParameter[] = [];
        
    
    if (nodes[0].type !== 'heading') {
        throw file.fail(new ParseRule('Object Identifier', 'Heading', { place: position(nodes[0]) }));
    }

    if (
        nodes[0].children.length !== 1
        || nodes[0].children[0].type !== 'text'
        || !nodes[0].children[0].value.startsWith('Object: ')
    ) {
        throw new Error(`Failed to parse Object Identifier. Expected singular Text node starting with \`Object: \`.`);
    }

    let startPoint = pointStart(nodes[0]),
        endPoint = pointEnd(nodes[0]);

    identifier = nodes[0].children[0].value.slice(8); // trim the `Object: ` part

    if (nodes.length > 1) {
        // Scan for Parameters List
        const parametersParagraphNodeIndex  = nodes.findIndex(node =>
            node.type === 'paragraph'
            && node.children.length > 0
            && node.children[0].type === 'text'
            && node.children[0].value === 'Parameters:'
        );

        description = nodes.slice(1, parametersParagraphNodeIndex === -1 ? undefined : parametersParagraphNodeIndex)
        endPoint = pointEnd(description[description.length - 1]);

        if (parametersParagraphNodeIndex !== -1) {
            if (parametersParagraphNodeIndex + 1 >= nodes.length) {
                throw new Error(`Failed to parse Object Parameters. Expected List node.`)
            }
    
            const mdastListNode = nodes[parametersParagraphNodeIndex + 1];
    
            if (mdastListNode.type !== 'list') {
                throw new Error(`Failed to parse Object Parameters. Expected List node.`)
            }

            parameters = transformParameterList(mdastListNode, { file });
            endPoint = pointEnd(mdastListNode);
        }
    }

    return new MddlObject({
        children: description,
        identifier,
        parameters,
        position: startPoint && endPoint ? {
            start: startPoint,
            end: endPoint
        } : undefined
    });
}