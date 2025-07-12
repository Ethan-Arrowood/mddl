import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { inspect } from "unist-util-inspect";
import { VFile } from "vfile";

import { toMddl } from "./dist/index.js";

const parser = unified().use(remarkParse).use(remarkGfm);

const input = `
# Function: \`f(x,y[,z,a])\`

Returns: \`void\`
`;

const mdastTree = parser.parse(input);

const file = new VFile({
	path: "input.md",
	value: input,
});

const mddlTree = toMddl(mdastTree, { file });

console.log(inspect(mddlTree));