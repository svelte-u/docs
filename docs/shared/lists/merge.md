---
title: Merge (Lists)
description: Merge two lists and override the first list with the second list
demo_link: https://svelte.dev/repl/e09c50fc7d13448c82eccfefa0ebc201?version=3.55.1
---

# Merge

{{description}}

## 🎬 Usage

```html
<script>
    import {merge} from "@sveu/shared/lists"

    const list = [
        {id: 1, name: "John"},
        {id: 2, name: "Jane"},
        {id: 3, name: "Jack"},
    ]

    const other = [
        {id: 2, name: "Jane Doe"},
    ]

    const merged = merge(list, other, (item) => item.id) // [{id: 1, name: "John"}, {id: 2, name: "Jane Doe"}, {id: 3, name: "Jack"}]
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **list**            | The list to merge                            | `T[]`                 | Yes      |
| **other**           | The list to merge with                       | `T[]`                 | Yes      |
| **fn**              | To map items.                                | `(item: T) => K`      | Yes      |

### ↩️ Returns

New list with the items from the other list merged in.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    /**
     * Merge two lists and override the first list with the second list
     *
     * @param list - The first list.
     *
     * @param other - The second list to merge.
     *
     * @param fn - A function that returns a unique key for each item in the array.
     *
     * @returns a new list with the second list merged into the first list.
     */
    export function merge<T, K extends string | number | symbol>(
        list: T[],
        other: T[],
        fn: (item: T) => K
    ): T[] {
        if (!other && !list) return []

        if (!other) return list

        if (!list) return []

        if (!fn) return list

        return list.reduce((acc, r) => {
            const matched = other.find((o) => fn(r) === fn(o))
            return matched ? [...acc, matched] : [...acc, r]
        }, [] as T[])
    }
    ```
