---
title: IntervalFn
description: Wrapper for `setInterval` with controls.
demo_link: https://svelte.dev/repl/e7c0f189e2254e2a9ae85055b454014d?version=3.55.1
---

# {{title}}

Wrapper for `setInterval` with controls.

## 🎬 Usage

```html
<script>
    import {intervalfn} from "@sveu/shared"

    let count = 0

    const {active, resume, pause} = intervalfn(() => {
        count++
    }, 1)

</script>
<h1>Counter: {count}</h1>

<h3>IS ACTIVE: {$active ? "YES" : "NO"}</h3>
<button on:click={resume}>Resume</button>

<button on:click={pause}>Pause</button>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **fn**              | Function to execute                          | `Function`            | Yes      |
| **interval**        | Time to wait before executing `fn` in second | `number`              | No       |

### 🙈 Options

| Name                | Description                                          | Type        | Default     |
| ------------------- | ---------------------------------------------------- | ----------- | ----------- |
| **immediate**       | Whether to execute `fn` immediately or not           | `boolean`   | `true`      |
| **immediate_callback** | Whether to execute `fn` onces this function is called | `boolean` | `false`     |

### ↩️ Returns

| Name                | Description                                          | Type                      |
| ------------------- | ---------------------------------------------------- | ------------------------- |
| **active**          | Whether the interval is active or not                | `Readable<boolean>`       |
| **resume**          | Resume the interval                                  | `Function`                |
| **pause**           | Pause the interval                                   | `Function`                |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { writable } from "svelte/store"

    import { on_destroy } from "../on_destroy"
    import { to_readable } from "../to_readable"
    import { unstore } from "../unstore"
    import type { Fn, IntervalFnOptions, MaybeStore, Pauseable } from "../utils"

    /**
     * Wrapper for `setInterval` with controls
     *
     * @param fn - callback function
     *
     * @param interval - interval in seconds
     *
     * @returns Pauseable object
     */
    export function intervalfn(
        fn: Fn,
        interval: MaybeStore<number> = 1,
        options: IntervalFnOptions = {}
    ): Pauseable {
        const { immediate = true, immediate_callback = false } = options

        const active = writable(false)

        let timer: any = null

        function clean() {
            if (timer) {
                clearInterval(timer)
                timer = null
            }
        }

        function pause() {
            active.set(false)
            clean()
        }

        function resume() {
            if (interval <= 0) return

            active.set(true)

            if (immediate_callback) fn()

            clean()

            timer = setInterval(fn, unstore(interval) * 1000)
        }

        if (immediate) resume()

        on_destroy(pause)

        return {
            active: to_readable(active),
            pause,
            resume,
        }
    }
    ```
