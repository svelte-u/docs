---
title: Random (Math)
description: Generate a random number between two numbers.
demo_link: https://svelte.dev/repl/691aa65d1e4843fbb815f783577430e1?version=3.55.1
---

# Random

{{description}}

## ๐ฌ Usage

```html
<script>
    import {random} from "@sveu/shared/math"

    let result = ""
</script>

<h1>{result}</h1>

<button on:click="{() => result = random(0, 100)}">Generate</button>
```

## ๐ฉโ๐ปAPI

### ๐ป Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **min**             | The minimum number to generate.              | `number`              | Yes      |
| **max**             | The maximum number to generate.              | `number`              | Yes      |

### โฉ๏ธ Returns

Returns a random number between the minimum and maximum number.

## ๐งช Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code ๐

??? tip "Source Code"

    ```ts
    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     *
     * @param min - The minimum number
     *
     * @param max - The maximum number
     *
     * @returns a random number between min (inclusive) and max (exclusive).
     */
    export function random(min: number, max: number): number {
        min = Math.ceil(min)

        max = Math.floor(max)

        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    ```
