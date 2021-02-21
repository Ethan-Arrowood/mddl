# Class

A [_Class_](#class) consists of all public facing API methods and properties. A definition starts with the class title, a general description, and parent-class information if necessary. The first sub-section in a class definition should be the constructor method definition. Following the constructor should be methods and properties organized in "Static" and "Instance" groups.

- [Class](#class)
  - [Title](#title)
  - [Extends](#extends)
  - [Description](#description)
  - [Constructor](#constructor)
  - [Instance/Static Sections](#instancestatic-sections)
  - [Method](#method)
  - [Property](#property)

## Title

The [_Title_](#title) of a [_Class_](#class) is made up of a markdown heading, `Class:`, and a class identifier.

Example:

```md
# Class: Person
```

## Extends

The optional [_Extends_](#extends) line of a [_Class_](#class) should immediately follow the [_Title_](#title) with a preceding newline. It should be a single line of text containing `Extends:` and then the parent identifier surrounded by backtick `` ` `` characters. The parent identifier can be any extendable JavaScript object.

Example:

```md
# Class: Student

Extends: `Person`
```

## Description

The [_Description_](#description) of an [_Class_](#class) consists of any valid markdown content. It can span multiple linse and include line breaks. It should follow the [_Title_](#title) or [_Extends_](#extends) sections.

## Constructor

The [_Constructor_](#constructor) of an [_Class_](#class) is a [_Function_](./Function.md) definition with a unique [_Function Title_](./Function.md#title).

Example

```md
# Class: Person

## `new Person(name, age)`
```

## Instance/Static Sections

Following the [_Constructor_](#constructor) definition, all [_Class_](#class) methods and properties should be detailed as either `Instance` or `Static` through the use of markdown heading hierarchy.

When a [_Class_](#class) definition is defined as an h1 heading `#`, then the [_Instance/Static Sections_](#instancestatic-sections) should start with an h2 heading `##`. The respective [_Method_](#method) and [_Property_](#property) should then begin with an h3 heading `###`.

Example:

```md
# Class: Person

## `new Person(name, age)`

## Instance Methods

### `Person.printDescription()`

## Instance Properties

### `Person.name`

### `Person.age`

```

## Method

A [_Method_](#method) section should begin with the correct heading level (see [_Instance/Static Sections_](#instancestatic-sections) for more details). The rest of the [_Method_](#method) should follow the [_Function_](./Function.md) definition rules. Remember that the title for a [_Method_](#method) differs slightly from a standard [_Function Title_](./Function.md#title) (see the [_Function Title_](./Function.md#title) rules for more details).

Example:

```md
### `Person.modifyAddress(address)`

Modify the person's address using an object merge operation. Any fields specified in the argument will override the existing one.

Arguments:

* **address** - `object`
  * **street** - `string` - _optional_
  * **city** - `string` - _optional_
  * **state** - `string` - _optional_
  * **zipcode** - `string` - _optional_
```

## Property

A [_Property_](#property) section begins with the correct subheading level (see [_Instance/Static Sections_](#instancestatic-sections) for more details) followed by the [_Property_](#property) identifier appended to the [_Class_](#class) identifer surrounded by backtick `` ` `` characters. Following the title line should be a newline and then the type line. A [_Property_](#property) follows the [_Parameter_](./Parameter.md) syntax excluding the first part ([_Parameter Identifier_](#./Parameter.md#Identifier))

Example:

```md
### `Person.name`

* `string` - The full name of the Person instance
```
