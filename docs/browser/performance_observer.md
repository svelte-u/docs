---
title: Performance Observer
description: Reactive load an image in the browser
demo_link: https://svelte.dev/repl/dfa7caeac6ff441990fd2b1354ff82f1?version=3
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { performance_observer } from "@sveu/browser"

    performance_observer(
        (list) => {
            console.log(list.getEntries())
        },
        {
            entryTypes: ["measure", "mark", "resource", "navigation"],
        },
    )
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **fn**          | Callback function        | `PerformanceObserverCallback`     | Yes      |

### 🙈 Options

| Name                    | Description                          | Type                         | Default|
| ----------------------- | ------------------------------------ | ---------------------------- | ------ |
| **immediate**           | Start the observer immediate         | `boolean`                    | `true` |
| **performance_options** | Options for the observer.            | `PerformanceObserverOptions` | `{}`   |

### ↩️ Returns

| Name            | Description              | Type                              |
| --------------- | -----------------------  | --------------------------------- |
| **supported**   | Whether the browser supports the PerformanceObserver API. | `boolean` |
| **start**       | Start the observer.      | `() => void`                      |
| **stop**        | Stop the observer.       | `() => void`                      |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { on_destroy, unstore } from "@sveu/shared"

    import { support } from "../support"
    import type { PerformanceObserverOptions } from "../utils"

    /**
     * Observe performance metrics.
     *
     * @param fn - Callback function to be invoked when a performance entry is added to the performance entry buffer.

    * @see https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
    * @param options - Options for the observer.
    * - `immediate` - Start the observer immediate.
    *
    * @returns
    * - `supported` - Whether the browser supports the PerformanceObserver API.
    * - `start` - Start the observer.
    * - `stop` - Stop the observer.
    */
    export function performance_observer(
        fn: PerformanceObserverCallback,
        options: PerformanceObserverOptions = {}
    ) {
        const { immediate = true, ...performance_options } = options

        const supported = support("PerformanceObserver", "window")

        let observer: PerformanceObserver | undefined

        function stop() {
            observer?.disconnect()
        }

        function start() {
            if (unstore(supported)) {
                stop()

                observer = new PerformanceObserver(fn)

                observer.observe(performance_options)
            }
        }

        on_destroy(stop)

        if (immediate) start()

        return {
            supported,
            start,
            stop,
        }
    }
    ```
