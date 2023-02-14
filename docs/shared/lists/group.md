---
title: Group (Lists)
description: Group a list of items by given key of item.
demo_link: https://svelte.dev/repl/ca53cca1cca44b3eb147e0f49c2b5c40?version=3.55.1
---

# Group

{{description}}

## 🎬 Usage

```html
<script>
    import {group} from "@sveu/shared/lists"

    const actors = [
        {name: "Mila", age: 30},
        {name: "John", age: 40},
        {name: "Jane", age: 50},
        {name: "Emma", age: 30},
    ]

    const grouped = group(actors, actor => actor.age) // {30: [{name: "Mila", age: 30}, {name: "Emma", age: 30}], 40: [{name: "John", age: 40}], 50: [{name: "Jane", age: 50}]}
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **list**            | The list to group                            | `T[]`                 | Yes      |
| **fn**              | Function to get the key of each item in the list | `(item: T) => string` | Yes      |

### ↩️ Returns

A key-value pair of lists. The key is the key of the item, and the value is the list of items that have the same key.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    /**
     * Groups a list of items by a given function.
     *
     * @param list - List to group
     *
     * @param fn - Function to group by
     *
     * @returns A record of lists, where the key is the result of the function, and the value is the list of items that match the key
     */
    export function group<T>(list: T[], fn: (item: T) => string) {
        return list.reduce((acc, item) => {
            const id = fn(item)
            const group_list = acc[id] ?? []
            return { ...acc, [id]: [...group_list, item] }
        }, {} as Record<string, T[]>)
    }
    ```
