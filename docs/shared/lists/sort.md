---
title: Sort (Lists)
description: Sorts a list of objects by given key.
demo_link: https://svelte.dev/repl/1be4acbb0537499a8f0f490f68ec046d?version=3.55.1
---

# Sort

{{description}}

## ๐ฌ Usage

```html
<script>
    import {sort} from "@sveu/shared/lists"

    const list = [
        {id: 1, name: "John"},
        {id: 2, name: "Jane"},
        {id: 3, name: "Mila"},
        {id: 4, name: "Emma"},
        {id: 5, name: "Jack"},
    ]

    const sorted = sort(list, "name") // [{id: 4, name: "Emma"}, {id: 5, name: "Jack"}, {id: 2, name: "Jane"}, {id: 1, name: "John"}, {id: 3, name: "Mila"}]

    const sorted_desc = sort(list, "-name") // [{id: 3, name: "Mila"}, {id: 1, name: "John"}, {id: 2, name: "Jane"}, {id: 5, name: "Jack"}, {id: 4, name: "Emma"}]
</script>
```

## ๐ฉโ๐ปAPI

### ๐ป Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **list**            | The list to sort                             | `T[]`                 | Yes      |
| **key**             | The key to sort by                           | `string`              | Yes      |

### โฉ๏ธ Returns

A sorted list of objects.

## ๐งช Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code ๐

??? tip "Source Code"

    ```ts
    import type { Dict } from "../../utils"

    /**
     * Sorts a list of objects by a given key.
     *
     * @param list - The list to sort.
     *
     * @param key - The key to sort by.
     *
     * @returns The sorted list.
     */
    export function sort<T extends Dict>(list: T[], key: string) {
        if (!list) return []

        let sort_order = 1

        if (key[0] === "-") {
            sort_order = -1
            key = key.slice(1)
        }

        const order = (a: T, b: T) => {
            const result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
            return result * sort_order
        }

        return list.slice().sort(order)
    }
    ```
