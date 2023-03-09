---
title: DOM Visible
description: Reactive document.visibilityState 
demo_link: https://svelte.dev/repl/fa0a2df545c0403db7361617bb2e4deb?version=3.53.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {dom_visible} from "@sveu/browser"

    const visible = dom_visible()
</script>
```

## 👩‍💻API

### ↩️ Returns

A subscribable store that contains the current visibility state.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import type { Readable } from "svelte/store"

    import { browser, to_writable } from "@sveu/shared"

    import { on } from "../event_listener"

    /**
     * Reactive `document.visibilityState`
     *
     * @returns A readable store with the current visibility state.
     */
    export function dom_visible(): Readable<DocumentVisibilityState> {
        if (!browser) return to_writable("hidden")

        const { subscribe, set } = to_writable<DocumentVisibilityState>(
            document.visibilityState
        )

        function handler() {
            if (document) set(document.visibilityState)
        }

        on(document, "visibilitychange", handler, true)

        return { subscribe }
    }
    ```
