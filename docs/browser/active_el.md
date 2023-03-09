---
title: Active Element
description: Reactive document.activeElement 
demo_link: https://svelte.dev/repl/de9bcd881c164044a026c84d66c1a71f?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { active_el } from '@sveu/browser'

    const el = active_el()
</script>
```

## 👩‍💻API

### ↩️ Returns

A subscribable store that contains the current active element.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { browser, to_writable } from "@sveu/shared"

    import { on } from "../event_listener"

    /**
     * Reactive `document.activeElement`
     *
     * @returns A readable store with the current active element.
     */
    export function active_el<T extends HTMLElement>() {
        const { set, subscribe } = to_writable<T | null>(
            browser ? (document?.activeElement as T) : null
        )

        function handler() {
            set((document?.activeElement as T) || null)
        }

        if (browser) {
            on(
                window,
                "blur",
                (event) => {
                    if (event.relatedTarget !== null) return

                    handler()
                },
                true
            )

            on(window, "focus", handler, true)
        }

        return { subscribe }
    }
    ```
