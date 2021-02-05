# Spec

## Method

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
```

## ArgumentList

An **ArgumentList** is a list of arguments for a given **Method**.

The list should have a `Arguments:` on the first line, followed by a newline, and then followed by 1 or many [**ArgumentEntry**](#argument-entry) items.

```md
Arguments:

<ArgumentEntry>
```

## ArgumentEntry

An **ArgumentEntry** is a single line representation of an **ArgumentList** item.

The base syntax for an entry is a markdown list item `*` that starts with the argument identifier in bold `**<ArgumentIdentifier>**` and is immediately followed by the argument type in back-ticks `` `<ArgumentType>` ``.

```md
* **<ArgumentIdentifier>** `<ArgumentType>`
```

An optional  follows the base syntax above, and is then followed with: `(optional)`.

```md
* **<ArgumentIdentifier>** `<ArgumentType>` (optional)
```

To denote the default value for an **Argument Entry** follow the base syntax or the optional syntax with: `` - Default: `<Default Value>` ``.

```md
* **<ArgumentIdentifier>** `<ArgumentType>` - Default: `<Default Value>`
* **<ArgumentIdentifier>** `<ArgumentType>` (optional) - Default: `<Default Value>`
```

To denote an **Argument Entry** description follow the base syntax, optional syntax, or the default value syntax with: ` - <Description> `.

```md
* **<ArgumentIdentifier>** `<ArgumentType>` - <Description>
* **<ArgumentIdentifier>** `<ArgumentType>` - Default: `<DefaultValue>` - <Description>
* **<ArgumentIdentifier>** `<ArgumentType>` (optional) - Default: `<DefaultValue>` - <Description>
```

For `object` type **Argument Entry** items, indent the following lines and follow the same **Argument Entry** syntax as detailed above.

```md
* **<ArgumentIdentifier>** `object`
  * <ArgumentEntry>
```
