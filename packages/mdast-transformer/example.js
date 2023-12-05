import {unified} from 'unified'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { inspect } from 'unist-util-inspect';

import { mdastToMDDLTransformer } from './dist/mdast-transformer.js';

const mdastTree = unified().use(remarkParse).use(remarkGfm).parse(`# Object: person

A person.

Parameters:

- **name** - \`name\`
- **birthday** -\`string\`

## Object: name

A person's name.

Parameters:

- **firstName** - \`string\`
- **middleName** - \`string\` - _optional_
- **lastName** - \`string\`
`);

console.log('mdast tree', inspect(mdastTree));

const mddlTree = await unified().use(mdastToMDDLTransformer).run(mdastTree);

console.log('mddl tree', inspect(mddlTree));
