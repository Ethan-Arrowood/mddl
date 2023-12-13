# Object

Everything in JavaScript is an object.

[*Object*](#object) definitions are a collection of [*Parameter*](./Parameter.md) definitions. [*Object*](#object) definitions can be referenced as a type within other definitions such as in a [*Parameter*](./Parameter.md).

[*Object*](#object) definitions are made up of three parts: [*Title*](#title), [*Description*](#description), and [*Parameters*](#parameters).

```md
# Object: point

Represents a point on a 3D grid.

Parameters:

* **x** - `number`
* **y** - `number`
* **z** - `number`
```

## Title

The [*Title*](#title) of an [*Object*](#object) is made up of a markdown heading, `Object:`, and an object identifier.

## Description

The [*Description*](#description) of an [*Object*](#object) consists of any valid markdown content. It can span multiple linse and include line breaks.

## Parameters

The [*Parameters*](#parameters) section is made up of a list of [*Parameter*](./Parameter.md) definitions. Similar to [*Function Arguments*](./Function.md#arguments), an [*Object*](#object) can be defined either in-line using indentation for properties, or as a reference to another [*Object*](#object) definition.

The [*Function Arguments*](./Function.md#arguments) section has a great example of using [*Object*](#object) definition to define an argument, and it breaksdown the behavior of optional parameters.
