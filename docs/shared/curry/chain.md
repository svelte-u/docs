---
title: Chain
description: Execute a list of functions in order.
demo_link: https://svelte.dev/repl/be88796a876d4a8388f41950cc94f6ac?version=3.55.1
---

# {{title}}

A function that takes a list of functions and executes them in order.

## 🎬 Usage

```html
<script>
    import {chain} from "@sveu/shared/curry"

    let result = ""

    const chained = chain(
        (a, b) => a + b,
        (a) => a * 2
    )
</script>

<h1>Result: {result}</h1>

<button on:click={() => result = chained(7, 7)}>Sum</button>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **funcs**           | The list of functions to execute             | `FunctionArgs[]`      | `yes`    |

### ↩️ Returns

A chained function that takes the same arguments as the first function in the list.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import type { FunctionArgs } from "../../utils"

    /**
     * A function that takes a list of functions and executes them in order.
     *
     * @param funcs - The list of functions to execute.
     *
     */
    export function chain(...funcs: FunctionArgs[]) {
        return (...args: any[]) => {
            return funcs.slice(1).reduce((acc, fn) => fn(acc), funcs[0](...args))
        }
    }
    ```
