# Parameter

A _Parameter_ definition is a single-line representation of a JavaScript value. It is made up of multiple parts seperated by hyphen `-` characters: _identifier_, _type_, _optional_, _default_, and _description_.

## Identifier

The first part of a _Parameter_ is the _Identifier_. It is required and should be surrounded by double-asterisk `**` characters.

Example:

```md
**name**
```

## Type

The second part of a _Parameter_ is the _Type_, and like the _Identifier_ it is also required. The _Type_ should be surrounded by backtick `` ` `` characters.

Example:

```md
**name** - `string`
```

## Optional

The next part of a _Parameter_ is the _Optional_ notation. This part is only required for defining an optional _Parameter_. This part is denoted by the text `optional` surrounded by underscore `_` characters.

The _Optional_ part should immediately follow the _Type_ part of a _Parameter_ definition. 

Example:

```md
**iterations** - `number` - _optional_
```

## Default

The _Default_ part of a _Parameter_ definition denotes a default value for an optional _Parameter_ definition. It should only be included if the _Optional_ part is too, but it is not required. This part is denoted by the text `Default: ` followed by the default value surrounded in backtick `` ` `` characters.

The default value should be a valid representation of the _Parameter Type_.

Example:

```md
**iterations** - `number` - _optional_ - Default: `10`
```

## Description

Lastly, all _Parameter_ definitions can be followed by a _Description_. This is a single-line of text that further describes the _Parameter_. It can use any valid markdown syntax that is suitable for a single line (bold, italic, link, code). This part should only come after all other _Parameter_ parts.

Example:

```md
**name** - `string` - The name of the function to execute.
**iterations** - `number` - _optional_ - Default: `10` - The number of times the function `name` will execute.
```
