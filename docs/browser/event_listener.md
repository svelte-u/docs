---
title: Event Listener
description: Safely listen for events.
demo_link: https://svelte.dev/repl/004319267b7d49268cf468ec6c18c93a?version=3.55.1
---

# {{title}}

{{description}} Register using addEventListener on mounted, and removeEventListener automatically on unmounted.

## 🎬 Usage

```html
<script>
    import { event_listener } from '@sveu/browser'

    event_listener(window, "keydown", (event) => console.log(event.key))
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **target**      | The target to listen to. | `EventTarget | undefined`         | No       |
| **event**       | The event to listen to.  | `ListAble<string>`                | Yes      |
| **listeners**   | The event handler.       | `ListAble<AnyFn>`                 | Yes      |
| **options**     | The event options.       | `boolean | AddEventListenerOptions` | No       |

### ↩️ Returns

A function to remove the event listener for manual control.

### Alias

`event_listener` is also aliased as `on` for convenience.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { AnyFn, browser, is_string, noop, on_destroy } from "@sveu/shared"
    import type { Fn } from "@sveu/shared"

    import { GeneralEventListener, InferEventTarget, ListAble } from "../utils"

    /**
     * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
     *
     * Overload 1: Omitted Window target.
     *
     * @param event - The event name.
     *
     * @param listener - The event listener.
     *
     * @param options - The event listener options.
     *
     * @returns The cleanup function.
     */
    export function event_listener<E extends keyof WindowEventMap>(
        event: ListAble<E>,
        listener: (this: Window, ev: WindowEventMap[E]) => any,
        options?: boolean | AddEventListenerOptions
    ): Fn

    /**
     * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
     *
     * Overload 2: Explicitly Window target
     *
     * @param target - The window target.
     *
     * @param event - The event name.
     *
     * @param listener - The event listener.
     *
     * @param options - The event listener options.
     *
     * @returns The cleanup function.
     */
    export function event_listener<E extends keyof WindowEventMap>(
        target: Window,
        event: ListAble<E>,
        listener: (this: Window, ev: WindowEventMap[E]) => any,
        options?: boolean | AddEventListenerOptions
    ): Fn

    /**
     * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
     *
     * Overload 3: Explicitly Document target
     *
     * @param target - The document target.
     *
     * @param event - The event name.
     *
     * @param listener - The event listener.
     *
     * @param options - The event listener options.
     *
     * @returns The cleanup function.
     */
    export function event_listener<E extends keyof DocumentEventMap>(
        target: Document,
        event: ListAble<E>,
        listener: (this: Document, ev: DocumentEventMap[E]) => any,
        options?: boolean | AddEventListenerOptions
    ): Fn

    /**
     * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
     *
     * Overload 4: Custom event target with event type infer
     *
     * @param target - The event target.
     *
     * @param event - The event name.
     *
     * @param listener - The event listener.
     *
     * @param options - The event listener options.
     *
     * @returns The cleanup function.
     */
    export function event_listener<Names extends string, EventType = Event>(
        target: InferEventTarget<Names>,
        event: ListAble<Names>,
        listener: ListAble<GeneralEventListener<EventType>>,
        options?: boolean | AddEventListenerOptions
    ): Fn

    /**
     * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
     *
     * Overload 5: Custom event target fallback
     *
     * @param target - The event target.
     *
     * @param event - The event name.
     *
     * @param listener - The event listener.
     *
     * @param options - The event listener options.
     *
     * @returns The cleanup function.
     */
    export function event_listener<EventType = Event>(
        target: EventTarget | null | undefined,
        event: ListAble<string>,
        listener: ListAble<GeneralEventListener<EventType>>,
        options?: boolean | AddEventListenerOptions
    ): Fn
    export function event_listener(...args: any[]) {
        let target: EventTarget | undefined

        let events: ListAble<string>

        let listeners: ListAble<AnyFn>

        let options: boolean | AddEventListenerOptions | undefined

        if (is_string(args[0]) || Array.isArray(args[0])) {
            ;[events, listeners, options] = args
            target = browser ? window : undefined
        } else {
            ;[target, events, listeners, options] = args
        }

        if (!target) return noop

        if (!Array.isArray(events)) events = [events]

        if (!Array.isArray(listeners)) listeners = [listeners]

        const cleanups: AnyFn[] = []

        function cleanup() {
            cleanups.forEach((fn) => fn())
            cleanups.length = 0
        }

        function register(
            _target: any,
            event: string,
            listener: any,
            options: any
        ) {
            _target.addEventListener(event, listener, options)
            return () => _target.removeEventListener(event, listener, options)
        }

        cleanup()

        cleanups.push(
            ...(events as string[]).flatMap((event) => {
                return (listeners as AnyFn[]).map((listener) =>
                    register(target, event, listener, options)
                )
            })
        )

        on_destroy(cleanup)

        return cleanup
    }

    // alias
    export { event_listener as on }
    ```
