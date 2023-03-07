---
title: partial (Curry)
description: Create a partial function.
demo_link: https://svelte.dev/repl/88b0ec0189934b5fad049f67c01361dd?version=3.55.1
---

# Partial

Let you create a function by partially applying arguments to another function.

## 🎬 Usage

```html
<script>
    import {partial} from "@sveu/shared/curry"

    const add = (a, b) => a + b

    const sum = partial(add, 1)

    const sub = (a, b, c) => a - b - c

    const subtract = partial(sub, 10, 5)
</script>

<h1>Result: {sum(2)}</h1>

<h1>Result: {subtract(2)}</h1>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **fn**              | The function to partially apply arguments to | `FunctionArgs`        | `yes`    |
| **args**            | The arguments to partially apply             | `any[]`               | `yes`    |

### ↩️ Returns

A partial function that takes the same arguments as the original function, minus the arguments that were partially applied.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import type { FunctionArgs } from "../../utils"

    /**
     * Create a function by partially applying arguments to another function.
     *
     * @param fn The function to partially apply arguments to.
     *
     * @param args The arguments to partially apply to the function.
     *
     * @returns A function that takes the remaining arguments to the function.
     */
    export function partial(fn: FunctionArgs, ...args: any[]) {
        return (...rest: any[]) => fn(...args, ...rest)
    }
    ```
