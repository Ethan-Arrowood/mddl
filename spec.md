# Spec

## Identifier

Any valid JavaScript identifier

## Type

Any valid TypeScript type

## Value

Any valid JavaScript value. Should be assignable to an associated [**Type**](#type).

## SingleLineDescription

A markdown-based single-line description.

## MultiLineDescription

A markdown-based multi-line description

## ParameterBase

Syntax:

```md
* **<Identifier>** `<Type>`
```

Ref: [Identifier](#identifier), [Type](#type)

Example:

```md
* **text** `string`
```

## DefaultValue

For use with [**ParameterWithDefaultValue**](#parameterwithdefaultvalue).

Syntax:

```md
Default `<Value>`
```

Ref: [Value](#value)

## ParameterWithDefaultValue

Syntax:

```md
<ParameterBase> - <DefaultValue>
```

Ref: [ParameterBase](#parameterbase), [DefaultValue](#defaultvalue)

Example:

```md
* **text** `string` - Default: `'mddl'`
```

## ParameterWithDescription

Syntax:

```md
<ParameterBase> - <SingleLineDescription>
<!-- or -->
<ParameterWithDefaultValue> - <SingleLineDescription>
```

Ref: [ParameterBase](#parameterbase), [SingleLineDescription](#singlelinedescription), [ParameterWithDefaultValue](#parameterwithdefaultvalue)

Example:

```md
* **text** `string` - The text property
<!-- or -->
* **text** `string` - Default: `'mddl'` - The text property
```

## SingleLineParameter

A [**ParameterBase**](#parameterbase), [**ParameterWithDefaultValue**](#parameterwithdefaultvalue), or [**ParameterWithDescription**](#parameterwithdescription) that **do not** have a [**Type**](#type) of `object`.

## ObjectParameter

A [**ParameterBase**](#parameterbase), [**ParameterWithDefaultValue**](#parameterwithdefaultvalue), or [**ParameterWithDescription**](#parameterwithdescription) that has a [**Type**](#type) of `object`.

## ParameterList

Syntax:

```md
<Parameter>
<!-- or -->
<Parameter>
<ParameterList>
```

Ref: [Parameter](#parameter), [ParameterList](#parameterlist)

## MultiLineParameter

Syntax:

```md
<ObjectParameter>
  <ParameterList>
```

Ref: [ObjectParameter](#objectparameter), [ParameterList](#parameterlist)

Example:

```md
* **point** `object` - A representation of a 2D point
  * **x** `number` - Default: `0`
  * **y** `number` - Default: `0`
```

## Parameter

An alias for [**SingleLineParameter**](#singlelineparameter) or [**MultiLineParameter**](#multilineparameter)

## ArgumentBase

Syntax:

```md
<ParameterBase>
<!-- or -->
<ParameterBase> (optional)
```

Ref: [ParameterBase](#parameterbase)

Example:

```md
* **text** `string`
<!-- or -->
* **text** `string` (optional)
```

## ArgumentWithDefaultValue

Syntax:

```md
<ArgumentBase> - <DefaultValue>
```

Ref: [ArgumentBase](#argumentbase), [DefaultValue](#defaultvalue)

Example:

```md
* **text** `string` - Default: `'mddl'`
<!-- or -->
* **text** `string` (optional) - Default: `'mddl'`
```

## ArgumentWithDescription

Syntax:

```md
<ArgumentBase> - <Description>
<!-- or -->
<ArgumentWithDefaultValue> - <Description>
```

Ref: [ArgumentBase](#argumentbase), [Description](#description), [ArgumentWithDefaultValue](#argumentwithdefaultvalue)

Example:

```md
* **text** `string` - A required text argument.

* **text** `string` (optional) - An optional text argument.

* **text** `string` - Default: `'mddl'` - A required text argument that defaults to `'mddl'`.

* **text** `string` (optional) - Default: `'mddl'` - An optional text argument that defaults to `'mddl'`.
```

## SingleLineArgument

An [**ArgumentBase**](#argumentbase), [**ArgumentWithDefaultValue**](#argumentwithdefaultvalue), or [**ArgumentWithDescription**](#argumentwithdescription) that **do not** have a [**Type**](#type) of `object`.

## ObjectArgument

An [**ArgumentBase**](#argumentbase), [**ArgumentWithDefaultValue**](#argumentwithdefaultvalue), or [**ArgumentWithDescription**](#argumentwithdescription) that has a [**Type**](#type) of `object`.

## ArgumentList

Syntax:

```md
<Argument>
<!-- or -->
<Argument>
<ArgumentList>
```

Ref: [Argument](#argument), [ArgumentList](#argumentlist)

## MultiLineArgument

Syntax:

```md
<ObjectParameter>
  <ArgumentList>
```

Ref: [ObjectParameter](#objectparameter), [ArgumentList](#argumentlist)

Example:

```md
* **point** `object` - A representation of a 2D point
  * **x** `number` - Default: `0`
  * **y** `number` - Default: `0`
```

## Argument

Syntax:

Ref:

Example:


<!-- ## Method

The base syntax for a **Method** definition starts with a [**MethodTitle**](#method-title) and ends with a [**ReturnLine**](#return-line)

```md
<MethodTitle>

<ReturnLine>
```

Example:

```md
# sayHelloWorld()

Returns: `string`
```

If the **Method** has arguments the title line should be followed by an [**ArgumentList**](#argument-list).

```md
<MethodTitle>

<ArgumentList>

<ReturnLine>
```

Example:

```md
# toUpperCase(text)

Arguments:

* **text** `string` - The string to be uppercased

Returns: `string`
```

If the **Method** returns `void` (like if it contains a callback argument), then the [**ReturnLine**](#return-line) can be omitted.

```md
<MethodTitle>

<ArgumentList>
```

Example:

```md
# toUpperCaseAsync(text, callback)

Arguments:

* **text** `string` - The string to be uppercased
* **callback** `(uppercasedText: string) => void` - The first argument of the callback contains the uppercased text

```

## MethodTitle

The base syntax for a **MethodTitle** is a markdown heading, follow by the method identifier and a pair of paranthesis `()`.

```md
# <MethodIdentifier>()
```

If the method has arguments, list the identifiers inside of the `()` using commas `,` for multiple arguments, and square-brackets `[]` for optional arguments. Keep in mind that it is impossible to have a non-optional argument following an optional argument.

```md
# <MethodIdentifier>(argument)
# <MethodIdentifier>(argument_1, argument_2)
# <MethodIdentifier>(argument_1[, optional_argument_2])
# <MethodIdentifier>(argument_1, argument_2[, optional_argument_3])
# <MethodIdentifier>(argument_1[, optional_argument_2, optional_argument_3])
```

An overloaded method title starts with the same base syntax, excludes any arguments, and then has a `_(<N> overloads)_` to denote how many overloads the user should expect. The overloads should then be defined as `heading + 1` entries starting with a `(N)` to denote which number overload it is documenting.

```md
# <MethodIdentifier>() _(<N> overloads)_

## (1) <MethodIdentifier>(<MethodArguments>)

## (1->N) <MethodIdentifier>(<MethodArguments>)
``` -->
