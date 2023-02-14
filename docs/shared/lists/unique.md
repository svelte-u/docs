---
title: Unique (Lists)
description: Gets the unique values of an array.
demo_link: https://svelte.dev/repl/d299c6bf63a7465a9102d5d3561220dd?version=3.55.1
---

# Unique

{{description}}

## 🎬 Usage

```html
<script>
    import {unique} from "@sveu/shared/lists"

    const list = [
        {id: 1, name: "John"},
        {id: 2, name: "Jane"},
        {id: 3, name: "Mila"},
        {id: 4, name: "Emma"},
        {id: 5, name: "Jack"},
        {id: 6, name: "Jack"},
    ]

    const unique_names = unique(list, item => item.name) // [{id: 1, name: "John"}, {id: 2, name: "Jane"}, {id: 3, name: "Mila"}, {id: 4, name: "Emma"}, {id: 5, name: "Jack"}]
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **list**            | The list to get the unique values from       | `T[]`                 | Yes      |
| **fn**              | To map items inside list                     | `(item: T) => K`      | No       |

### ↩️ Returns

A list of unique values.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    /**
     * Gets the unique values of an array.
     *
     * @param list - The array to process.
     *
     * @param fn - The function to determine field values
     *
     * @returns The new array of unique values.
     */
    export function unique<T, K extends string | number | symbol>(
        list: T[],
        fn: (item: T) => K
    ) {
        const value_map = list.reduce((acc, item) => {
            const key = fn ? fn(item) : (item as string | number | symbol)

            if (acc[key]) return acc

            return { ...acc, [key]: item }
        }, {} as Record<string | number | symbol, T>)

        return Object.values(value_map)
    }
    ```
