import { MddlParameter } from "@mddl/ast";
import { List, ListItem } from "mdast";
import { position } from "unist-util-position";
import type { VFile } from 'vfile';
import { name } from 'estree-util-is-identifier-name';
import { PhrasingContent } from "mdast";

function transformParameter (
    mdastListItemNode: ListItem,
    options?: {
        file?: VFile
    }
): MddlParameter {
    // Error early if the Parameter is not minimally correct
    if (
        mdastListItemNode.children.length < 0
        || mdastListItemNode.children[0].type !== 'paragraph'
        || mdastListItemNode.children[0].children.length < 3
    ) {
        throw new Error(`Failed to parse Parameter. Expected minimum form: \`**<Identifier>** - \`<Type>\`\``);
    }

    let i = 0, node: PhrasingContent, peek: PhrasingContent; // scan index `i` is always 1 ahead of current `node`
    const nodes = mdastListItemNode.children[0].children;

    let description: PhrasingContent[] = [], 
        defaultValue: any, 
        identifier: string, 
        optional: boolean = false, 
        typeValue: string;

    node = nodes[i++]; // advance (safe because of check on line 19)

    // parse Parameter Identifier
    if (node.type !== 'strong') {
        throw new Error(`Failed to parse Parameter Identifier. Expected Strong node.`);
    }
    if (node.children.length !== 1 || node.children[0].type !== 'text') {
        throw new Error(`Failed to parse Parameter Identifier. Expected singular Text node.`);
    }

    identifier = node.children[0].value;

    // valid Parameter Identifier
    if (!name(identifier)) {
        throw new Error(`Failed to parse Parameter Identifier. Invalid JavaScript identifier.`);
    }

    node = nodes[i++]; // advance (safe because of check on line 19)

    // parse ` - `
    if (node.type !== 'text' || node.value !== ' - ') {
        throw new Error(`Failed to parse Parameter. Expected Text node containing \` - \`.`)
    }

    node = nodes[i++]; // Advance (safe because of check on line 19)

    // parse Parameter Type Value
    if (node.type !== 'inlineCode') {
        throw new Error(`Failed to parse Parameter Type Value. Expected InlineCode node.`);
    }

    typeValue = node.value;
    // TODO: Validate Parameter Type Value

    // Check for more nodes
    if (i < nodes.length) {
        node = nodes[i++]; // Advance

        // Check for more nodes (Parameter Optional or Parameter Description that starts with a non-text node)
        if (i < nodes.length) {
            peek = nodes[i]; // Peek

            // Check for `optional` Emphasis node
            if (
                peek.type === 'emphasis'
                && peek.children.length === 1
                && peek.children[0].type === 'text'
                && peek.children[0].value === 'optional'
            ) {
                optional = true; // Set Parameter Optional
                node = nodes[i++]; // Advance (safe because of peek)

                // Check for more nodes (Parameter Default Value or Parameter Description)
                if (i < nodes.length) {
                    node = nodes[i++]; // Advance
                    // Check for Parameter Default Value
                    if (node.type === 'text' && node.value.startsWith(' - Default: ')) {
                        // Assert that wasn't the last node
                        if (i === nodes.length) {
                            throw new Error(`Failed to parse Parameter Default Value. Expected InlineCode node.`)
                        }
                        node = nodes[i++]; // Advance

                        // Check for InlineCode node
                        if (node.type !== 'inlineCode') {
                            throw new Error(`Failed to parse Parameter Default Value. Expected InlineCode node.`)
                        }
                        defaultValue = node.value; // Set Parameter Default Value

                        // Check for more nodes (Parameter Description)
                        if (i < nodes.length) {
                            node = nodes[i++]; // Advance
                        }
                    }
                }
            }
        }

        // `node` is last and `node` is a Text node and it is ` - `.
        if (i === nodes.length && node.type === 'text' && node.value.trim() === '-') {
            throw new Error(`Failed to parse Parameter. Expected Parameter Description.`);
        }

        // Is the current node text and is it longer than 
        if (node.type === 'text' && node.value.length > 3) {
            description = nodes.slice(i); // gather itself and all remaining nodes
            node.value = node.value.slice(3); // trim ` - ` from the first one
            if (node.position) {
                node.position.start.column -= 3; // adjust start position
                // TODO: Does offset need to be adjusted too?
            }
            description[0] = node;
        } else {
            description = nodes.slice(i);
        }
    }

    return new MddlParameter({
        children: description,
        defaultValue,
        identifier,
        optional,
        typeValue,
        position: position(mdastListItemNode)
    });
}

export function transformParameterList (mdastListNode: List, options?: { file?: VFile }): MddlParameter[] {
    return mdastListNode.children.map(listItemNode => transformParameter(listItemNode, options));
}
