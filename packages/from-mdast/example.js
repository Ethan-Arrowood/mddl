import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { inspect } from "unist-util-inspect";
import { VFile } from "vfile";

import { toMddl } from "./dist/index.js";

const testInput = `# Object: alphabet

The alphabet.

Parameters:

- **a** - \`string\`
- **b** - \`string\` - A plain description
- **c** - \`string\` - _A_ non-plain **description**
- **d** - \`string\` - _optional_
- **e** - \`string\` - _optional_ - A plain description
- **f** - \`string\` - _optional_ - _A_ non-plain **description**
- **g** - \`string\` - _optional_ - Default: \`'1'\`
- **h** - \`string\` - _optional_ - Default: \`'1'\` - A plain description
- **i** - \`string\` - _optional_ - Default: \`'1'\` - _A_ non-plain **description**
`;

const file = new VFile({
    path: 'input.md',
    value: testInput
})

const mdastTree = unified().use(remarkParse).use(remarkGfm).parse(testInput);

const mddlTree1 = toMddl(mdastTree, { file });

console.log(inspect(mddlTree1));
