---
title: To Writable
description: Convert any value to writable store
demo_link: https://svelte.dev/repl/c451790a94a34c188a9d34f33dc51626?version=3.55.1
---

# {{title}}

When you use `writable` store from svelte store, it will covert a plain value to a writable store, which what you wish for but if you try to in another store it will nest that store inside a writable store, which is not what you want in most case and this function will help you to avoid that. It will check if the value is a writable store or not and if it is it will return it as it is, if not it will convert it to a writable store.

## 🎬 Usage

```html
<script>
    import {readable} from "svelte/store"

    import {to_writable} from "@sveu/shared"

    const num = readable(0)

    const new_num = to_writable(num)

    $new_num = 1
</script>
{$new_num}
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **value**           | The value to be converted            | `MaybeStore<T>`               | Yes      |

### ↩️ Returns

A writable store.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { writable } from "svelte/store"
    import type { Writable } from "svelte/store"

    import { unstore } from "../unstore"
    import { is_partial_writable, is_readable_only } from "../utils"
    import type { MaybeStore } from "../utils"

    /**
     * Convert a value or a store to a writable store.
     *
     * @param value - The value or store to convert.
     *
     * @returns A writable store.
     */
    export function to_writable<T>(value: MaybeStore<T>): Writable<T> {
        if (is_partial_writable(value)) return value

        if (is_readable_only(value)) return writable(unstore(value))

        return writable(value)
    }
    ```
