---
title: On Key Stroke
description: Listens for a keyboard key being stroked.
demo_link: https://svelte.dev/repl/2e5eee00e1284d54b5e73d551f2fa63b?version=3.57.0
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { on_key_stroke } from "@sveu/browser"

    on_key_stroke(["w", "W", "ArrowUp"], (e) => {
        // Do something
    })
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **key**         | The key to listen for.   | `string`, `string[]`, `function`, `true` | Yes      |
| **handler**     | The handler to call when the key is stroked. | `(event: KeyboardEvent) => void` | Yes      |

??? note

    - `string` - The key to listen for. E.g. `"Shift"`.
    - `string[]` - The keys to listen for. E.g. `["Shift", "Control"]`.
    - `function` - A function that returns `true` if the key should be listened for.
    - `true` - Listen for any key.

### 🙈 Options

| Name        | Description                            | Type                          | Default   |
| ----------- | -------------------------------------- | ----------------------------- | --------- |
| **target**  | The target to listen on.               | `EventTarget`                 | `window`  |
| **event**   | The event to listen for.               | `string`                      | `keydown` |
| **passive** | Whether the event listener is passive. | `boolean`                     | `false`   |

### ↩️ Returns

A function to remove the event listener.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { browser } from "@sveu/shared"

    import { on } from "../event_listener"
    import type { KeyFilter, KeyPredicate, OnKeyStrokeOptions } from "../utils"

    /**
     * Creates a key predicate from a key filter.
     *
     * @param key_filter - The key filter to create a predicate from.
     *
     * @returns The key predicate.
     */
    function create_key_predicate(key_filter: KeyFilter): KeyPredicate {
        if (typeof key_filter === "function") return key_filter

        if (typeof key_filter === "string")
            return (event: KeyboardEvent) => event.key === key_filter

        if (Array.isArray(key_filter))
            return (event: KeyboardEvent) => key_filter.includes(event.key)

        return () => true
    }

    /**
     * Listens for a keyboard key being stroked.
     *
     * @param key - The key to listen for.
     * - `string` - The key to listen for. E.g. `"Shift"`.
     * - `string[]` - The keys to listen for. E.g. `["Shift", "Control"]`.
     * - `function` - A function that returns `true` if the key should be listened for.
     * - `true` - Listen for any key.
     *
     * @param handler - The handler to call when the key is stroked.
     *
     * @param options - The options.
     * - `target` - The target to listen on. Defaults to `window` in the browser and `undefined` in Node.js.
     * - `event` - The event to listen for. Defaults to `"keydown"`.
     * - `passive` - Whether the event listener is passive. Defaults to `false`.
     *
     * @returns A function to remove the event listener.
     */
    export function on_key_stroke(
        key: KeyFilter,
        handler: (event: KeyboardEvent) => void,
        options?: OnKeyStrokeOptions
    ): () => void
    export function on_key_stroke(
        handler: (event: KeyboardEvent) => void,
        options?: OnKeyStrokeOptions
    ): () => void
    export function on_key_stroke(...args: any[]) {
        let key: KeyFilter

        let handler: (event: KeyboardEvent) => void

        let options: OnKeyStrokeOptions = {}

        if (args.length === 3) {
            key = args[0]
            handler = args[1]
            options = args[2]
        } else if (args.length === 2) {
            if (typeof args[1] === "object") {
                key = true
                handler = args[0]
                options = args[1]
            } else {
                key = args[0]
                handler = args[1]
            }
        } else {
            key = true
            handler = args[0]
        }

        const {
            target = browser ? window : undefined,
            event = "keydown",
            passive = false,
        } = options

        const predicate = create_key_predicate(key)

        const listener = (e: KeyboardEvent) => {
            if (predicate(e)) handler(e)
        }

        return on(target, event, listener, passive)
    }
    ```
