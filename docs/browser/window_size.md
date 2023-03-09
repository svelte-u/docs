---
title: Window Size
description: Reactive window size.
demo_link: https://svelte.dev/repl/e55a5f303ef0446b8e79b7c87e3e8be1?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { window_size } from "@sveu/browser"

    const { width, height } = window_size()
</script>
```

## 👩‍💻API

### ↩️ Returns

| Name        | Description                          | Type                          |
| ----------- | ------------------------------------ | ----------------------------- |
| **width** | A readable store with the window width. | `Readable<number>`           |
| **height** | A readable store with the window height. | `Readable<number>`         |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { browser, to_readable, to_writable } from "@sveu/shared"

    import { on } from "../event_listener"
    import type { WindowSizeOptions } from "../utils"

    /**
     * Reactive window size.
     *
     * @param options - Options
     * - `initial_width` - The initial width of the window.
     * - `initial_height` - The initial height of the window.
     * - `orientation` - Whether to use the `orientationchange`.
     * - `scrollbar` - Whether the scrollbar should be included in the width and height.
     *
     * @returns
     * - `width`: A readable store with the current window width.
     * - `height`: A readable store with the current window height.
     */
    export function window_size(options: WindowSizeOptions = {}) {
        const {
            initial_width = Infinity,
            initial_height = Infinity,
            orientation = true,
            scrollbar = true,
        } = options
        if (!browser) return { width: to_readable(0), height: to_readable(0) }

        const width = to_writable(initial_width)

        const height = to_writable(initial_height)

        const update = () => {
            if (scrollbar) {
                width.set(window.innerWidth)

                height.set(window.innerHeight)
            } else {
                width.set(window.document.documentElement.clientWidth)

                height.set(window.document.documentElement.clientHeight)
            }
        }

        update()

        on("resize", update, { passive: true })

        if (orientation) on("orientationchange", update, { passive: true })

        return { width, height }
    }
    ```
