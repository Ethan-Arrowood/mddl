# Spec

## Method

The base syntax for a **Method** definition starts with a [**Method Title**](#method-title) and ends with a [**Return Line**](#return-line)

```md
<MethodTitle>

<ReturnLine>
```

Example:

```md
# sayHelloWorld()

Returns: `string`
```

If the **Method** has arguments the title line should be followed by an [**Argument List**](#argument-list).

```md
<Method Title>

<Argument List>

<Return Line>
```

Example:

```md
# toUpperCase(text)

Arguments:

* **text** `string` - The string to be uppercased

Returns: `string`
```

If the **Method** returns `void` (like if it contains a callback argument), then the [**Return Line**](#return-line) can be omitted.

```md
<Method Title>

<Argument List>
```

Example:

```md
# toUpperCaseAsync(text, callback)

Arguments:

* **text** `string` - The string to be uppercased
* **callback** `(uppercasedText: string) => void` - The first argument of the callback contains the uppercased text

```


### Method Title

The base syntax for a **Method Title** is a markdown heading, follow by the method identifier and a pair of paranthesis `()`.

```md
# <Method Identifier>()
```

If the method has arguments, list the identifiers inside of the `()` using commas `,` for multiple arguments, and square-brackets `[]` for optional arguments. Keep in mind that it is impossible to have a non-optional argument following an optional argument.

```md
# <Method Identifier>(argument)
# <Method Identifier>(argument_1, argument_2)
# <Method Identifier>(argument_1[, optional_argument_2])
# <Method Identifier>(argument_1, argument_2[, optional_argument_3])
# <Method Identifier>(argument_1[, optional_argument_2, optional_argument_3])
```

An overloaded method title starts with the same base syntax, excludes any arguments, and then has a `_(<N> overloads)_` to denote how many overloads the user should expect. The overloads should then be defined as `heading + 1` entries starting with a `(N)` to denote which number overload it is documenting.

```md
# <Method Identifier>() _(<N> overloads)_

## (1) <Method Identifier>(<Method Arguments>)

## (1->N) <Method Identifier>(<Method Arguments>)
```

### Argument List

An **Argument List** is a list of arguments for a given **Method**.

The list should have a `Arguments:` on the first line, followed by a newline, and then followed by 1 or many [**Argument Entry**](#argument-entry) items.

```md
Arguments:

* <Argument Entry>
```

#### Argument Entry

An **Argument Entry** is a single line representation of an **Argument List** item.

The base syntax for an entry is a markdown list item `*` that starts with the argument identifier in bold `**<Argument Identifier>**` and is immediately followed by the argument type in back-ticks `` `<Argument Type>` ``.

```md
* **<Argument Identifier>** `<Argument Type>`
```

An **Optional Argument Entry** follows the base syntax above, and is then followed with: `(optional)`.

```md
* **<Argument Identifier>** `<Argument Type>` (optional)
```

To denote the default value for an **Argument Entry** follow the base syntax or the optional syntax with: `` - Default: `<Default Value>` ``.

```md
* **<Argument Identifier>** `<Argument Type>` - Default: `<Default Value>`
* **<Argument Identifier>** `<Argument Type>` (optional) - Default: `<Default Value>`
```

To denote an **Argument Entry** description follow the base syntax, optional syntax, or the default value syntax with: ` - <Description> `.

```md
* **<Argument Identifier>** `<Argument Type>` - <Description>
* **<Argument Identifier>** `<Argument Type>` - Default: `<Default Value>` - <Description>
* **<Argument Identifier>** `<Argument Type>` (optional) - Default: `<Default Value>` - <Description>
```

For `object` type **Argument Entry** items, indent the following lines and follow the same **Argument Entry** syntax as detailed above.

```md
* **<Argument Identifier>** `object`
  * <Argument Entry>
```
