---
title: TimeoutFn
description: Wrapper for `setTimeout` with controls.
demo_link: https://svelte.dev/repl/8bcaec2e9a5842c88be680cdf0fb2dd9?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {timeoutfn} from "@sveu/shared"

    const { ready, start } = timeoutfn(1, { controls: true })

    const { pending, start, stop } = timeoutfn(() => {
      /* ... */
    }, 2)

</script>
```

## 👩‍💻API

### 👻 Arguments

| Name              | Description                                  | Type                  | Required |
| ----------------- | -------------------------------------------- | --------------------- | -------- |
| **fn**            | The function to invoke after the timeout.    | `Function`            | `Yes`    |
| **interval**      | The time to wait before invoking the function in second | `MaybeStore<number>`   | `no`     |

### 🙈 Options

| Name                | Description                                          | Type        | Default     |
| ------------------- | ---------------------------------------------------- | ----------- | ----------- |
| **immediate**       | Whether to invoke the function immediately.          | `boolean`   | `true`      |

### ↩️ Returns

| Name              | Description                                          | Type        |
| ----------------- | ---------------------------------------------------- | ----------- |
| **pending**       | A boolean value that indicates whether the timer is executing. | `Readable<boolean>`   |
| **start**         | A function to start the timer.                       | `Function`  |
| **stop**          | A function to stop the timer.                        | `Function`  |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { writable } from "svelte/store"

    import { on_destroy } from "../on_destroy"
    import { to_readable } from "../to_readable"
    import { unstore } from "../unstore"
    import type { AnyFn, MaybeStore, Stoppable, TimeoutFnOptions } from "../utils"

    /**
     * Wrapper for `setTimeout` with controls.
     *
     * @param fn - callback function

    * @param interval - interval in seconds
    * 
    * @returns Stoppable object
    */
    export function timeoutfn(
        fn: AnyFn,
        interval: MaybeStore<number> = 1,
        options: TimeoutFnOptions = {}
    ): Stoppable {
        const { immediate = true } = options

        const pending = writable(false)

        let timer: any = null

        function clear() {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
        }

        function stop() {
            pending.set(false)
            clear()
        }

        function start(...args: unknown[]) {
            clear()
            pending.set(true)
            timer = setTimeout(() => {
                pending.set(false)
                timer = null
                fn(...args)
            }, unstore(interval) * 1000)
        }

        if (immediate) start()

        on_destroy(stop)

        return {
            pending: to_readable(pending),
            start,
            stop,
        }
    }
    ```
