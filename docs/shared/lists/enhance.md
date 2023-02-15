---
title: Enhance (Lists)
description: Enhance an array with some useful methods.
demo_link: https://svelte.dev/repl/7bcade8797874e5d963e1611038e3c8f?version=3.55.1
---

# Enhance

{{description}}

## 🎬 Usage

```html
<script>
    import {enhance} from "@sveu/shared/lists"

    const arr = [1, 2, 3]

    const list = enhance(arr)

    list.append(4) // [1, 2, 3, 4]

    list.clear() // []

    list.append([1, 2, 3]) // [1, 2, 3]

    list.count(1) // 1

    list.copy() // [1, 2, 3]

    list.index(2) // 1

    list.insert(4, 1) // [1, 4, 2, 3]

    list.remove(1) // [2, 3]

    list.pop() // 3

    list.sort({type: "number"}) // [1, 2, 3]
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **arr**             | The array to enhance                         | `T[]`                 | Yes      |

### 📝 Methods

#### `append`

Add the item to the end of the list.

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **item**            | The item to add.                             | `T | T[]`             | Yes      |

#### `clear`

Removes all items from the list.

#### `count`

Count the number of times an item appears in the list.

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **item**            | The item to count.                           | `T`                   | No       |

#### `copy`

Returns a copy of the list.

#### `index`

Returns the index of the first item that matches the given value.

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **item**            | The item to find.                            | `T`                   | Yes      |
| **start**           | The index to start searching from.           | `number`              | No       |

#### `insert`

Insert an item at a given position.

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **item**            | The item to insert.                          | `T | T[]`             | Yes      |
| **index**           | The index to insert the item at. default 0   | `number`              | No      |


#### `remove`

Removes an item from the list.

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **item**            | The item to remove.                          | `T | T[]`             | Yes      |

#### `pop`

Remove an item by index.

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **index**           | The index of the item to remove. default -1  | `number`              | No       |

#### `sort`

Sort the list.

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **options**         | The options to sort the list with.           | `EnhanceSortOptions`  | No       |

#### `sort (options)`

| Name                | Description                    | Type                            | Default    |
| ------------------- | ------------------------------ | ------------------------------- | ---------- |
| **type**            | The item inside the list.      | `"number" | "string" | "object"`| `string`   |
| **sort_by**         | The key to sort by. If only `type` is object | `string` | The first key of the object. |
| **reverse**         | Reverse the list.             | `boolean`                       | `false`    |

### ↩️ Returns

A store with extra methods.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { to_writable } from "../../to_writable"
    import { unstore } from "../../unstore"
    import type { Dict, EnhanceSortOptions } from "../../utils"
    import { sort as _sort } from "../sort"

    /**
     * Enhance an array with some useful methods.
     *
     * @param arr - The array to enhance.
     *
     * @returns The enhanced array.
     * - `subscribe` - A svelte store.
     * - `append` - Add an item to the end of the list.
     * - `clear` - Remove all items from the list.
     * - `count` - Count the number of times an item appears in the list.
     * - `copy` - Returns a copy of the list.
     * - `index` - Returns the index of the first item that matches the given value.
     * - `insert` - Insert an item at a given position.
     * - `remove` - Removes an item from the list.
     * - `pop` - Remove an item by index.
     * - `sort` - Sort the list.
     */
    export function enhance<T>(arr: T[]) {
        const list = to_writable(arr)

        /**
         * Add the item to the end of the list.
         *
         * @param item - The item to add.
         *
         */
        function append(item: T | T[]) {
            if (Array.isArray(item)) {
                list.update((n) => [...n, ...item])
            } else {
                list.update((n) => [...n, item])
            }
        }

        /** Removes all items from the list. */
        function clear() {
            list.set([])
        }

        /**
         * Count the number of times an item appears in the list.
         *
         * @param item - The item to count. (optional)
         *
         * @returns - Number of times the item appears in the list.
         */
        function count(item?: T) {
            if (item) {
                let count = 0

                const _list = unstore(list)

                for (let i = 0; i < _list.length; i++) {
                    if (_list[i] === item) {
                        count++
                    }
                }

                return count
            } else {
                return arr.length
            }
        }

        /** Returns a copy of the list. */
        function copy() {
            return enhance([...unstore(list)])
        }

        /**
         * Get an index of the specified item.
         *
         * @param item - The item to get the index of.
         *
         * @param start - The index to start searching from. (optional)
         *
         * @returns The index of the item.
         */
        function index(item: T, start?: number) {
            return unstore(list).indexOf(item, start)
        }

        /**
         * Insert an item into the list.
         *
         * @param item - The item to insert.
         *
         * @param index - The index to insert the item at. (default: 0)
         */
        function insert(item: T | T[], index = 0) {
            if (Array.isArray(item)) {
                list.update((n) => [
                    ...n.slice(0, index),
                    ...item,
                    ...n.slice(index),
                ])
            } else {
                list.update((n) => [...n.slice(0, index), item, ...n.slice(index)])
            }
        }

        /**
         * Remove an item from the list.
         *
         * @param item - The item to remove.
         *
         */
        function remove(item: T | T[]) {
            if (Array.isArray(item)) {
                list.update((n) => n.filter((i) => !item.includes(i)))
            } else {
                list.update((n) => n.filter((i) => i !== item))
            }
        }

        /**
         * Remove an item by index.
         *
         * @param index - The index of the item to remove. (default: -1)
         *
         * @returns The removed item.
         */
        function pop(index?: number) {
            const _list = unstore(list)

            const item = _list.at(index ?? -1)

            remove(item ?? [])

            return item
        }

        /**
         * Sort the list.
         *
         * @param options - The options to use when sorting the list.
         * - `type`: The type of item in the list. (default: "string")
         * - `sort_by`: Sort by the key of item. This only work for `type` object items. if sort_by isn't provided when you make `type = object`, it will sort by the first key
         * - `reverse`: Reverse the list. (default: false)
         */
        function sort(options: EnhanceSortOptions = {}) {
            const { type = "string", sort_by, reverse = false } = options

            const _list = unstore(list)

            if (type === "string") {
                list.set(
                    _list.sort((a: any, b: any) =>
                        reverse ? b.localeCompare(a) : a.localeCompare(b)
                    )
                )
            } else if (type === "number") {
                list.set(_list.sort((a: any, b: any) => (reverse ? b - a : a - b)))
            } else if (type === "object") {
                let _sort_by = sort_by ?? Object.keys(_list[0] as Dict)[0]

                if (reverse) {
                    _sort_by = `-${_sort_by}`
                }

                list.set(_sort(_list as any, _sort_by))
            }
        }

        return {
            subscribe: list.subscribe,
            append,
            clear,
            count,
            copy,
            index,
            insert,
            remove,
            pop,
            sort,
        }
    }
    ```
