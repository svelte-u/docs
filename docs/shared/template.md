---
title: Template
description: Replace all the template expressions with the corresponding values from the data object.
demo_link: https://svelte.dev/repl/16ea9e413d4c47b8af143ed15c55fd7d?version=3.55.1
---

# {{title}}

Is a function that replace all the template expressions with the corresponding values from the data object.

## 🎬 Usage

```html
<script>
    import {template} from "@sveu/shared"

    const str = `Hi {{name}},

    Welcome to {{platform}}
`
    const result = template(str, {"name": "Beatrice", "platform": "svelte"})
</script>

<h1>{result}!</h1>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **str**             | The string to be searched            | `string`                      | Yes      |
| **data**            | The data object to be used to replace the search expression | `Record<string, any>` | Yes      |
| **regex**           | The search expression                | `RegExp`                      | No       |

### ↩️ Returns

A string with the template expressions replaced with the corresponding values from the data object.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## 👀 Source Code

??? tip "Source Code"

    ```ts
    /**
     * A string with values from data object using search expression
     *
     * @param str - The string to be searched
     *
     * @param data - The data object to be used to replace the search expression
     *
     * @param regex - The search expression
     *
     * @returns A string with values from data object using search expression
     */
    export function template(
        str: string,
        data: Record<string, any>,
        regex = /\{\{(.+?)\}\}/g
    ) {
        return Array.from(str.matchAll(regex)).reduce((acc, match) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [_, key] = match
            return acc.replace(match[0], data[key])
        }, str)
    }
    ```
