---
title: Picker
description: Gets the new object with the specified keys from the original object.
demo_link: https://svelte.dev/repl/678cd3bff0d64c0b8099ab59f3f8ae33?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {picker} from "@sveu/shared/dicts"

    const obj = {"Mila": "Kunis", "Emma": "Watson", "Scarlett": "Johansson"}

    picker(obj, ["Mila", "Emma"]) // {"Mila": "Kunis", "Emma": "Watson"}
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description            | Type                                        | Required |
| ------------------- | ---------------------- | ------------------------------------------- | -------- |
| **obj**             | object to pick from    | `Record<string | number | symbol, any>`     | `yes`    |
| **keys**            | keys to pick           | `string[]`                                  | `yes`    |
| **omit_undefined**  | omit keys with undefined values | `boolean`                          | `no`     |

### ↩️ Returns

A new object with the specified keys.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    /**
     * Gets the new object with the specified keys from the original object.
     *
     * @param obj - The original object.
     *
     * @param keys - The keys to pick.
     *
     * @param omit_undefined - If true, the keys with undefined values will be omitted.
     *
     * @returns The new object with the specified keys from the original object
     */
    export function picker<
        O extends Record<string | number | symbol, any>,
        T extends keyof O
    >(obj: O, keys: T[], omit_undefined = false) {
        return keys.reduce((n, k) => {
            if (k in obj) {
                if (!omit_undefined || obj[k] !== undefined) n[k] = obj[k]
            }
            return n
        }, {} as Pick<O, T>)
    }
    ```
