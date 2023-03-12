---
title: Vibrate
description: Vibrate the device with a given pattern and duration
demo_link: https://svelte.dev/repl/22d0b69c440145d3b20fdd028f6b00fb?version=3.56.0
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { vibrate } from "@sveu/browser"

    const { supported, start, stop } = vibrate()
</script>
```

## 👩‍💻API

### 🙈 Options

| Name         | Description                          | Type                          | Default  |
| -----------  | ------------------------------------ | ----------------------------- | -------- |
| **pattern**  | Vibration Pattern in seconds         | `number[]` or `number`        | `[]`     |
| **interval** | Interval to run a persistent vibration, in seconds | `number`        | `0`      |

### ↩️ Returns

| Name                 | Description                          | Type                          |
| -------------------- | ------------------------------------ | ----------------------------- |
| **supported**        | Whether the browser supports the Vibration API | `boolean`           |
| **interval_controls**| Controls for the persistent vibration | `Pauseable`                  |
| **start**            | Start the vibration                  | `() => void`                  |
| **stop**             | Stop the vibration                   | `() => void`                  |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { intervalfn, on_destroy } from "@sveu/shared"
    import type { Pauseable } from "@sveu/shared"

    import { support } from "../support"
    import type { VibrateOptions } from "../utils"

    /**
     * Vibrate the device with a given pattern and duration
     *
     * @param options
     * - `pattern` - Vibration Pattern
     * - `interval` - Interval to run a persistent vibration, in seconds
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
     *
     * @returns
     * - `supported` - Whether the browser supports the Vibration API
     * - `interval_controls` - Controls for the persistent vibration
     * - `start` - Start the vibration
     * - `stop` - Stop the vibration
     */
    export function vibrate(options: VibrateOptions = {}) {
        const { pattern = [], interval = 0 } = options

        const supported = support("vibrate")

        let interval_controls: Pauseable | undefined

        /** Start the vibration */
        function start() {
            if (supported) {
                if (Array.isArray(pattern)) {
                    const new_pattern = pattern.map((num) => num * 1000)
                    navigator.vibrate(new_pattern)
                } else {
                    navigator.vibrate(pattern * 1000)
                }
            }
        }

        /** Stop the vibration **/
        function stop() {
            if (supported) navigator.vibrate(0)
            interval_controls?.pause()
        }

        if (interval > 0) {
            interval_controls = intervalfn(start, interval, {
                immediate: false,
                immediate_callback: false,
            })
        }

        on_destroy(stop)

        return {
            supported,
            interval_controls,
            start,
            stop,
        }
    }
    ```
