---
title: Event Dispatcher
description: Dispatch custom events in the browser.
demo_link: https://svelte.dev/repl/2a0452cc86444429ab0d33957a4c07ac?version=3.56.0
---

# {{title}}

{{description}}

## ๐ฌ Usage

```html
<script>
    import { event_dispatcher } from "@sveu/browser"

    const dispatch = event_dispatcher(element)
</script>
```

## ๐ฉโ๐ปAPI

### ๐ป Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **target**      | The element to dispatch the event on | `HTMLElement | SVGElement | null | undefined` | Yes |

### โฉ๏ธ Returns

| Name            | Description                        | Type                               |
| --------------- | ---------------------------------  | ---------------------------------- |
| **dispatch**    | The function to dispatch the event | `(name: string, value: T) => void` |

## ๐งช Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code ๐

??? tip "Source Code"

    ```ts
    /**
     * Create a function that dispatches a custom event.
     *
     * @param target - The element to dispatch the event on.
     *
     * @returns The function to dispatch the event.
     */
    export function event_dispatcher(
        target: HTMLElement | SVGElement | null | undefined
    ) {
        /**
         * Dispatch a custom event.
         *
         * @param name - The name of the event.
         *
         * @param value - The value to pass to the event.
         *
         */
        function dispatch<T>(name: string, value: T) {
            target?.dispatchEvent(new CustomEvent(name, { detail: value }))
        }

        return dispatch
    }
    ```
