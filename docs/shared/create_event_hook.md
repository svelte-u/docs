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

| Name                | Description                                          | Type                      |
| ------------------- | ---------------------------------------------------- | ------------------------- |
| **on**              | Function to execute when the event is triggered      | `(fn: Function) => void`  |
| **trigger**         | Function to trigger the event                        | `(args: any) => void`     |
| **off**             | Function to remove the event listener                | `(fn: Function) => void`  |


## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { EventHook } from "../utils"

    /**
     * Utility for creating event hooks
     *
     * @returns - Event hooks
     */
    export function create_event_hook<T = any>(): EventHook<T> {
        const fns: Array<(param: T) => void> = []

        const off = (fn: (param: T) => void) => {
            const index = fns.indexOf(fn)

            if (index !== -1) fns.splice(index, 1)
        }

        const on = (fn: (param: T) => void) => {
            fns.push(fn)

            return {
                off: () => off(fn),
            }
        }

        const trigger = (param: T) => {
            fns.forEach((fn) => fn(param))
        }

        return {
            on,
            off,
            trigger,
        }
    }
    ```
