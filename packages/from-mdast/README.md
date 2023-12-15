# @mddl/from-mdast

A module for transforming a mdast AST into a mddl AST.

```js
import { toMddl } from '@mddl/from-mdast';

const mddlTree = toMddl(mdastTree);
```

Run the example using `pnpm build` and `node ./example.js`

The output currently looks like this:

```
mddl-documentation[1] (1:1-16:1, 0-510)
└─0 mddl-object[1] (1:1-15:81, 0-509)
    │ identifier: "alphabet"
    │ parameters:
    │ ├─0 mddl-parameter[0] (7:1-7:19, 48-66)
    │ │     identifier: "a"
    │ │     optional: false
    │ │     typeValue: "string"
    │ ├─1 mddl-parameter[1] (8:1-8:41, 67-107)
    │ │   │ identifier: "b"
    │ │   │ optional: false
    │ │   │ typeValue: "string"
    │ │   └─0 text "A plain description" (8:16-8:41, 85-107)
    │ ├─2 mddl-parameter[3] (9:1-9:51, 108-158)
    │ │   │ identifier: "c"
    │ │   │ optional: false
    │ │   │ typeValue: "string"
    │ │   ├─0 emphasis[1] (9:22-9:25, 129-132)
    │ │   │   └─0 text "A" (9:23-9:24, 130-131)
    │ │   ├─1 text " non-plain " (9:25-9:36, 132-143)
    │ │   └─2 strong[1] (9:36-9:51, 143-158)
    │ │       └─0 text "description" (9:38-9:49, 145-156)
    │ ├─3 mddl-parameter[0] (10:1-10:32, 159-190)
    │ │     identifier: "d"
    │ │     optional: true
    │ │     typeValue: "string"
    │ ├─4 mddl-parameter[1] (11:1-11:54, 191-244)
    │ │   │ identifier: "e"
    │ │   │ optional: true
    │ │   │ typeValue: "string"
    │ │   └─0 text "A plain description" (11:29-11:54, 222-244)
    │ ├─5 mddl-parameter[3] (12:1-12:64, 245-308)
    │ │   │ identifier: "f"
    │ │   │ optional: true
    │ │   │ typeValue: "string"
    │ │   ├─0 emphasis[1] (12:35-12:38, 279-282)
    │ │   │   └─0 text "A" (12:36-12:37, 280-281)
    │ │   ├─1 text " non-plain " (12:38-12:49, 282-293)
    │ │   └─2 strong[1] (12:49-12:64, 293-308)
    │ │       └─0 text "description" (12:51-12:62, 295-306)
    │ ├─6 mddl-parameter[0] (13:1-13:49, 309-357)
    │ │     defaultValue: "'1'"
    │ │     identifier: "g"
    │ │     optional: true
    │ │     typeValue: "string"
    │ ├─7 mddl-parameter[1] (14:1-14:71, 358-428)
    │ │   │ defaultValue: "'1'"
    │ │   │ identifier: "h"
    │ │   │ optional: true
    │ │   │ typeValue: "string"
    │ │   └─0 text "A plain description" (14:46-14:71, 406-428)
    │ └─8 mddl-parameter[3] (15:1-15:81, 429-509)
    │     │ defaultValue: "'1'"
    │     │ identifier: "i"
    │     │ optional: true
    │     │ typeValue: "string"
    │     ├─0 emphasis[1] (15:52-15:55, 480-483)
    │     │   └─0 text "A" (15:53-15:54, 481-482)
    │     ├─1 text " non-plain " (15:55-15:66, 483-494)
    │     └─2 strong[1] (15:66-15:81, 494-509)
    │         └─0 text "description" (15:68-15:79, 496-507)
    └─0 paragraph[1] (3:1-3:14, 20-33)
        └─0 text "The alphabet." (3:1-3:14, 20-33)
```
