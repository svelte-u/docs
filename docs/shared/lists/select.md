---
title: Select (Lists)
description: Selects a list of values from a list of objects
demo_link: https://svelte.dev/repl/0925df953b574db085f00466d875ba30?version=3.55.1
---

# Select

{{description}}

## 🎬 Usage

```html
<script>
    import {select} from "@sveu/shared/lists"

    const list = [
        {id: 1, name: "John"},
        {id: 2, name: "Jane"},
        {id: 3, name: "Jack"},
    ]

    const names = select(list, (item) => item.name) // ["John", "Jane", "Jack"]

    const ids = select(list, (item) => item.name, (item) => item.id > 1) // [2, 3]
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **list**            | The list to select from                      | `T[]`                 | Yes      |
| **fn**              | To map items.                                | `(item: T) => K`      | Yes      |
| **condition**       | To filter items.                             | `(item: T) => boolean`| No       |

### ↩️ Returns

A list of values of the item.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    /**
     * Selects a list of values from a list of objects
     *
     * @param list - The list of objects to select from
     *
     * @param fn - The function to select the value from the object
     *
     * @param condition - The condition to filter the list by
     *
     * @returns The list of values
     */
    export function select<T, K>(
        list: T[],
        fn: (item: T) => K,
        condition?: (item: T) => boolean
    ) {
        return list.reduce((acc, item) => {
            if (condition && !condition(item)) return acc
            return [...acc, fn(item)]
        }, [] as K[])
    }
    ```
