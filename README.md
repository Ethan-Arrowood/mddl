# mddl

markdown documentation language

This specification is a subset of markdown. It adds **no** new features to markdown, but adds additional rules so it is easier to author JavaScript documentation.

**mddl** looks like this:

```md
# Object: person

A person.

Parameters:

- **name** - `name`
- **birthday** - `string`

## Object: name

A person's name.

Parameters:

- **firstName** - `string`
- **middleName** - `string` - _optional_
- **lastName** - `string`
```

It is specified here: [`@mddl/spec`](./packages/spec/)

And an AST + Transformer are being developed here: [`@mddl/ast`](./packages/ast/) and here: [`@mddl/mdast-transformer`](./packages/mdast-transformer/)

---

This is directly inspired by Electron Docs [style-guide](https://github.com/electron/electron/blob/master/docs/styleguide.md). 

Originally, this project was going to be built to service Electron's and Node's existing documentation styles and provide some type of standardization to the major projects. This project idea has evolved significantly since then and may not uphold this original goal immediately.
