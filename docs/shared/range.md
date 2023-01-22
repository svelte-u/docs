---
title: Range
description: Creates a range of numbers.
demo_link: https://svelte.dev/repl/05248e3423c140209c85c1f957b25f15?version=3.55.1
---

# {{title}}

A function that creates a range of numbers from `start` to `end` with a `step`. This function is similar to the [range function in Python](https://docs.python.org/3/library/functions.html#func-range).

## 🎬 Usage

```html
<script>
    import {range} from "@sveu/shared"

    const numbers = [...range(0, 10, 2)]
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **start**           | Starting number                      | `number`                      | Yes      |
| **stop**            | Stop number                          | `number`                      | No       |
| **step**            | Step number                          | `number`                      | No       |

### ↩️ Returns

A generator number.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## 👀 Source Code

??? tip "Source Code"

    ```ts
    /**
     * Returns an generator of numbers from start to stop.
     *
     * @param start - The start of the range.
     *
     * @param stop - The end of the range.
     *
     * @param step - The step of the range.
     *
     * @see https://docs.python.org/3/library/functions.html#func-range
     *
     * @returns An generator of numbers.
     */
    export function* range(
        start: number,
        stop?: number,
        step = 1
    ): Generator<number> {
        if (typeof stop === "undefined") {
            stop = start
            start = 0
        }

        if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
            return []
        }

        for (let i = start; i <= stop; i += step) {
            yield i
            if (i + step > stop) break
        }
    }
    ```
