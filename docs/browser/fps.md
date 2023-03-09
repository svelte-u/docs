---
title: FPS
description: Reactive FPS (frames per second).
demo_link: https://svelte.dev/repl/f8b7aafc166243318597ee6655159a10?version=3.53.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {fps} from "@sveu/browser"

    const _fps = fps()
</script>
```

## 👩‍💻API

### 🙈 Options

| Name        | Description                          | Type                          | Default  |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **every**   | Calculate the FPS on every x frames. | `number`                      | `10`     |

### ↩️ Returns

A subscribable store that updates with the current FPS.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { to_writable } from "@sveu/shared"

    import { raf_fn } from "../raf_fn"
    import type { FpsOptions } from "../utils"

    /**
     * Reactive FPS (frames per second)
     *
     * @param options - Options
     * - `every` - Calculate the FPS on every x frames. Default: `10`
     *
     * @returns Readable store
     */
    export function fps(options: FpsOptions = {}) {
        const { subscribe, set } = to_writable(0)

        if (typeof performance === "undefined") return { subscribe }

        const every = options?.every ?? 10

        let last = performance.now()

        let ticks = 0

        raf_fn(() => {
            ticks += 1

            if (ticks >= every) {
                const now = performance.now()

                const diff = now - last

                set(Math.round(1000 / (diff / ticks)))

                last = now

                ticks = 0
            }
        })

        return { subscribe }
    }
    ```
