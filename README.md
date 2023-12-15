# mddl

markdown documentation language

**mddl** is a subset of markdown. It adds **no** new features to markdown, but adds additional rules so it is easier to author JavaScript documentation.

**mddl** looks like this:

```md
# Object: FetchOptions

An object containing any custom settings you want to apply to the request.

Parameters:

*   **method** - `string` - _optional_ - Default: `'GET'` - The request method, e.g., `"GET"`, `"POST"`
*   **headers** - `Headers | Record<string, string>` - _optional_ - Any headers you want to add to your request.
<!-- ...etc. -->

```

> **mddl** is very early in development. It is currently _not_ published to any registry. Enable notifications for this repo and follow [@ArrowoodTech](https://twitter.com/ArrowoodTech) on Twitter for latest updates.

## Packages

*   [`@mddl/spec`](./packages/spec/) - complete specification for **mddl**
*   [`@mddl/ast`](./packages/ast/) - AST forms and types
*   [`@mddl/from-mdast`](./packages/from-mdast/) - [mdast](https://github.com/syntax-tree/mdast) to [`@mddl/ast`](./packages/ast/) transformer package.

## Try it out!

Inside of [`@mddl/from-mdast`](./packages/from-mdast/) is an `example.js` you can run locally. Give it a try!

---

This project was originally inspired by Electron Docs [style-guide](https://github.com/electron/electron/blob/master/docs/styleguide.md).
