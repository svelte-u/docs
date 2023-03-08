---
title: Element Bounding
description: Get the bounding rect of an element.
demo_link: https://svelte.dev/repl/2af58ec8adc841a6aba00a5ae99c7785?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {el_bound} from "@sveu/actions"

    function fn(data){
        ...
    }
</script>

<textarea use:el_bound="{fn}" />

```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **fn**              | A function that receive the bounding rect of the element. | `(data: ElementBoundData) => void` | Yes |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { on, resize_observer } from "@sveu/browser"

    import type { ElementBoundData } from "../utils"

    /**
     * Reactive bounding box of an HTML element.
     *
     * @param element - HTML element
     *
     * @param fn - Callback function
     */
    export function el_bound(
        element: HTMLElement | SVGElement,
        fn: (data: ElementBoundData) => void
    ) {
        const data: ElementBoundData = {
            height: 0,
            width: 0,
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            x: 0,
            y: 0,
        }

        function update() {
            const rect = element.getBoundingClientRect()

            data.height = rect.height

            data.width = rect.width

            data.bottom = rect.bottom

            data.left = rect.left

            data.right = rect.right

            data.top = rect.top

            data.x = rect.x

            data.y = rect.y

            fn(data)
        }

        update()

        const resize_cleanup = on(window, "resize", update)

        const scroll_cleanup = on(window, "scroll", update)

        const { cleanup: observer_cleanup } = resize_observer(element, update)

        return {
            destroy() {
                resize_cleanup()
                scroll_cleanup()
                observer_cleanup()
            },
        }
    }
    ```
