# Object

Everything in JavaScript is an object.

[_Object_](#object) definitions are a collection of [_Parameter_](./Parameter.md) definitions. [_Object_](#object) definitions can be referenced as a type within other definitions such as in a [_Parameter_](./Parameter.md).

[_Object_](#object) definitions are made up of three parts: [_Title_](#title), [_Description_](#description), and [_Parameters_](#parameters).

```md
# Object: point

Represents a point on a 3D grid.

Parameters:

* **x** - `number`
* **y** - `number`
* **z** - `number`
```

## Title

The [_Title_](#title) of an [_Object_](#object) is made up of a markdown heading, `Object:`, and an object identifier.

## Description

The [_Description_](#description) of an [_Object_](#object) consists of any valid markdown content. It can span multiple linse and include line breaks.

## Parameters

The [_Parameters_](#parameters) section is made up of a list of [_Parameter_](./Parameter.md) definitions. Similar to [_Function Arguments_](./Function.md#arguments), an [_Object_](#object) can be defined either in-line using indentation for properties, or as a reference to another [_Object_](#object) definition.

The [_Function Arguments_](./Function.md#arguments) section has a great example of using [_Object_](#object) definition to define an argument, and it breaksdown the behavior of optional parameters.
