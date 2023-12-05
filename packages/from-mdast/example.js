import {unified} from 'unified'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { inspect } from 'unist-util-inspect';

import { toMddl } from './dist/index.js';

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

const mddlTree = toMddl(mdastTree);

console.log(inspect(mddlTree));
