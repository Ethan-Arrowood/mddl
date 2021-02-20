# Function

In its simplest form, a [_Function_](#function) definition represents an independent, named JavaScript function.

````md
# Function: `parseInt(string [, radix])`

Parses a string into an number.

Arguments:

* **string** - `string` - The numerical string to be parsed into an integer.
* **radix** - `number` - _optional_ - An optional integer between `2` and `36` that represents the _radix_ of the `string`. Note: this does **not** default to `10`.

Returns: `number`

## Example 1 - Parse HEX
```js
parseInt("F", 16) // returns integer number 15
```
````

- [Function](#function)
  - [Title](#title)
  - [Description](#description)
  - [Arguments](#arguments)
  - [Return](#return)
  - [Examples](#examples)

## Title

The [_Title_](#title) of a [_Function_](#function) is made up of a markdown heading, `Function:`, and an argument-only syntax representation of the function surrounded by backtick `` ` `` characters. Multiple arguments should be specified using commas `,`, and optional arguments should be specified using brackets `[ ]`. No type information should be included in the title.

Example:

```md
# Function: `parseInt(string [, radix])`
```

If the [_Function_](#function) is a [_Class Method_](./Class.md#method) definition, then the title is slightly different. It no longer contains the `Function:` part, and includes the relative [_Class_](./Class.md) identifier.

Example:

```md
<!-- Inside of the Static Methods section of the Array Class definition -->
### `Array.isArray(value)`
```

For a [_Class Constructor_](./Class.md#constructor), the `Function:` part is omitted, and the code block should contain the `new` keyword.

Example:

```md
<!-- Inside of the Person Class definition -->
## `new Person(name, age)`
```

## Description

The [_Description_](#description) for a [_Function_](#function) consists of any valid markdown content. It can span multiple lines and include line breaks.

## Arguments

This section may be omitted from a [_Function_](#function) definition block if the [_Function_](#function)  has no arguments.

The [_Arguments_](#arguments) section is started with the text `Arguments:` on its own line. It should be seperated from the [_Description_](#description) by an blank line containing only a newline character. Following the section title should be another blank line and then the argument list (even if there is a single argument).

The arguments list is a markdown list made up of [Parameter](./Parameter.md) definitions.

Example:

```md
Arguments:

* **string** `string` - The numerical string to be parsed into an integer.
* **radix** `number` (optional) - An optional integer between `2` and `36` that represents the _radix_ of the `string`. Note: this does **not** default to `10`.
```

If an argument is of type `object` there are two options to represent it.

First, define the argument in-line by indenting the object properties.

```md
# Function: `transform([point])`

Arguments:

* **point** - `object` - _optional_ - Default: `{ x: 0, y: 0 }` - A point in a 2D grid. Defaults to an origin point.
  * **x** - `number`
  * **y** - `number`

Returns: `void`
```

In the `transform()` example, there is an optional `point` argument that defaults to the object `{ x: 0, y: 0 }`. Note, that the `point` itself is optional and not the `x` or `y` points. Thus, passing an incomplete `point` object is invalid (i.e. `{ x: 1 }`).

The second way to define an object argument is to use an [_Object_](./Object.md) definition and then reference that definition in the argument parameter.

```md
## Object: Point

A point in a 2D grid.

Parameters:

* **x** - `number`
* **y** - `number`

## Function: `transform([point])`

Arguments:

* **point** - `Point` - _optional_ - Default: `{ x: 0, y: 0 }`

Returns: `void`
```

Alternatively, if the `point` parameters were defined as optional then passing `{ x: 1 }` would be valid, and the `transform` function would be responsible for default the `y` property to `0`.

## Return

This section should not be omitted; a [_Function_](#function) that returns _nothing_ should indicate that by having a `void` return type.

The return section of a function definition is a single line padded by blank lines containing only newline characters. It should immediately follow either the function description or argument sections. The return line starts with the text `Returns:`, the type surrounded by backtick `` ` `` characters, and then an optional description preceeded with a hyphen `-` character.

Example:

```md
Returns: `string` - A short description about the return value
```

## Examples

The [_Examples_](#examples) section is an optional, but highly recomended part of a [_Function_](#function) definition. Many users enjoy seeing example code, even if it is just a simple case. [_Examples_](#examples) should be defined as subsections to the relative [_Function_](#function) definition. An example section should start with a markdown heading, the text `Example`, the example number, a hyphen character `-`, and then a short title. A description should follow the title line describing what is happening in the example. A description can be substituted for in-line code comments; good examples include better descriptions. Finally and most importantly, the example itself should be contained within a single markdown code block. [_Examples_](#examples) should be runnable as-is so that users can copy-paste it directly.

Example:

````md
## Example 1 - Parse HEX

An example of parsing a hex string.

```js
parseInt("F", 16) // returns integer number 15
```
````
