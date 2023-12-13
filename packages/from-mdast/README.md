# @mddl/from-mdast

A module for transforming a mdast AST into a mddl AST.

```js
import { toMddl } from '@mddl/from-mdast';

const mddlTree = toMddl(mdastTree);
```

Run the example using `pnpm build` and `node ./example.js`

The output currently looks like this:

```
mddl-documentation[2] (1:1-19:1, 0-230)
├─0 mddl-object[1] (1:1-8:25, 0-86)
│   │ identifier: "person"
│   │ parameters:
│   │ ├─0 mddl-parameter[0] (7:1-7:20, 42-61)
│   │ │     identifier: "name"
│   │ │     optional: false
│   │ │     typeValue: "name"
│   │ └─1 mddl-parameter[0] (8:1-8:25, 62-86)
│   │       identifier: "birthday"
│   │       optional: false
│   │       typeValue: "string"
│   └─0 paragraph[1] (3:1-3:10, 18-27)
│       └─0 text "A person." (3:1-3:10, 18-27)
└─1 mddl-object[1] (10:1-18:26, 88-229)
    │ identifier: "name"
    │ parameters:
    │ ├─0 mddl-parameter[0] (16:1-16:27, 136-162)
    │ │     identifier: "firstName"
    │ │     optional: false
    │ │     typeValue: "string"
    │ ├─1 mddl-parameter[0] (17:1-17:41, 163-203)
    │ │     identifier: "middleName"
    │ │     optional: false
    │ │     typeValue: "string"
    │ └─2 mddl-parameter[0] (18:1-18:26, 204-229)
    │       identifier: "lastName"
    │       optional: false
    │       typeValue: "string"
    └─0 paragraph[1] (12:1-12:17, 105-121)
        └─0 text "A person's name." (12:1-12:17, 105-121)
```
