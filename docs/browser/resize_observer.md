---
title: Resize Observer
description: Wrapper around the ResizeObserver API.
demo_link: https://svelte.dev/repl/8f52e4c75cbe4b518661c3f7390331cb?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html hl_lines="2 8-11"
<script>
    import { resize_observer } from "@sveu/browser"

    let target = null

    let text = ""

    $: resize_observer(target, (entries) => {
        for (const entry of entries) {
            text = `width: ${entry.contentRect.width}, height: ${entry.contentRect.height}`
        }
    })
</script>

<textarea bind:this="{target}" disabled value="{text}"
></textarea>
```

## 👩‍💻API

### 👻 Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **target**      | The target element to observe. | `HTMLElement | SVGElement | undefined | null` | Yes |
| **callback**    | The callback function to invoke when the dimensions of the target element change. | `ResizeObserverCallback` | Yes |

### 🙈 Options

[ResizeObserverOptions](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe#parameters)

### ↩️ Returns

| Name            | Description              | Type                              |
| --------------- | -----------------------  | --------------------------------- |
| **supported**   | Whether the browser supports the ResizeObserver API. | `boolean` |
| **cleanup**     | A function to cleanup the observer. | `() => void` |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { on_destroy, unstore } from "@sveu/shared"

    import { support } from "../support"

    /**
     * Observes changes to the dimensions of an Element's content or the border-box
     *
     * @param target - The target element to observe.
     *
     * @param callback - The callback function to invoke when the dimensions of the target element change.
     *
     * @param options - The options object. See https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe#parameters
     *
     * @returns
     * - `supported` - Whether the browser supports the ResizeObserver API.
     * - `cleanup` - A function to cleanup the observer.
     *
     */
    export function resize_observer(
        target: HTMLElement | SVGElement | undefined | null,
        callback: ResizeObserverCallback,
        options: ResizeObserverOptions = {}
    ) {
        let observer: ResizeObserver | undefined

        const supported = support("ResizeObserver", "window")

        /** Cleanup the observer */
        function cleanup() {
            if (observer) {
                observer.disconnect()
                observer = undefined
            }
        }

        cleanup()

        if (unstore(supported) && target) {
            observer = new ResizeObserver(callback)

            observer?.observe(target, options)
        }

        on_destroy(cleanup)

        return {
            supported,
            cleanup,
        }
    }
    ```
