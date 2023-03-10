---
title: Create Event Hook
description: Creates a hook that can be used to create event listeners.
demo_link: https://svelte.dev/repl/cdddacbd92244d019fe971fb3b82cace?version=3.55.1
---

# {{title}}

Creates a hook that can be used to create event listeners. Useful for creating functions that need to be called on a specific event. With that you can build reusable functions.

## 🎬 Usage

```html
<script>
    import { create_event_hook } from '@sveu/shared'

    function request(url) {
        const fetch_result = create_event_hook()

        const fetch_error = create_event_hook()

        fetch(url)
            .then(result => fetch_result.trigger(result))
            .catch(error => fetch_error.trigger(error?.message))

        return {
            on_result: fetch_result.on,
            on_error: fetch_error.on,
        }
    }
</script>
```

## 👩‍💻API

### ↩️ Returns

| Name        | Description                           | Type                                            |
| ----------- | ------------------------------------- | ----------------------------------------------- |
| **on**      | Add a function to the event hook      | `(fn: (param: T) => void): {off: () => void;}`  |
| **off**     | Remove a function from the event hook | `(fn: (param: T) => void): void`                |
| **trigger** | Trigger the event hook                | `(param: T): Promise<void[]>`                   |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { on_destroy } from "../on_destroy"
    import type { EventHook } from "../utils"

    /**
     * Utility for creating event hooks
     *
     * @returns - Event hooks
     * - `on` - Add a function to the event hook
     * - `off` - Remove a function from the event hook
     * - `trigger` - Trigger the event hook
     */
    export function create_event_hook<T = any>(): EventHook<T> {
        const fns: Set<(param: T) => void> = new Set()

        /**
         * Remove a function from the event hook
         *
         * @param fn - Function to remove
         */
        function off(fn: (param: T) => void) {
            fns.delete(fn)
        }

        /**
         * Add a function to the event hook
         *
         * @param fn - Function to add
         *
         * @returns - Function to remove the function
         */
        function on(fn: (param: T) => void) {
            fns.add(fn)

            const off_fn = () => off(fn)

            on_destroy(off_fn)

            return {
                off: off_fn,
            }
        }

        /**
         * Trigger the event hook
         *
         * @param param - Parameter to pass to the functions
         *
         * @returns - Promise that resolves when all functions have resolved
         */
        function trigger(param: T) {
            return Promise.all(Array.from(fns).map((fn) => fn(param)))
        }

        return {
            on,
            off,
            trigger,
        }
    }
    ```
