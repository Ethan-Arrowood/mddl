# Class

- [Class](#class)
  - [Title](#title)
  - [Extends](#extends)
  - [Description](#description)
  - [Constructor](#constructor)
  - [Instance/Static Sections](#instancestatic-sections)
  - [Method](#method)
  - [Property](#property)
  - [Event](#event)

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

Following the [_Constructor_](#constructor) definition, all [_Class_](#class) methods, properties, and events (if it extends `EventEmitter`) should be detailed as either `Instance` or `Static` through the use of markdown heading hierarchy.

When a [_Class_](#class) definition is defined as an h1 heading `#`, then the [_Instance/Static Sections_](#instancestatic-sections) should start with an h2 heading `##`. The respective [_Method_](#method), [_Property_](#property), and [_Event_](#event) sections should then begin with an h3 heading `###`.

Example:

```md
# Class: Person

## `new Person(name, age)`

## Instance Methods

### `person.printDescription()`

## Instance Properties

### `person.name`

### `person.age`

```

## Method

A [_Method_](#method) section should begin with the correct heading level (see [_Instance/Static Sections_](#instancestatic-sections) for more details). The rest of the [_Method_](#method) should follow the [_Function_](./Function.md) definition rules. Remember that the title for a [_Method_](#method) differs slightly from a standard [_Function Title_](./Function.md#title) (see the [_Function Title_](./Function.md#title) rules for more details).

Example:

```md
### `person.modifyAddress(address)`

Modify the person's address using an object merge operation. Any fields specified in the argument will override the existing one.

Arguments:

* **address** - `object`
  * **street** - `string` - _optional_
  * **city** - `string` - _optional_
  * **state** - `string` - _optional_
  * **zipcode** - `string` - _optional_
```

## Property

## Event
