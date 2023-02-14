---
title: Contains (Dicts)
description: Checks if an object contains all the given keys
demo_link: https://svelte.dev/repl/9f299c842f714983a9fc50ddd59bc294?version=3.55.1
---

# Contains

{{description}}

## 🎬 Usage

```html
<script>
    import {contains} from "@sveu/shared/dicts"

    const obj = {a: 1, b: 2, c: 3}

    contains(obj, "a", "b") // true
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **obj**             | The object to check                          | `Record<string, any>` | `yes`    |
| **...keys**         | The keys to check                            | `string[]`            | `yes`    |

### ↩️ Returns

Boolean

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    /**
     * Checks if an object contains all the given keys
     *
     * @param obj - object to check
     *
     * @param keys - keys to check
     *
     * @returns boolean
     */
    export function contains(obj: object, ...keys: string[]) {
        return keys.some((key) => key in obj)
    }
    ```
