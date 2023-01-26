---
title: Last Changed
description: The last time the value changed.
demo_link: https://svelte.dev/repl/52a90566405641369451ce31e8c193fb?version=3.55.1
---

# {{title}}

Tracking the last time the value changed.

## 🎬 Usage

```html
<script>
    import {last_changed} from "@sveu/shared"

    const {value, timestamp} = last_changed(7)
</script>

```

## 👩‍💻API

### 👻 Arguments

| Name                 | Description                                  | Type                  | Required |
| -------------------- | -------------------------------------------- | --------------------- | -------- |
| **initial_value**    | Initial value                                | `MaybeStore<T>`       | Yes      |
| **initial_timestamp**| Initial timestamp                            | `number`              | No       |

### ↩️ Returns

| Name                 | Type                                         |
| -------------------- | -------------------------------------------- |
| **value**            | `PartialWritable`                            |
| **timestamp**        | `Readable<number>`                           |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## 👀 Source Code

??? tip "Source Code"

    ```ts
    import { to_readable } from "../to_readable"
    import { to_writable } from "../to_writable"
    import type { MaybeStore } from "../utils"
    import { watchable } from "../watchable"

    /**
     * A function that tracks changes to value and update a timestamp.
     *
     * @param initial_value - The initial value of the store.
     *
     * @param initial_timestamp- An optional initial timestamp.
     *
     * @returns An object containing the store and the timestamp store.
     */
    export function last_changed<T>(
        initial_value: MaybeStore<T>,
        initial_timestamp?: number
    ) {
        const timestamp = to_writable(initial_timestamp ?? +Date.now())

        const value = watchable(initial_value, () => timestamp.set(+Date.now()))

        return { value, timestamp: to_readable(timestamp) }
    }
    ```
