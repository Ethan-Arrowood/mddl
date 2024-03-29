# @mddl/spec

The specification for **mddl**.

## Introduction

**mddl** is a _subset_ of markdown. All **mddl** is markdown, but _not_ all markdown is **mddl**.

The language is particularly specified in order to provide a consistent and reliable developer experience. Similar to other languages, backwards compatibility is paramount. Thus, as this project is still in development (pre-v1), expect breaking changes to occur.

## Specification

The ABNF formal grammar for **mddl**.

```abnf
Documentation = Object-Definition 

; Object
Object-Definition  = Object-Identifier [NL Object-Description] [NL Object-Parameters]
Object-Identifier  = Markdown-Heading SP "Object:" SP ECMAScript-IdentifierName
Object-Description = Markdown
Object-Parameters  = "Parameters:" NL *("-" SP Parameter)

; Parameter
Parameter-Definition  = Parameter-Identifier SP "-" SP Parameter-Type [SP Parameter-Optional] [SP Parameter-Description]
Parameter-Identifier  = "**" ECMAScript-IdentifierName "**"
Parameter-Type        = "`" TypeScript-Type "`"
Parameter-Optional    = "- _optional_" [SP Parameter-Default]
Parameter-Default     = "- Default: `" Value "`"
Parameter-Description = "-" SP Markdown-Text

; Utilities
SP = " "
NL = "\n"

; Externally Defined Rules
Markdown-Heading          = valid markdown heading (1*6"#")
Value                     = valid value for specified type
Markdown                  = valid block of markdown text
Markdown-Text             = valid markdown line of text
ECMAScript-IdentifierName = https://262.ecma-international.org/14.0/#prod-IdentifierName
TypeScript-Type           = valid typescript type expression
```

## Definitions

A more illustrative guide to the **mddl** specification

---

### Parameter

A [Parameter][] definition is a single-line representation of a JavaScript value. It is made up of multiple parts separated by hyphen (`-`) characters: [Parameter-Identifier][], [Parameter-Type-Value][], [Parameter-Optional][], and [Parameter-Description][].

The [Parameter-Identifier][] and [Parameter-Type-Value][] are required.

##### Minimal Example:

```md
**Identifier** - `Type-Value`
```

##### Complete Example:

```md
**Identifier** - `Type-Value` - _optional_ - Default: `Value` - Description
```

##### Example: All Possibilities

```md
**a** - `string`
**b** - `string` - A **description**
**c** - `string` - _optional_
**d** - `string` - _optional_ - A **description**
**e** - `string` - _optional_ - Default: `'1'`
**f** - `string` - _optional_ - Default: `'1'` - A **description**
```

#### Parameter-Identifier

The first part of a [Parameter][]. It is required, surrounded by double-asterisk (`**`) characters, and be a valid [JavaScript identifier][].

###### Example

```md
**name**
```

#### Parameter-Type-Value

The second part of a [Parameter][]. It is required, surrounded by backtick (`` ` ``) characters, and be a valid TypeScript type expression.

###### Example

```md
**name** - `string`
```

#### Parameter-Optional

The third part of a [Parameter][]. It is not required. It is denoted by the text `_optional_`. If present, it must immediately follow the [Parameter-Type-Value][]. Additionally, when present, a [Parameter-Default-Value][] can also be specified.

###### Example

```md
**name** - `string` - _optional_
```

#### Parameter-Default-Value

A default value is only specifiable when [Parameter-Optional][] is. It must start with the text `Default: `, and then the value itself must be wrapped in backtick (`` ` ``) characters.

###### Example

```md
**name** - `string` - _optional_ - Default: `"mddl"`
```

#### Parameter-Description

The forth part of a [Parameter][]. It is not required. Must come after all other parts (such as [Parameter-Optional][]). The description can be any valid Markdown that fits on a single line.

###### Example: Without Optional

```md
**name** - `string` - The name property
```

###### Example: With Optional

```md
**name** - `string` - _optional_ - The name property
```

###### Example: With Default Value

```md
**name** - `string` - _optional_ - Default: `"mddl"` - The name property
```

---

### Object

An [Object][] definition is a multi-line representation of a JavaScript object. It is comprised of three distinct parts:
[Object-Identifier][], [Object-Description][], and [Object-Parameters][].

The [Object-Description][] is the only _optional_ part.

#### Object-Identifier

The first part of an [Object][]. It must be a markdown heading immediately followed by the text `Object: `, and then the identifier itself. The identifier must be a valid [JavaScript Identifier][].

###### Example: An empty object named `name`

```md
# Object: name
```

#### Object-Description

Optionally following the [Object-Identifier][], any valid multi-line markdown will comprise the [Object][] description. Everything up to the [Object-Parameters][] will be included in the [Object][] description.

###### Example

````md
# Object: name

The object description.

Which **can** contain [any]() sort of markdown.

Even code blocks!
```js
console.log('mddl');
```
````

#### Object-Parameters

Optionally following the [Object-Description][], or the [Object-Identifier][] (if a description does not exist), is the parameter list. It must start with the Text node `Parameters:`. Next, object parameters should be a bulleted list which each List Item node containing a single [Parameter][].

###### Example: An object named `name`, without a description, with parameters

```md
# Object: name

Parameters:

*   **first** - `string`
*   **middle** - `string` - _optional_
*   **last** - `string`

```

> The spacing between the bullet and the [Parameter-Identifier][] is not specified. The gap demonstrated in this example is the [remark-lint](https://github.com/remarkjs/remark-lint) [List Item Indent](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-list-item-indent#readme) rule.

###### Example: An object named `name`, with a description and parameters

```md
# Object: name

A name of a person. The `middle` name is not required.

Parameters:

*   **first** - `string`
*   **middle** - `string` - _optional_
*   **last** - `string`

```

---

### Function

> Coming soon!

---

### Class

> Coming soon!

---

### Array

> Coming soon!

[JavaScript Identifier]: https://262.ecma-international.org/14.0/#prod-IdentifierName
[Object]: #object
[Object-Identifier]: #object-identifier
[Object-Description]: #object-description
[Object-Parameters]: #object-parameters
[Parameter]: #parameter
[Parameter-Identifier]: #parameter-identifier
[Parameter-Type-Value]: #parameter-type-value
[Parameter-Optional]: #parameter-optional
[Parameter-Default-Value]: #parameter-default-value
[Parameter-Description]: #parameter-description
