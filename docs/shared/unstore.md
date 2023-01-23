---
title: Unstore
description: Safely get the value of a store
demo_link: https://svelte.dev/repl/c9a00f8af7ff4b24893dcaadaf5837a4?version=3.55.1
---

# {{title}}

Safely get the value of a store. If the value is not a store, it will be returned as is.

## 🎬 Usage

```html
<script>
    import {readable, writable} from "svelte/store"

    import {unstore} from "@sveu/shared"

    const num = readable(0)

    const str = readable("Hello")

    const list = [1,2, "Hi"]
</script>

{unstore(num)}
<br/>
{unstore(str)}
<br/>
{unstore(list)}
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **value**           | A plain value or a store             | `MaybeStore<T>`               | Yes      |

### ↩️ Returns

A value.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## 👀 Source Code

??? tip "Source Code"

    ```ts
    import { get } from "svelte/store"

    import { is_readable } from "../utils"
    import type { MaybeStore } from "../utils"

    /**
     * Safely get the value of a store, or return the value if it's not a store.
     *
     * @param value - The value to unstore.
     *
     * @returns The value of the store, or the value if it's not a store.
     */
    export function unstore<T>(value: MaybeStore<T>): T {
        return is_readable(value) ? get(value) : value
    }
    ```
