# Object

Everything in JavaScript is an object.

_Object_ definitions are a collection of _Parameter_ definitions. _Object_ definitions can be referenced as a type within other definitions such as in a _Parameter_.

_Object_ definitions are made up of three parts: _title_, _description_, and _parameters_.

```md
# Object: point

Represents a point on a 3D grid.

Parameters:

* **x** - `number`
* **y** - `number`
* **z** - `number`
```

## Title

The _Title_ of an _Object_ is made up of a markdown heading, `Object:`, and an object identifier.

## Description

The _Description_ of an _Object_ consists of any valid markdown content. It can span multiple linse and include line breaks.

## Parameters

The _Parameters_ section is made up of a list of _Parameter_ definitions. Similar to _Function Arguments_, an object can be defined either in-line using indentation for properties or as a reference to another _Object_ definition.

The [_Function Arguments_](./Function.md#arguments) section has a great example of using _Object_ definition to define an argument, and it breaksdown the behavior of optional parameters.
