---
title: Invert (Dicts)
description: Swap the key-value pairs of an object.
demo_link: https://svelte.dev/repl/e7a7acddee9d4a358797934e30b4fe12?version=3.55.1
---

# Invert

{{description}}

## 🎬 Usage

```html
<script>
    import {invert} from "@sveu/shared/dicts"

    const obj = {"Mila": "Kunis", "Emma": "Watson", "Scarlett": "Johansson"}

    invert(obj) // { Kunis: 'Mila', Watson: 'Emma', Johansson: 'Scarlett' }
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description            | Type                                        | Required |
| ------------------- | ---------------------- | ------------------------------------------- | -------- |
| **obj**             | object to invert       | `Record<string | number | symbol, any>`     | `yes`    |

### ↩️ Returns

A new object with inverted key-value pairs.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    export function invert<
        Key extends string | number | symbol,
        Value extends string | number | symbol
    >(obj: Record<string, Value>): Record<Value, Key> {
        if (!obj) return {} as Record<Value, Key>
        return Object.keys(obj).reduce(
            (acc, key) => ({
                ...acc,
                [obj[key]]: key,
            }),
            {} as Record<Value, Key>
        )
    }
    ```
