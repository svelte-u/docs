---
title: Fork (Lists)
description: Fork the given list into two lists based on the given predicate.
demo_link: https://svelte.dev/repl/5c4ef2982b8c466bb47ce9f202b72cbc?version=3.55.1
---

# Fork

{{description}}

## ๐ฌ Usage

```html
<script>
    import {fork} from "@sveu/shared/lists"

    const actors = [
        {name: "Mila", age: 30},
        {name: "John", age: 40},
        {name: "Jane", age: 50},
        {name: "Emma", age: 60},
    ]

    const [young, old] = fork(actors, actor => actor.age < 50) // [{name: "Mila", age: 30}, {name: "John", age: 40}] and [{name: "Jane", age: 50}, {name: "Emma", age: 60}]
</script>
```

## ๐ฉโ๐ปAPI

### ๐ป Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **list**            | The list to fork                             | `T[]`                 | Yes      |
| **fn**              | Function to apply a condition to each item in the list | `(item: T) => boolean`| Yes      |

### โฉ๏ธ Returns

A tuple of two lists. The first list contains the items that satisfy the condition, the second list contains the items that do not satisfy the condition.

## ๐งช Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code ๐

??? tip "Source Code"

    ```ts
    /**
     * Fork a list into two lists based on a condition.
     *
     * @param list - List to fork
     *
     * @param fn - Function to apply a condition to each item in the list
     *
     * @returns A list of lists, where the first list contains all items that match the condition, and the second list contains all items that do not match the condition
     */
    export function fork<T>(list: T[], fn: (item: T) => boolean): [T[], T[]] {
        if (!list) return [[], []]
        return list.reduce(
            (acc, item) => {
                const [a, b] = acc
                if (fn(item)) {
                    return [[...a, item], b]
                } else {
                    return [a, [...b, item]]
                }
            },
            [[], []] as [T[], T[]]
        )
    }
    ```
