---
title: Debounce
description: Debounce execution of a function.
demo_link: https://svelte.dev/repl/896ca00647034f1289d8e78460d6c130?version=3.55.1
---

# {{title}}

Executes a function after a certain amount of time has passed.

## 🎬 Usage

```html
<script>
    import {debounce} from "@sveu/shared"
    const sum_debounce = debounce(() => {
        alert(7 + 7)
    }, 1)
</script>

<button on:click={sum_debounce}>Sum</button>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **fn**              | Function to execute                          | `Function`            | Yes      |
| **s**               | Time to wait before executing `fn` in second | `number`              | Yes      |

### 🙈 Options

| Name                | Description                                          | Type        | Default     |
| ------------------- | ---------------------------------------------------- | ----------- | ----------- |
| **max_wait**        | Maximum time to wait before executing `fn` in second | `number`    | `undefined` |
| **reject_on_cancel**| Reject the promise if the function is cancelled      | `boolean`   | `false`     |

### ↩️ Returns

A function that executes `fn` after `s` seconds.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## 👀 Source Code

??? tip "Source Code"

    ```ts
    import { create_filter_wrapper, debounce_filter } from "../utils"
    import type { DebounceFilterOptions, FunctionArgs } from "../utils"

    /**
     * Debounce execution of a function.
     *
     * @param fn - A function to be executed after delay seconds debounced.
     *
     * @param s - The time to wait before invoking the function in seconds.
     *
     * @returns A new debounce function.
     */
    export function debounce<T extends FunctionArgs>(
        fn: T,
        s = 0.2,
        options: DebounceFilterOptions = {}
    ): T {
        return create_filter_wrapper(debounce_filter(s, options), fn)
    }
    ```
