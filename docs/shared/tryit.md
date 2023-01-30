---
title: Try it
description: Convert a function to an error-first async function.
demo_link: https://svelte.dev/repl/9e2539aeee514c0e81bfdbcc9c80d777?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {tryit} from "@sveu/shared"

    function add(a, b) {
        return a + b
    }

    const add_async = tryit(add)
    
    const {result, error} = await add_async(1, 2)

</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **fn**              | Function to convert                  | `(...args: any[]) => any`     | Yes      |


### ↩️ Returns

| Name                | Description                          | Type                          |
| ------------------- | ------------------------------------ | ----------------------------- |
| **result**          | Result of the function               | `any`                         |
| **error**           | Error thrown by the function         | `Error`                       |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## 👀 Source Code

??? tip "Source Code"

    ```ts
    import type { FunctionArgs } from "../utils"

    /**
     * Convert a function to an error-first async function.
     *
     * @param fn - A function to be converted to an error-first async function.
     *
     * @see https://radash-docs.vercel.app/docs/async/tryit
     *
     * @returns An error-first async function.
     *
     */
    export function tryit(fn: FunctionArgs) {
        return async (...args: any) => {
            try {
                return { result: await fn(...args), error: null }
            } catch (err) {
                return { result: null, error: err }
            }
        }
    }
    ```
