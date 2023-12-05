# Parameter

A [_Parameter_](#parameter) definition is a single-line representation of a JavaScript value. It is made up of multiple parts seperated by hyphen `-` characters: [_Identifier_](#identifier), [_Type_](#type), [_Optional_](#optional), [_Default_](#default), and [_Description_](#description).

## Identifier

The first part of a [_Parameter_](#parameter) is the [_Identifier_](#identifier). It is required and should be surrounded by double-asterisk `**` characters.

Example:

```md
**name**
```

## Type

The second part of a [_Parameter_](#parameter) is the [_Type_](#type), and like the [_Identifier_](#identifier) it is also required. The [_Type_](#type) should be surrounded by backtick `` ` `` characters.

Example:

```md
**name** - `string`
```

## Optional

The next part of a [_Parameter_](#parameter) is the  [_Optional_](#optional) notation. This part is only required for defining an optional [_Parameter_](#parameter). This part is denoted by the text `optional` surrounded by underscore `_` characters.

The [_Optional_](#optional) part should immediately follow the [_Type_](#type) part of a [_Parameter_](#parameter) definition.

Example:

```md
**iterations** - `number` - _optional_
```

## Default

The [_Default_](#default) part of a [_Parameter_](#parameter) definition denotes a default value for an optional [_Parameter_](#parameter) definition. It should only be included if the [_Optional_](#optional) part is too, but it is not required. This part is denoted by the text `Default: ` followed by the default value surrounded in backtick `` ` `` characters.

The default value should be a valid representation of the [_Type_](#type).

Example:

```md
**iterations** - `number` - _optional_ - Default: `10`
```

## Description

Lastly, all [_Parameter_](#parameter) definitions can be followed by a [_Description_](#description). This is a single-line of text that further describes the [_Parameter_](#parameter). It can use any valid markdown syntax that is suitable for a single line (bold, italic, link, code). This part should only come after all other [_Parameter_](#parameter) parts.

Example:

```md
**name** - `string` - The name of the function to execute.
**iterations** - `number` - _optional_ - Default: `10` - The number of times the function `name` will execute.
```
