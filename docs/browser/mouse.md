---
title: Mouse
description: Reactive mouse position.
demo_link: https://svelte.dev/repl/bbba7dca8b4b424db8510abcb3e55487?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { mouse } from "@sveu/browser"

    const { x, y, source_type } = mouse()
</script>
```

## 👩‍💻API

### 🙈 Options

| Name        | Description                          | Type                          | Default  |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **type**    | The type of the mouse position.      | `"page" | "client" | "movement"`| `"page"` |
| **touch**   | Whether to listen to `touchmove` events. | `boolean`                 | `true`   |
| **reset_on_touch_ends** | Whether to reset to the initial value when `touchend` event fired. | `boolean` | `false` |
| **initial_value** | The initial value. | `{ x: number, y: number }` | `{ x: 0, y: 0 }` |

### ↩️ Returns

| Name        | Description                          | Type                          |
| ----------- | ------------------------------------ | ----------------------------- |
| **x**       | The x position.                      | `Readable<number>`            |
| **y**       | The y position.                      | `Readable<number>`            |
| **source_type** | The source type of the mouse position. | `Readable<MouseSourceType>` |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { browser, to_readable, to_writable } from "@sveu/shared"

    import { on } from "../event_listener"
    import type { MouseOptions, MouseSourceType } from "../utils"

    /**
     * Reactive mouse position.
     *
     * @param options - The options for the mouse.
     * - `type` - The type of the mouse position. Either `page` or `client` or `movement`.
     * - `touch` - Whether to listen to `touchmove` events. Default is `true`.
     * - `reset_on_touch_ends` - Whether to reset to the initial value when `touchend` event fired. Default is `false`.
     * - `initial_value` - The initial value.
     * - `event_filter` - The event filter.
     *
     * @returns The mouse position.
     * - `x` - The x position.
     * - `y` - The y position.
     *
     */
    export function mouse(options: MouseOptions = {}) {
        const {
            type = "page",
            touch = true,
            reset_on_touch_ends = false,
            initial_value = { x: 0, y: 0 },
            event_filter,
        } = options

        const x = to_writable(initial_value.x)

        const y = to_writable(initial_value.y)

        const source_type = to_writable<MouseSourceType>(null)

        function mouse_handler(event: MouseEvent) {
            if (type === "page") {
                x.set(event.pageX)

                y.set(event.pageY)
            } else if (type === "client") {
                x.set(event.clientX)

                y.set(event.clientY)
            } else if (type === "movement") {
                x.set(event.movementX)

                y.set(event.movementY)
            }

            source_type.set("mouse")
        }

        function reset() {
            x.set(initial_value.x)
            y.set(initial_value.y)
        }

        function touch_handler(event: TouchEvent) {
            if (event.touches.length > 0) {
                const touch = event.touches[0]

                if (type === "page") {
                    x.set(touch.pageX)

                    y.set(touch.pageY)
                } else if (type === "client") {
                    x.set(touch.clientX)

                    y.set(touch.clientY)
                }

                source_type.set("touch")
            }
        }

        function mouse_handler_wrapper(event: MouseEvent) {
            return event_filter === undefined
                ? mouse_handler(event)
                : event_filter(() => mouse_handler(event), {} as any)
        }

        function touch_handler_wrapper(event: TouchEvent) {
            return event_filter === undefined
                ? touch_handler(event)
                : event_filter(() => touch_handler(event), {} as any)
        }

        if (browser) {
            on(window, "mousemove", mouse_handler_wrapper, {
                passive: true,
            })

            on(window, "dragover", mouse_handler_wrapper, {
                passive: true,
            })

            if (touch && type !== "movement") {
                on(window, "touchstart", touch_handler_wrapper, {
                    passive: true,
                })

                on(window, "touchmove", touch_handler_wrapper, {
                    passive: true,
                })

                if (reset_on_touch_ends)
                    on(window, "touchend", reset, { passive: true })
            }
        }

        return {
            x: to_readable(x),
            y: to_readable(y),
            source_type: to_readable(source_type),
        }
    }
    ```
