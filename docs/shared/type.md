---
title: Type
description: Get better data type detail.
demo_link: https://svelte.dev/repl/70767d6536e4470c8c2b37a4077b465f?version=3.55.1
---

# {{title}}

Is function that help you get better data type information rather than the default `typeof`, inspired from [python type Built-in function](https://docs.python.org/3/library/functions.html#type)


## 🎬 Usage

```html
<script>
    import {type} from "@sveu/shared"
</script>

<h1>string? {type("svelte") === "string"  ? 'yea' : "nope"}</h1>
```

## 👩‍💻API

### 👻 Arguments

| Name        | Description                          | Type                          | Required |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **value**   | The value to check                   | any                           | Yes      |

### ↩️ Returns

A string that represent the type of the value.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    /**
     * A function that get date type, that inspired from python type function.
     *
     * @remarks This function is used to get the type of the value.
     *
     * @param value - The value to get type.
     *
     * @see https://docs.python.org/3/library/functions.html#type
     *
     * @returns The type of the value.
     */
    export function type<T>(value: T): string {
        return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
    }
    ```
