# @mddl/spec

The specification for **mddl**.

See [spec.abnf](./spec.abnf) for a formal grammar for **mddl**.

## Introduction

**mddl** is a *subset* of markdown. All **mddl** is markdown, but *not* all markdown is **mddl**.

The language is particularly specified in order to provide a consistent and reliable developer experience. Similar to other languages, backwards compatibility is paramount. Thus, as this project is still in development (pre-v1), expect breaking changes to occur.

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
#### Object-Description
#### Object-Parameters

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