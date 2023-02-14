---
title: Count (Lists)
description: Count the number of items in the given list
demo_link: https://svelte.dev/repl/f5d9410211e7418e902f3cececbec5ea?version=3.55.1
---

# Count

{{description}}

## 🎬 Usage

```html
<script>
    import {count} from "@sveu/shared/lists"

    let list = [
        {id: 1, name: "John"},
        {id: 2, name: "Jane"},
        {id: 3, name: "John"},
        {id: 4, name: "John"},
        {id: 5, name: "Jane"},
    ]

    const counts = count(list, item => item.name) // {John: 3, Jane: 2}

    const actors = ["Mila", "John", "Jane", "John", "John", "Mila", "Mila"]


    const counts2 = count(actors, actor => actor) // {Mila: 3, John: 3, Jane: 1}
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **list**            | The list to count                            | `T[]`                 | Yes      |
| **fn**              | A function that returns the id of an item or the field to count.       | `(item: T) => string | number | symbol`| Yes       |

### ↩️ Returns

A key-value pair of the number of times each item appears.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import type { Dict } from "../../utils"

    /**
     * Counts the number of times each item appears in a list.
     *
     * @param list -  The list to count.
     *
     * @param fn -  A function that returns the id of an item or the field to count.
     *
     * @returns A record of the number of times each item appears in the list.
     */
    export function count<T extends Dict>(
        list: T[],
        fn: (item: T) => string | number | symbol
    ) {
        return list.reduce((acc, item) => {
            const id = fn(item)
            return {
                ...acc,
                [id]: (acc[id] ?? 0) + 1,
            }
        }, {} as Record<string | number | symbol, number>)
    }
    ```
