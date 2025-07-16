# @mddl/spec

The specification for **mddl**.

## Introduction

**mddl** is a _subset_ of markdown. All **mddl** is markdown, but _not_ all markdown is **mddl**.

The language is particularly specified in order to provide a consistent and reliable developer experience. Similar to other languages, backwards compatibility is paramount. Thus, as this project is still in development (pre-v1), expect breaking changes to occur.

## Specification

The ABNF formal grammar for **mddl**.

```abnf
Documentation = Object-Definition

; Function
Function-Definition            = Function-Declaration [NL Function-Description] [NL Function-Parameters] NL Function-Return-Type
Function-Declaration           = Markdown-Heading SP "Function: `" Function-Declaration-Expression "`"
Function-Description           = Markdown
Function-Parameters             = 6Markdown-Heading "Parameters:" NL *(NL "-" SP Parameter-Definition)
Function-Return-Type           = 6Markdown-Heading "Returns: `" TypeScript-Type "`" [SP "-" SP Markdown-Text]

; Function Declaration Expression
Function-Declaration-Expression                   = ECMAScript-IdentifierName "(" [Function-Declaration-Parameters] ")"
Function-Declaration-Parameters                   = Required-Function-Declaration-Parameters [Optional-Function-Declaration-Parameters]
Function-Declaration-Parameters                   =/ Optional-Starting-Function-Declaration-Parameters
Required-Function-Declaration-Parameters          = Abstract-Function-Declaration-Parameters
Optional-Starting-Function-Declaration-Parameters = "[" SP Abstract-Function-Declaration-Parameters "]"
Optional-Function-Declaration-Parameters          = "[," SP Abstract-Function-Declaration-Parameters "]"
Abstract-Function-Declaration-Parameters          = Function-Declaration-Parameter-Identifier *("," SP Function-Declaration-Parameter-Identifier)
Function-Declaration-Parameter-Identifier         = ECMAScript-IdentifierName

; Object
Object-Definition  = Object-Identifier [NL Object-Description] [NL Object-Parameters]
Object-Identifier  = Markdown-Heading SP "Object:" SP ECMAScript-IdentifierName
Object-Description = Markdown
Object-Parameters  = "Parameters:" NL *(NL "-" SP Parameter-Definition)

; Property
Property-Definition  = Property-Identifier SP "-" SP Property-Type [SP Property-Optional] [SP Property-Description]
Property-Identifier  = "**" ECMAScript-IdentifierName "**"
Property-Type        = "`" TypeScript-Type "`"
Property-Optional    = "- _optional_" [SP Property-Default]
Property-Default     = "- Default: `" Value "`"
Property-Description = "-" SP Markdown-Text

; Utilities
SP = " "
NL = "\n"

; Externally Defined Rules
Markdown-Heading          = valid markdown heading (1*6"#")
Value                     = valid value for specified type
Markdown                  = valid block of markdown text
Markdown-Text             = valid markdown line of text
ECMAScript-IdentifierName = https://262.ecma-international.org/#prod-IdentifierName
TypeScript-Type           = valid typescript type expression
```

## MDDL Definitions

A more illustrative guide to the **mddl** specification

---

### Example

An [Example][] definition is a general purpose section that can be included in many other definitions to provide detailed examples of how to use the respective definition. It is a multi-line section that starts with 6 markdown headings and the text `Example:` followed by a descriptive name for the example. Then it can contain any valid markdown within the section. This specification itself uses [Example][] definitions to provide examples of how to use the various definitions.

###### Example: An Example definition

````md
###### Example: A simple example

```js
console.log('Hello, world!');
```
````

### Property

A [Property][] definition is a single-line representation of a JavaScript value. It is made up of multiple parts separated by hyphen (`-`) characters: [Property-Identifier][], [Property-Type][], [Property-Optional][], and [Property-Description][].

The [Property-Identifier][] and [Property-Type][] are required.

Since this is a single-line definition it cannot include an [Example][] definition. However, the [Property-Description][] can include any valid Markdown that fits on a single line and can serve this purpose.

###### Example: Minimal Property Definition

```md
**Identifier** - `Type`
```

###### Example: Complete Property Definition

```md
**Identifier** - `Type` - _optional_ - Default: `Value` - Description
```

##### Example: All Property Definition Possibilities

```md
**a** - `string`
**b** - `string` - A **description**
**c** - `string` - _optional_
**d** - `string` - _optional_ - A **description**
**e** - `string` - _optional_ - Default: `'1'`
**f** - `string` - _optional_ - Default: `'1'` - A **description**
```

#### Property-Identifier

The first part of a [Property][]. It is required, surrounded by double-asterisk (`**`) characters, and be a valid [JavaScript identifier][].

###### Example: Property Definition Identifier field

```md
**name**
```

#### Property-Type

The second part of a [Property][]. It is required, surrounded by backtick (`` ` ``) characters, and must be a valid TypeScript type expression.

###### Example: Property Definition Type field

```md
**name** - `string`
```

#### Property-Optional

The third part of a [Property][]. It is optional. It is denoted by the text `_optional_`. If present, it must immediately follow the [Property-Type][]. Additionally, when present, a [Property-Default-Value][] can also be specified.

###### Example: Property Definition Optional field

```md
**name** - `string` - _optional_
```

#### Property-Default-Value

A default value is only specifiable when [Property-Optional][] is specified. It must start with the text `Default: `, and then the value itself must be wrapped in backtick (`` ` ``) characters. The value must be a valid TypeScript value based on the [Property-Type][].

###### Example: Property Default Value field

```md
**name** - `string` - _optional_ - Default: `"mddl"`
```

#### Property-Description

The forth part of a [Property][]. It is not required. Must come after all other parts (such as [Property-Optional][]). The description can be any valid Markdown that fits on a single line.

###### Example: Property Definition without Optional field and with Description field

```md
**name** - `string` - The name property
```

###### Example: Property Definition with Optional and Description fields

```md
**name** - `string` - _optional_ - The name property
```

###### Example: Property Definition with Optional, Default Value, and Description fields

```md
**name** - `string` - _optional_ - Default: `"mddl"` - The name property
```

### Property-Object

A special type of [Property][] that is used to define a JavaScript `Object` type. It is a [Property][] that has a [Property-Type][] of `Object`. In its simplest form, it can still be defined as a single line, but for more specificity, multiple nested [Property][] definitions can be used. Furthermore, it may be better to define the respective property as a distinct [Object][], [Type][], or [Interface][] definition and then reference that definition in the [Property-Type][]. This can also be used to define more complex types such as if a function parameter can be `string | Object`, then again it may be best to define the specific `Object` as a separate definition and reference it directly, but otherwise, you can still define the properties of the object on the following lines.

For the purposes of this specification, the top-level [Property][] does not necessarily need to be preceded by a list character. Though in most cases, it will be (such as in an [Object-Properties][] or [Function-Parameters][] list).

Since [Object-Property][] is specifically comprised of multiple single-line [Property][] definitions, it too cannot contain an [Example][] definition. It is recommend to use a proper [Object][] definition instead if you want to include an [Example][].

###### Example: Object-Property with a single line definition

```md
**address** - `Object` - An ambiguous address object
```

###### Example: Object-Property with a multi-line definition

```md
**address** - `Object` - A home address
- **street** - `string` - The street name
- **city** - `string` - The city name
- **state** - `string` - The state name
- **zip** - `string` - The ZIP code
```

###### Example: Object-Property with a complex type

```md
**address** - `string | Object` - A home address.
- **street** - `string` - The street name
- **city** - `string` - The city name
- **state** - `string` - The state name
- **zip** - `string` - The ZIP code
```

###### Example: Object-Property with a reference to an [Object][] definition

```md
**address** - `Address` - A home address.

<!-- Later in the document -->
# Object: `Address`

A home address.

###### Properties:

- **street** - `string` - The street name
- **city** - `string` - The city name
- **state** - `string` - The state name
- **zip** - `string` - The ZIP code
```

---

### Object

An [Object][] definition is a multi-line representation of a JavaScript object. It is comprised of three distinct parts: [Object-Identifier][], [Object-Description][], and [Object-Properties][]. Only the [Object-Identifier][] is technically required, though the other fields are recommended for properly documenting the object. Omitting [Object-Properties][] is equivalent to specifying the generic `Object` type, which is not very useful but sometimes necessary for ambiguous types.

It can also include [Example][] definitions.

#### Object-Identifier

The first part of an [Object][]. It must be a markdown heading immediately followed by the text `Object: `, and then the identifier itself surrounded by `` ` `` characters. The identifier must be a valid [JavaScript Identifier][]. This definition should be used to define actual exported JavaScript objects within a project. For type-only definitions use a [Interface][] definition instead. For example, if the project exports an object such as `HTTP_METHODS` defining the set of HTTP methods, then you should document that as an [Object][] definition since it can be referenced and used in code. However, if the export is simply a type such as like `HTTPServerOptions`, then you should use a [Interface][] definition instead.

###### Example: Object definition (incomplete) with an identifier

```md
# Object: `name`
```

#### Object-Description

Optionally following the [Object-Identifier][], any valid multi-line markdown comprises the [Object][] description. Everything up to the [Object-Properties][] will be included in the [Object][] description.

###### Example: Object definition with a description

````md
# Object: `name`

The object description.

Which **can** contain [any]() sort of markdown.

Even code blocks!
```js
console.log('mddl');
```
````

#### Object-Properties

Optionally following the [Object-Description][] or the [Object-Identifier][] (if a description does not exist), is the property list. It must start with 6 markdown headings and the text `Properties:`. Then using an unordered list, each property is defined as a [Property][] or [Property-Object][] definition.

The spacing between the bullet and the [Property][] or [Property-Object][] is not specified. Some tools such as [remark-lint](https://github.com/remarkjs/remark-lint) will include a [List Item Indent](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-list-item-indent#readme) rule that enforces additional spacing and that is okay.

###### Example: An object named `name`, without a description, with parameters

```md
# Object: name

A name of a person. The `middle` name is not required.

###### Properties:

- **first** - `string`
- **middle** - `string` - _optional_
- **last** - `string`

```

###### Example: A complex object definition

```md
# Object: `person`

###### Properties:

- **name** - `Object` - The person's name
  - **first** - `string` - The first name
  - **middle** - `string` - _optional_ - The middle name
  - **last** - `string` - The last name
- **age** - `number` - The person's age
- **address** - `Address` - The person's address

```

---

### Function

A [Function][] definition is a multi-line representation of a JavaScript function. It is comprised of the distinct parts: [Function-Declaration][], [Function-Description][], [Function-Parameters][], [Function-Return-Type][], and [Examples][].

###### Example: A complete Function definition

````md
# Function: `divide(numerator, denominator)`

A function for dividing two numbers.

###### Parameters:

- **numerator** - `number`
- **denominator** - `number` - Cannot be `0`.

###### Returns: `number`

###### Example: Dividing two numbers

```js
divide(4, 2); // 2
```
````

#### Function-Declaration

The specification for a [Function-Declaration][] is complex. It starts with a markdown heading and  the text `Function: `. Then, surrounded by backtick `` ` `` characters is the function identifier (any valid JavaScript Identifier) and its parameters.

The parameters are enclosed in parentheses `(` and `)`. If the function has no parameters, the parentheses are empty. If the function has one or more parameters, they are separated by commas `,`. The parameters can be required or optional, with optional parameters being wrapped in square brackets `[` and `]`. When a parameter is optional, the `,` should be placed just inside the first square bracket. This pattern follows the same rules as the Node.js documentation. Functions should only be declared once, and the declaration should be the most inclusive form of the function parameters. For example, if a function has multiple overloads, the declaration should be generalized to match all overloads. This is just like how TypeScript handles function overloads.

This syntax is complex, but very powerful. The overall purpose is to give a clear and concise representation of the function's parameters. Including actual types here would be too much information; plus, the later [Function-Parameters][] section will provide the types in greater detail anyways. This part is meant to be a quick reference and representation of the function's parameters.

###### Example: Function declaration with multiple optional parameters

The [`net.createServer()`](https://nodejs.org/docs/latest/api/net.html#netcreateserveroptions-connectionlistener) function is an excellent example for this pattern. It is documented as:

```md
# `net.createServer([options][, connectionListener])`
```

Indicating that both parameters are optional. You can specify just `options`, just `connectionListener`, or both of them.

This would be loosely equivalent to the following TypeScript:

```ts
function createServer(options?: Object, connectionListener?: Function) {
	if (typeof options === 'function') {
		connectionListener = options;
		options = undefined;
	}
	// ...
}
```

###### Example: Complex Function declaration with nested optional parameters

The [`request.end()`](https://nodejs.org/docs/latest/api/net.html#netcreateserveroptions-connectionlistener) method is a more complex example of the capabilities of this pattern. It is documented as:

```md
# `request.end([data[, encoding]][, callback])`
```

This declaration indicates that if the first parameter is specified as `data`, then you can optionally specify the second parameter as `encoding`. If you do not specify `data`, then you cannot specify `encoding`. The third parameter, `callback`, is always optional, but also always comes last.

###### Example: Function declaration fields

```md
<!-- A function with zero parameters -->
# Function: `f()`

<!-- A function with one required parameter -->
# Function: `f(x)`

<!-- A function with one optional parameter -->
# Function: `f([x])`

<!-- A function with multiple required parameters -->
# Function: `f(x, y)`

<!-- A function with one required parameter and one optional parameter -->
# Function: `f(x[, y])`

<!-- A function with multiple required parameters and one optional parameter-->
# Function: `f(x, y[, z])`

<!-- A function with one required parameter and an optional set of parameters. -->
# Function: `f(x[, y, z])`

<!-- A function with one required parameter, and two sets of optional parameters -->
# Function : `f(x[, y[, z]][, a])`
```

#### Function-Description

Optionally following the [Function-Declaration][], any valid multi-line markdown comprises the [Function-Description][]. Everything up to the [Function-Parameters][] or [Function-Return-Type][] is considered apart of the [Function-Description][].

###### Example: Function definition (incomplete) with description

```md
# Function `add(x, y)`

A **function** for adding [two]() _numbers_ together!
```

#### Function-Parameters

Only required if the [Function-Declaration][] contains parameters as well. This section starts on a new line with the text: `###### Parameters:`, followed by a newline and then an unordered, list of [Property][] definitions.

###### Example: A Function definition with parameters

```md
# Function: `add(x, y)`

###### Parameters:

- **x** - `number`
- **y** - `number`

```


#### Function-Return-Type

A required field that also acts as a terminating line for the [Function-Description][], it must begin with the text `###### Returns:`, then contain a valid TypeScript Type wrapped in `` ` `` characters.

###### Example: Function definition with return type

```md
# Function `ping()`

###### Returns: `string`
```



---

### Class

> Coming soon!

---

### Array

> Coming soon!

[JavaScript Identifier]: https://262.ecma-international.org/14.0/#prod-IdentifierName
[Function]: #function
[Function-Arguments]: #function-arguments
[Function-Declaration]: #function-declaration
[Function-Description]: #function-description
[Function-Return-Type]: #function-return-value
[Object]: #object
[Object-Identifier]: #object-identifier
[Object-Description]: #object-description
[Object-Parameters]: #object-parameters
[Parameter]: #parameter
[Parameter-Identifier]: #parameter-identifier
[Parameter-Type]: #parameter-type
[Parameter-Optional]: #parameter-optional
[Parameter-Default-Value]: #parameter-default-value
[Parameter-Description]: #parameter-description
[Specification]: #specification