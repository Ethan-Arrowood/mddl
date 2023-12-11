import test from 'node:test';
import assert from 'node:assert/strict';
import {unified} from 'unified'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { transformParameterList } from '../src/transformParameterList.js';

function getMdastListNode (input: string) {
    const mdastTree = unified().use(remarkParse).use(remarkGfm).parse(input);
    if (mdastTree.children[0].type === 'list') {
        return mdastTree.children[0]
    } else {
        throw new Error(`Expected input to contain a Mdast List node`)
    }
}

test("Parsing a", t => {
    test("MddlParameter", t => {
        const input = `- **a** - \`string\``;
        const listNode = getMdastListNode(input);
        const mddlTree = transformParameterList(listNode);
    })
})
