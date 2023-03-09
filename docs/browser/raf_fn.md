---
title: Raf Fn
description: Call function on every `requestAnimationFrame` with controls.
demo_link: https://svelte.dev/repl/b1de64c37f6449d5b34525f867f0ef9c?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { raf_fn } from "@sveu/browser"

    let count = 0

    const { pause, resume } = raf_fn(() => {
        count++
        console.log(count)
    })
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **fn**          | Function to call on every `requestAnimationFrame` | `Fn`     | Yes      |

### 🙈 Options

| Name          | Description                          | Type                          | Default  |
| ------------- | ------------------------------------ | ----------------------------- | -------- |
| **immediate** | Start the requestAnimationFrame loop immediately on creation | `boolean` | `true` | 

### ↩️ Returns

| Name          | Description                          | Type                                  |
| ------------- | ------------------------------------ | ------------------------------------- |
| **pause**     | Pause the requestAnimationFrame loop | `Fn`                                  |
| **resume**    | Resume the requestAnimationFrame loop| `Fn`                                  |
| **active**    | Readable store of the active state   | `Readable<boolean>`                   |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { on_destroy, to_readable, to_writable, unstore } from "@sveu/shared"
    import type { Fn, Pauseable } from "@sveu/shared"

    import type { RafFnOptions } from "../utils"

    /**
     * Call function on every `requestAnimationFrame` with controls.
     *
     * @param fn - Function to call on every `requestAnimationFrame`
     *
     * @param options - Options
     * - `immediate` - Start the requestAnimationFrame loop immediately on creation
     *
     * @returns Pauseable object.
     * - `pause` - Pause the requestAnimationFrame loop
     * - `resume` - Resume the requestAnimationFrame loop
     * - `active` - Readable store of the active state
     */
    export function raf_fn(fn: Fn, options: RafFnOptions = {}): Pauseable {
        const { immediate = true } = options

        const active = to_writable(false)

        let raf_id: null | number = null

        function loop() {
            if (!unstore(active) || !window) return

            fn()
            raf_id = window.requestAnimationFrame(loop)
        }

        function resume() {
            if (!unstore(active) && window) {
                active.set(true)
                loop()
            }
        }

        function pause() {
            active.set(false)
            if (raf_id != null && window) {
                window.cancelAnimationFrame(raf_id)
                raf_id = null
            }
        }

        if (immediate) resume()

        on_destroy(pause)

        return {
            pause,
            resume,
            active: to_readable(active),
        }
    }
    ```
