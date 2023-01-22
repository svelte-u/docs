---
title: Len
description: Get the length of a value.
demo_link: https://svelte.dev/repl/aeb3cc6cb72641169fc2b9bbfc6133c7?version=3.55.1
---

# {{title}}

Is a function that returns the length of a value. The function is inspired from [Python len](https://docs.python.org/3/library/functions.html#len) function.

## 🎬 Usage

```html
<script>
    import {len} from "@sveu/shared"

    const value = "Hello World"
</script>

<h1>Length of "{value}" is {len(value)}</h1>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **item**            | The value to get the length from.    | `any`                         | Yes      |

### ↩️ Returns

The length of the value. It will throw an error if the value is not iterable.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## 👀 Source Code

??? tip "Source Code"

    ```ts
    import { type } from "../type"

    /**
     * A function that returns the length of an item.
     *
     * @param item - The item to get the length of.
     *
     * @see https://docs.python.org/3/library/functions.html#len
     *
     * @returns The length of the item.
     */
    export function len<T>(item: T): number {
        if (item instanceof Map) return item.size

        if (item instanceof Set) return item.size

        if (item instanceof Object) return Object.keys(item).length

        if (item instanceof Array) return item.length

        if (typeof item === "string") return item.length

        throw new TypeError(
            `len() argument must be a sequence or collection, not ${type(item)}`
        )
    }
    ```
