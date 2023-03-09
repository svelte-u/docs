---
title: Intersection Observer
description: Wrapper for the IntersectionObserver API.
demo_link: https://svelte.dev/repl/f18b340607ef4b3697c5e0ee313fd3ec?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { intersection_observer } from "@sveu/browser"

    let target = null

    let visible = false

    $: intersection_observer(
        target,
        ([{ isIntersecting }]) => {
            visible = isIntersecting
        }
    )
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **target**      | The target element to observe | `HTMLElement | SVGElement | null | undefined` | Yes |
| **fn**          | The function to call when the target element is intersecting | `IntersectionObserverCallback` | Yes |

### 🙈 Options

| Name        | Description                          | Type                          | Default  |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **root**    | The Element or Document whose bounds are used as the bounding box when testing for intersection. | `HTMLElement | SVGElement | null` | `null` |
| **margin**  | A string which specifies a set of offsets to add to the root's bounding_box when calculating intersections. | `string` | `"0px"` |
| **threshold** | Either a single number or an array of numbers between 0.0 and 1. | `number | number[]` | `0.1` |

### ↩️ Returns

| Name        | Description                          | Type                          |
| ----------- | ------------------------------------ | ----------------------------- |
| **supported** | Whether the IntersectionObserver API is supported. | `Readable<boolean>` |
| **stop** | Stop the IntersectionObserver. | `() => void` |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { noop, on_destroy, unstore } from "@sveu/shared"

    import { support } from "../support"
    import type { IntersectionObserverOptions } from "../utils"

    /**
     * Wrapper for the IntersectionObserver API.
     *
     * @param target - The target element to observe.
     *
     * @param fn - The function to call when the target element is intersecting.
     *
     * @param options - The options to pass to the IntersectionObserver.
     * - `root` - The Element or Document whose bounds are used as the bounding box when testing for intersection.
     * - `margin` - A string which specifies a set of offsets to add to the root's bounding_box when calculating intersections. Defaults to `"0px"`.
     * - `threshold` - Either a single number or an array of numbers between 0.0 and 1. Defaults to `0.1`.
     *
     * @returns
     * - `supported` - Whether the IntersectionObserver API is supported.
     * - `stop` - Stop the IntersectionObserver.
     *
     */
    export function intersection_observer(
        target: HTMLElement | SVGElement | null | undefined,
        fn: IntersectionObserverCallback,
        options: IntersectionObserverOptions = {}
    ) {
        const { root, margin = "0px", threshold = 0.1 } = options

        const supported = support("IntersectionObserver", "window")

        let stop = noop

        if (unstore(supported)) {
            if (!target) return

            stop()

            const observer = new IntersectionObserver(fn, {
                root,
                rootMargin: margin,
                threshold,
            })

            observer.observe(target)

            stop = () => {
                observer?.unobserve(target)
                observer?.disconnect()
            }
        }

        on_destroy(stop)

        return {
            supported,
            stop,
        }
    }
    ```
