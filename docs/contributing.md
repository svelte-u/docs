---
title: Contributing
description: How to contribute to Svelte Utility Libraries
---

# {{title}}

Thanks for being interested in contributing to this project!

## Development

### Setup

Clone the repo that you want to contribute into, to your local machine and install the dependencies.

<div class="termy">

```console
$ pnpm install

---> 100%
```

</div>

Run the tests to make sure everything is working.

<div class="termy">

```console
$ pnpm test

---> 100%
```

</div>

We use [commitizen](https://commitizen-tools.github.io/commitizen/). Installed on your machine.

<div class="termy">

```console
$ pnpm git:add && pnpm commit

---> 100%
```

</div>

## Contributing

### Existing functions

Feel free to enhance the existing functions. Please try not to introduce breaking changes unless absolutely necessary.

### New functions

There are some notes for adding new functions

-   Before you start working, it's better to discuss the function you want to add in [discord](https://discord.gg/XM5uQhDHfZ).
-   Details explained in the [Function Folder](#function-folder) section.
-   Try not to introduce 3rd-party dependencies in [@sveu/actions](https://github.com/svelte-u/actions), [@sveu/browser](https://github.com/svelte-u/browser) or [@sveu/shared](https://github.com/svelte-u/shared) as these package's is aimed to be as lightweight as possible.
-   If you'd like to introduce 3rd-party dependencies, please contribute to [@sveu/extend](https://github.com/svelte-u/extend).
-   For `@sveu/extend` case, install the 3rd-party library you want to use, `pnpm add -D <library>`.
-   Add the package that you just installed to `peerDependencies` and `peerDependenciesMeta` in `package.json`.

    ```json
    {
    	"peerDependencies": {
    		"<library>": "*"
    	},
    	"peerDependenciesMeta": {
    		"<library>": {
    			"optional": true
    		}
    	}
    }
    ```

> Please note you don't need to update packages' `src/index.ts`. It's automatically generated.

## Project Structure

### Function Folder

A function folder typically contains these 2 files:

```bash
index.ts            # function source code itself
index.test.ts       # vitest unit testing
```

for `index.ts` you should export the function with names.

```ts
// DO
export { my_fnction }
// Do
export function my_function() {}
// DON'T
export default my_function
// DON'T
export default function my_function() {}
```

## Code Style

We prefer [snake case syntax](https://en.wikipedia.org/wiki/Snake_case), and indent with 4 spaces.

## Thanks

Thank you again for being interested in this project! You are awesome!
