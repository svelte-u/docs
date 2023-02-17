---
title: Change Case
description: Wrapper for change-case. 
demo_link: https://svelte.dev/repl/9bee5a5d101948c9b5496eb9df31d2d4?version=3.52.0
---

# {{title}}

Wrapper for [change-case](https://github.com/blakeembrey/change-case).

## ⚡️ Prerequisites

- [x] Install the ***change-case*** package:

<div class="termy">

```console
$ pnpm add change-case

---> 100%
```

</div>

## 🎬 Usage

```html
<script>
    import {change_case} from "@sveu/extend/change_case"

    let value = "Svelte Action"
</script>

<h1>{change_case(value, "snakeCase")}</h1>

<input bind:value>

```

## 👩‍💻API

### 👻 Arguments

| Name        | Description                          | Type                          | Required |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **input**   | The string to convert                | `string`                      | Yes      |
| **type**    | The type of conversion to perform    | `string`                      | Yes      |

### 🙈 Options

Read the [change-case documentation](https://github.com/blakeembrey/change-case#options) for more information.

### ↩️ Returns

The converted string.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>


## Source Code 👀

??? tip "Source Code"

    ```ts
    import type { Options } from "change-case"

    import * as _changeCase from "./changeCase"

    export type ChangeCaseType = keyof typeof _changeCase

    /**
     * Wrapper for change-case
     *
     * @param input - Input string
     *
     * @param type - Type of change case
     *
     * @param options - [Change-case options](https://github.com/blakeembrey/change-case#options)
     *
     * @returns Changed string
     */
    export function change_case(
        input: string,
        type: ChangeCaseType,
        options?: Options | undefined
    ) {
        return _changeCase[type](input, options)
    }
    ```
