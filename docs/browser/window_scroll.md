---
title: Window Scroll
description: Reactive window scroll.
demo_link: https://svelte.dev/repl/7304bf53b6de4b1ebd19d05d169d8b63?version=3.55.1
---

# {{title}}

{{description}}

## ๐ฌ Usage

```html
<script>
    import { window_scroll } from "@sveu/browser"

    const { x, y } = window_scroll()
</script>
```

## ๐ฉโ๐ปAPI

### โฉ๏ธ Returns

| Name        | Description                          | Type                          |
| ----------- | ------------------------------------ | ----------------------------- |
| `x`         | A readable store with the x position | `Readable<number>`            |
| `y`         | A readable store with the y position | `Readable<number>`            |

## ๐งช Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code ๐

??? tip "Source Code"

    ```ts
    import { to_readable, to_writable } from "@sveu/shared"

    import { on } from "../event_listener"

    /**
     * Reactive window scroll.
     *
     * @returns
     * - `x`: A readable store with the current window scroll x position.
     * - `y`: A readable store with the current window scroll y position.
     */
    export function window_scroll() {
        if (!window) return { x: to_readable(0), y: to_readable(0) }

        const x = to_writable(window.scrollX)

        const y = to_writable(window.scrollY)

        on(
            window,
            "scroll",
            () => {
                x.set(window.scrollX)
                y.set(window.scrollY)
            },
            {
                capture: false,
                passive: true,
            }
        )

        return { x: to_readable(x), y: to_readable(y) }
    }
    ```
