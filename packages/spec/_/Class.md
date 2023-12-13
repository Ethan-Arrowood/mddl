# Class

A [*Class*](#class) consists of all public facing API methods and properties. A definition starts with the class title, a general description, and parent-class information if necessary. The first sub-section in a class definition should be the constructor method definition. Following the constructor should be methods and properties organized in "Static" and "Instance" groups.

* [Class](#class)
  * [Title](#title)
  * [Extends](#extends)
  * [Description](#description)
  * [Constructor](#constructor)
  * [Instance/Static Sections](#instancestatic-sections)
  * [Method](#method)
  * [Property](#property)

## Title

The [*Title*](#title) of a [*Class*](#class) is made up of a markdown heading, `Class:`, and a class identifier.

Example:

```md
# Class: Person
```

## Extends

The optional [*Extends*](#extends) line of a [*Class*](#class) should immediately follow the [*Title*](#title) with a preceding newline. It should be a single line of text containing `Extends:` and then the parent identifier surrounded by backtick `` ` `` characters. The parent identifier can be any extendable JavaScript object.

Example:

```md
# Class: Student

Extends: `Person`
```

## Description

The [*Description*](#description) of an [*Class*](#class) consists of any valid markdown content. It can span multiple linse and include line breaks. It should follow the [*Title*](#title) or [*Extends*](#extends) sections.

## Constructor

The [*Constructor*](#constructor) of an [*Class*](#class) is a [*Function*](./Function.md) definition with a unique [*Function Title*](./Function.md#title).

Example

```md
# Class: Person

## `new Person(name, age)`
```

## Instance/Static Sections

Following the [*Constructor*](#constructor) definition, all [*Class*](#class) methods and properties should be detailed as either `Instance` or `Static` through the use of markdown heading hierarchy.

When a [*Class*](#class) definition is defined as an h1 heading `#`, then the [*Instance/Static Sections*](#instancestatic-sections) should start with an h2 heading `##`. The respective [*Method*](#method) and [*Property*](#property) should then begin with an h3 heading `###`.

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

A [*Method*](#method) section should begin with the correct heading level (see [*Instance/Static Sections*](#instancestatic-sections) for more details). The rest of the [*Method*](#method) should follow the [*Function*](./Function.md) definition rules. Remember that the title for a [*Method*](#method) differs slightly from a standard [*Function Title*](./Function.md#title) (see the [*Function Title*](./Function.md#title) rules for more details).

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

A [*Property*](#property) section begins with the correct subheading level (see [*Instance/Static Sections*](#instancestatic-sections) for more details) followed by the [*Property*](#property) identifier appended to the [*Class*](#class) identifer surrounded by backtick `` ` `` characters. Following the title line should be a newline and then the type line. A [*Property*](#property) follows the [*Parameter*](./Parameter.md) syntax excluding the first part ([*Parameter Identifier*](#./Parameter.md#Identifier))

Example:

```md
### `Person.name`

* `string` - The full name of the Person instance
```
