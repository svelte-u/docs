---
title: Watchable
description: A function that create writable store that can be watched.
demo_link: https://svelte.dev/repl/85d580493d524002871d7b1ab5e6f5f3?version=3.55.1
---

# {{title}}

Is a writeable store that call the callback function when the value changed. This function is inspired from [Vue.js watch](https://vuejs.org/guide/essentials/watchers.html) function.

## ๐ฌ Usage

```html
<script>
    import {watchable} from "@sveu/shared"

    let new_value,old_value

    function callback(_old_value, _new_value) {
            new_value = _new_value
            old_value = _old_value
    }

    const watched = watchable(0, callback)
</script>

<button on:click={() => $watched++}>Increment</button>

<button on:click={() => $watched--}>Decrement</button>

<hr/>

<h1>new Value: {new_value}</h1>
<hr/>
<h1>old Value: {old_value}</h1>
```

## ๐ฉโ๐ปAPI

### ๐ป Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **initial_value**   | The initial value of the store.      | `MaybeStore<T>`               | Yes      |
| **fn**              | A function to call when the value changes.  | `(old_value: T, new_value: T) => void` | Yes      |

### โฉ๏ธ Returns

A store containing `set`, `subscribe`, `pause` and `resume` functions.

## ๐งช Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code ๐

??? tip "Source Code"

    ```ts
    import { to_writable } from "../to_writable"
    import type { MaybeStore, Watchable } from "../utils"

    /**
     * Creates a writable store that calls a function when the value changes.
     *
     * @param initial_value - Initial value to start watching
     *
     * @param fn - Function to call when the value changes
     *
     * @see https://vuejs.org/guide/essentials/watchers.html
     *
     * @returns A writable store that calls a function when the value changes
     */
    export function watchable<T>(
        initial_value: MaybeStore<T>,
        fn: (o: T, n: T) => void
    ): Watchable<T> {
        const { subscribe, update } = to_writable(initial_value)

        let active = true

        return {
            subscribe,
            set: (value: T) => {
                update((old_value) => {
                    if (active) fn(old_value, value)
                    return value
                })
            },

            pause: () => {
                active = false
            },

            resume: () => {
                active = true
            },
        }
    }
    ```
