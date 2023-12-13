# Parameter

A [*Parameter*](#parameter) definition is a single-line representation of a JavaScript value. It is made up of multiple parts seperated by hyphen `-` characters: [*Identifier*](#identifier), [*Type*](#type), [*Optional*](#optional), [*Default*](#default), and [*Description*](#description).

## Identifier

The first part of a [*Parameter*](#parameter) is the [*Identifier*](#identifier). It is required and should be surrounded by double-asterisk `**` characters.

Example:

```md
**name**
```

## Type

The second part of a [*Parameter*](#parameter) is the [*Type*](#type), and like the [*Identifier*](#identifier) it is also required. The [*Type*](#type) should be surrounded by backtick `` ` `` characters.

Example:

```md
**name** - `string`
```

## Optional

The next part of a [*Parameter*](#parameter) is the  [*Optional*](#optional) notation. This part is only required for defining an optional [*Parameter*](#parameter). This part is denoted by the text `optional` surrounded by underscore `_` characters.

The [*Optional*](#optional) part should immediately follow the [*Type*](#type) part of a [*Parameter*](#parameter) definition.

Example:

```md
**iterations** - `number` - _optional_
```

## Default

The [*Default*](#default) part of a [*Parameter*](#parameter) definition denotes a default value for an optional [*Parameter*](#parameter) definition. It should only be included if the [*Optional*](#optional) part is too, but it is not required. This part is denoted by the text `Default: ` followed by the default value surrounded in backtick `` ` `` characters.

The default value should be a valid representation of the [*Type*](#type).

Example:

```md
**iterations** - `number` - _optional_ - Default: `10`
```

## Description

Lastly, all [*Parameter*](#parameter) definitions can be followed by a [*Description*](#description). This is a single-line of text that further describes the [*Parameter*](#parameter). It can use any valid markdown syntax that is suitable for a single line (bold, italic, link, code). This part should only come after all other [*Parameter*](#parameter) parts.

Example:

```md
**name** - `string` - The name of the function to execute.
**iterations** - `number` - _optional_ - Default: `10` - The number of times the function `name` will execute.
```
