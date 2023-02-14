---
title: Listify (Dicts)
description: Convert an object to a list of items.
demo_link: https://svelte.dev/repl/5ec26aa8c8ab438283d52814e376929f?version=3.55.1
---

# Listify

{{description}}

## 🎬 Usage

```html
<script>
    import {listify} from "@sveu/shared/dicts"

    const obj = {"Mila": "Kunis", "Emma": "Watson", "Scarlett": "Johansson"}

    listify(obj, (key, value) => [key, value]) // [["Mila", "Kunis"], ["Emma", "Watson"], ["Scarlett", "Johansson"]]
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description            | Type                                        | Required |
| ------------------- | ---------------------- | ------------------------------------------- | -------- |
| **obj**             | object to listify      | `Record<string | number | symbol, any>`     | `yes`    |
| **to_item**         | function to convert key-value pairs to items | `(key: string, value: any) => any` | `yes`    |

### ↩️ Returns

A new list of items.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    /**
     * Convert an object to a list of items.
     *
     * @param obj - The object to convert.
     *
     * @param to_item - The function to convert each key-value pair to an item.
     *
     * @returns The list of items.
     */
    export function listify<Value, Key extends string | number | symbol, KResult>(
        obj: Record<Key, Value>,
        to_item: (key: Key, value: Value) => KResult
    ) {
        if (!obj) return []

        const entries = Object.entries(obj)

        if (entries.length === 0) return []

        return entries.reduce((acc, entry) => {
            return [...acc, to_item(entry[0] as Key, entry[1] as Value)]
        }, [] as KResult[])
    }
    ```
