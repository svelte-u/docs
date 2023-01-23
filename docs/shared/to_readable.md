---
title: To Readable
description: Convert any value to readable store
demo_link: https://svelte.dev/repl/6355337627484de683c5a0b227ab35fa?version=3.55.1
---

# {{title}}

When you use `readable` store from svelte store, it will covert a plain value to a readable store, which what you wish for but if you try to in another store it will nest that store inside a readable store, which is not what you want in most case and this function will help you to avoid that. It will check if the value is a readable store or not and if it is it will return it as it is, if not it will convert it to a readable store.

## 🎬 Usage

```html
<script>
    import {writable} from "svelte/store"

    import {to_readable} from "@sveu/shared"

    const num = writable(0)

    const new_num = to_readable(num)
</script>

{$new_num}
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **value**           | The value to be converted            | `MaybeStore<T>`               | Yes      |

### ↩️ Returns

A readable store.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## 👀 Source Code

??? tip "Source Code"

    ```ts
    import { readable } from "svelte/store"
    import type { Readable } from "svelte/store"

    import { is_partial_writable, is_readable_only } from "../utils"
    import type { MaybeStore } from "../utils"

    /**
     * A function that converts a value to a readable store, the value could be plain, writable, or even readable store
     *
     * @param value - the value to be converted
     *
     * @returns a readable store
     */
    export function to_readable<T>(value: MaybeStore<T>): Readable<T> {
        if (is_partial_writable(value)) {
            return {
                subscribe: value.subscribe,
            }
        }

        return is_readable_only(value) ? value : readable(value)
    }
    ```
