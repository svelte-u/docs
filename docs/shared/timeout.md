---
title: Timeout
description: Update value after a given time with controls.
demo_link: https://svelte.dev/repl/bf49025d268243a198520d9c0851b186?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {timeout} from "@sveu/shared"

    const { ready, start } = timeout(1, { controls: true })
</script>

<p>Ready: { $ready }</p>

<button disabled="{!$ready}" on:click="{() => start()}">Start Again</button>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **interval**        | The time to wait before invoking the function in second | `number`   | `no`     |

### 🙈 Options

| Name                | Description                                          | Type        | Default     |
| ------------------- | ---------------------------------------------------- | ----------- | ----------- |
| **controls**        | Whether to return controls to start the timer again. | `boolean`   | `false`     |
| **callback**        | A function to be executed after the timer is done.    | `Function`  | `undefined` |

### ↩️ Returns


| Name              | Description                                          | Type        |
| ----------------- | ---------------------------------------------------- | ----------- |
| **ready**         | A boolean value that indicates whether the timer is done. | `Readable<boolean>`   |
| **timeoutfn returns** | see [timeoutfn returns](http://127.0.0.1:8000/shared/timeoutfn/#returns)      | `Stoppable` |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { readable } from "svelte/store"
    import type { Readable } from "svelte/store"

    import { on_destroy } from "../on_destroy"
    import { timeoutfn } from "../timeoutfn"
    import { noop } from "../utils"
    import type { Fn, Stoppable, TimeoutOptions } from "../utils"

    /**
     * Update value after a given time with controls.
     *
     * @param interval - Time in seconds to update the value.
     *
     * @param options - Options to control the behavior of the timeout.
     * - `controls` - Expose more controls. (default: false)
     * - `callback` - a function to call when the timeout is reached.
     *
     * @returns
     * - `ready` - a readable store with the current state.
     * - `stop` - a function to stop the timeout. (only if `controls` option is true)
     * - `start` - a function to start the timeout. (only if `controls` option is true)
     *
     */
    export function timeout(
        interval?: number,
        options?: TimeoutOptions<false>
    ): Readable<boolean>
    export function timeout(
        interval: number,
        options: TimeoutOptions<true>
    ): {
        ready: Readable<boolean>
    } & Stoppable
    export function timeout(interval = 1, options: TimeoutOptions<boolean> = {}) {
        const { controls: expose_controls = false, callback } = options

        let unsubscribe: Fn = noop

        const controls = timeoutfn(callback ?? noop, interval, options)

        const ready = readable(true, (set) => {
            unsubscribe = controls.pending.subscribe((value) => set(!value))
        })

        on_destroy(unsubscribe)

        if (expose_controls) {
            return {
                ready,
                ...controls,
            }
        } else {
            return ready
        }
    }
    ```
