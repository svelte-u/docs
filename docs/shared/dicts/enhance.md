---
title: Enhance (Dicts)
description: Enhance an object with some useful methods.
demo_link: https://svelte.dev/repl/8a6343f556954d568f33b126df7fc709?version=3.55.1
---

# Enhance

{{description}}

## 🎬 Usage

```html
<script>
    import {enhance} from "@sveu/shared/dicts"

    const obj = {a: 1, b: 2, c: 3}

    const dict = enhance(obj)

    dict.add("d", 4)

    dict.contains("a", "b") // true

    dict.clear()

    dict.contains("a") // false

    dict.add("a", 1)

    dict.get("a") // 1

    const copy = dict.copy() // {a: 1}

    dict.from_keys(["b", "c"], 2) // {b: 2, c: 2}

    dict.invert() // {1: "a", 2: "b", 3: "c"}

    dict.keys() // ["a", "b", "c"]

    dict.pop("a") // 1

    dict.popitem() // [c, 3]

    dict.values() // [2, 3]
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **obj**             | The object to enhance                        | `Dict`                | Yes      |

### 📝 Methods

#### `add`

Add a value to the dict.

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **key**             | The key to add                               | `string`              | Yes      |
| **value**           | The value to add                             | `unknown`             | Yes      |

#### `clear`

Clear the dict.

#### `contains`

Check if the dict contains a key.

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **key**             | The key to check                             | `string`              | Yes      |

#### `copy`

Copy the dict.

#### `from_keys`

Create a dict from keys.

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **keys**            | The keys to use                              | `string[]`            | Yes      |
| **value**           | The value to add                             | `unknown`             | No       |

#### `get`

Get a value from the dict.

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **key**             | The key to get                               | `string`              | Yes      |
| **fallback**        | The fallback value                           | `unknown`             | No       |

#### `invert`

Change the keys and values of the dict.

#### `keys`

Get the keys of the dict.

#### `pop`

Get a value from the dict and remove it.

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **key**             | The key to get                               | `string`              | Yes      |

#### `popitem`

Remove the last item from the dictionary and return it.

#### `values`

Get the values of the dict.

### ↩️ Returns

A store with extra methods.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { to_writable } from "../../to_writable"
    import { unstore } from "../../unstore"
    import type { Dict } from "../../utils"
    import { contains as _contains } from "../contains"
    import { invert as _invert } from "../invert"

    /**
     * Enhance a object with some useful methods.
     *
     * @param obj - The object to enhance.
     *
     * @returns The enhanced object.
     * - `subscribe` - A svelte store.
     * - `add` - Add a value to the dict.
     * - `clear` - Clear the dict.
     * - `contains` - Check if the dict contains a key.
     * - `copy` - Copy the dict.
     * - `from_keys` - Create a dict from keys.
     * - `get` - Get a value from the dict.
     * - `invert` - Invert the dict.
     * - `keys` - Get the keys of the dict.
     * - `pop` - Remove a value from the dict.
     * - `popitem` - Remove the last item from the dict.
     * - `values` - Get the values of the dict.
     */
    export function enhance(obj: Dict) {
        const dict = to_writable(obj)

        /**
         * Add a value to the dict.
         *
         * @param key - The key to add.
         *
         * @param value - The value to add.
         *
         */
        function add(key: string, value: unknown) {
            dict.update((n: Dict) => {
                n[key] = value
                return n
            })
        }

        /** Clear the dict.*/
        function clear() {
            dict.update((n: Dict) => {
                for (const key in n) {
                    delete n[key]
                }
                return n
            })
        }
        /**
         * Check if the dict contains a key.
         *
         * @param key - The key to check.
         *
         * @returns boolean
         */
        function contains(key: string) {
            return _contains(unstore(dict), key)
        }
        /**
         * Copy the dict.
         *
         * @returns The copied dict.
         */
        function copy() {
            return enhance({ ...unstore(dict) })
        }

        /**
         * Create a dict from keys.
         *
         * @param keys - The keys to create.
         *
         * @param value - The value to set.
         *
         * @returns The created dict.
         */
        function from_keys(keys: string[], value: unknown) {
            return enhance(
                keys.reduce((n, k) => {
                    n[k] = value
                    return n
                }, {} as Dict)
            )
        }

        /**
         * Get a value from the dict.
         *
         * @param key - The key to get.
         *
         * @param fallback - The fallback value if the key is not found.
         *
         * @returns The value.
         */
        function get(key: string, fallback: unknown = null) {
            return unstore(dict)[key] ?? fallback
        }

        /**
         * Invert the dict.
         *
         * @returns The inverted dict.
         */

        function invert() {
            dict.set(_invert(unstore(dict)))
        }

        /**
         * Get the keys of the dict.
         *
         * @returns The keys.
         */
        function keys() {
            return Object.keys(unstore(dict))
        }

        /**
         * Get a value from the dict and remove it.
         *
         * @param key - The key to get.
         *
         * @returns The value.
         */
        function pop(key: string) {
            const value = get(key)

            dict.update((n: Dict) => {
                delete n[key]
                return n
            })

            return value
        }

        /**
         * Remove the last item from the dictionary and return it.
         *
         * @returns The last item.
         */
        function popitem() {
            const key = Object.keys(unstore(dict)).pop()

            if (key) {
                const value = get(key)

                dict.update((n: Dict) => {
                    delete n[key]
                    return n
                })

                return [key, value]
            }

            return null
        }

        /**
         * Get the values of the dict.
         *
         * @returns The values.
         */
        function values() {
            return Object.values(unstore(dict))
        }

        return {
            subscribe: dict.subscribe,
            add,
            clear,
            contains,
            copy,
            from_keys,
            get,
            invert,
            keys,
            pop,
            popitem,
            values,
        }
    }
    ```
