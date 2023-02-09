---
title: Throttle
description: Throttle execution of a function.
demo_link: https://svelte.dev/repl/fe39d3cea71d4322a42b9a931aeeddea?version=3.55.1
---

# {{title}}

Throttle execution of a function. Especially useful for rate limiting execution of handlers on events like resize and scroll.

## 🎬 Usage

```html
<script>
    import {throttle} from "@sveu/shared"

    let smashed = 0

    let updated = 0 

    const smash_throttled = throttle(() => {
        updated++
    }, 2)
</script>

<h4>Delay is set to 2 second for this demo.</h4>

<button on:click="{() => {smashed++;smash_throttled()}}">Smash me!</button>

<p>Button Smashed: {smashed }</p>

<p>Event handler called: { updated }</p>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **fn**              | Function to execute                          | `Function`            | Yes      |
| **s**               | Time to wait before executing `fn` in second | `number`              | Yes      |
| **trailing**        | Call `fn` again after the time is up         | `boolean`             | No       |
| **leading**         | Call `fn` immediately                        | `boolean`             | No       |

### ↩️ Returns

A throttled function that executes `fn` after `s` seconds.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { create_filter_wrapper, throttle_filter } from "../utils"
    import type { FunctionArgs } from "../utils"

    /**
     * Throttle execution of a function. Especially useful for rate limiting
     * execution of handlers on events like resize and scroll.
     *
     * @param fn - A function to be executed after delay seconds debounced.
     *
     * @param s - The time to wait before invoking the function in seconds
     *
     * @param trailing - If true, call fn again after the time is up
     *
     * @param leading - if true, call fn on the leading edge of the s timeout
     *
     * @returns A new debounce function.
     */
    export function throttle<T extends FunctionArgs>(
        fn: T,
        s = 0.2,
        trailing = false,
        leading = true
    ): T {
        return create_filter_wrapper(throttle_filter(s, trailing, leading), fn)
    }
    ```
