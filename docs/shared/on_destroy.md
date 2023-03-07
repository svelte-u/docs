---
title: On Destroy
description: Safely call a function when the component is destroyed.
demo_link: https://svelte.dev/repl/584628abec794eff83b06416dffc4dab?version=3.55.1
---

# {{title}}

Is a function that safely calls a function when the component is destroyed, without throwing an error if it's inside a component lifecycle or not, in case if this function is called outside a component lifecycle it will do nothing.

## 🎬 Usage

```html
<script>
    import {on_destroy} from "@sveu/shared"

    on_destroy(() => {
        console.log("Component destroyed")
    })
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name    | Description                                           | Type              | Required |
| --------| ----------------------------------------------------- | ----------------- | -------- |
| **fn**  | The function to call when the component is destroyed. | `() => void`      | Yes      |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { onDestroy } from "svelte"

    import type { Fn } from "../utils"

    /**
     * Call onDestroy() if it's inside a component lifecycle, if not, do nothing.
     *
     * @param fn - the function to be called when the component is destroyed
     *
     * @returns true if onDestroy() is called, false if not
     */
    export function on_destroy(fn: Fn) {
        try {
            onDestroy(fn)

            return true
        } catch {
            return false
        }
    }
    ```
