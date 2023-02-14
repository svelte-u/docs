---
title: Intersects (Lists)
description: Check if two lists intersect.
demo_link: https://svelte.dev/repl/0eaba800e1e04a1e866add954a909a8b?version=3.55.1
---

# Intersects

{{description}}

## 🎬 Usage

```html
<script>
    import {intersects} from "@sveu/shared/lists"

    const a = [1, 2, 3]

    const b = [2, 3, 4]

    const [intersects, intersecting] = intersects(a, b) // [true, [2, 3]]
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **a**               | First list                                   | `T[]`                 | Yes      |
| **b**               | Second list                                  | `T[]`                 | Yes      |

### 🙈 Options

| Name                | Description                                          | Type        | Default     |
| ------------------- | ---------------------------------------------------- | ----------- | ----------- |
| **fn**              | A function that returns a unique key for each item in the array. | `fn?: (item: T) => K` | `item => item` |

### ↩️ Returns

A tuple of the items that intersect and boolean indicating if the lists intersect.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import type { IntersectsOptions } from "../../utils"

    /**
     * Determine whether the given arrays intersect.
     *
     * @param a - The first array.
     *
     * @param b - The second array.
     *
     * @param options - options:
     * - `fn` - A function that returns a unique key for each item in the array.
     *
     * @returns a boolean value indicating whether the arrays intersect and the intersecting items.
     */
    export function intersects<T, K extends string | number | symbol>(
        a: T[],
        b: T[],
        options: IntersectsOptions<T, K> = {}
    ): [boolean, T[]] {
        const { fn = (item: T) => item as unknown as K } = options

        if (!a || !b) return [false, []]

        const dict_b = b.reduce(
            (acc, item) => ({ ...acc, [fn(item)]: true }),
            {} as Record<K, boolean>
        )

        return [
            a.some((item) => dict_b[fn(item)]),
            a.filter((item) => dict_b[fn(item)]),
        ]
    }
    ```
