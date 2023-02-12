---
title: Pops
description: Remove the given keys from the given object.
demo_link: https://svelte.dev/repl/9cfc55be45bf4ec993aa24a705ee23b7?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {pops} from "@sveu/shared/dicts"

    const obj = {"Mila": "Kunis", "Emma": "Watson", "Scarlett": "Johansson"}

    pops(obj, ["Mila", "Emma"])

    obj // {"Scarlett": "Johansson"}
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description            | Type                                        | Required |
| ------------------- | ---------------------- | ------------------------------------------- | -------- |
| **obj**             | object to pop from     | `Record<string | number | symbol, any>`     | `yes`    |
| **keys**            | keys to pop            | `string[]`                                  | `yes`    |


## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    /**
     * Remove the given keys from the given object.
     *
     * @param obj - The object to remove keys from.
     *
     * @param keys - The keys to remove.
     *
     */
    export function pops<T, K extends keyof T>(obj: T, keys: K[]) {
        for (const key of keys) {
            delete obj[key]
        }
    }
    ```
