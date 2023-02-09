---
title: on_mount
description: Safely call a function when the component is mounted.
demo_link: https://svelte.dev/repl/f6a572743c0f4c9da22ac9564164d0b9?version=3.55.1
---

# {{title}}

Is a function that safely calls a function when the component is mounted, without throwing an error if it's inside a component lifecycle or not, in case if this function is called outside a component lifecycle it will do nothing.

## 🎬 Usage

```html
<script>
    import {on_mount} from "@sveu/shared"

    on_mount(() => {
        console.log("Component mounted")
    })
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name    | Description                                           | Type              | Required |
| --------| ----------------------------------------------------- | ----------------- | -------- |
| **fn**  | The function to call when the component is mounted.   | `() => void`      | Yes      |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { onMount } from "svelte"

    import type { Fn } from "../utils"

    /**
     * Call onMount() if it's inside a component lifecycle, if not, do nothing.
     *
     * @param fn - the function to be called when the component is mounted
     *
     */
    export function on_mount(fn: Fn) {
        try {
            onMount(fn)
        } catch {
            // do nothing
        }
    }
    ```
