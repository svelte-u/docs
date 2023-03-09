---
title: Mutation Observer
description: Watch for changes being made to the DOM tree.
demo_link: https://svelte.dev/repl/6058fe0509934e59b1078dfd7253fcd5?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html hl_lines="2 8-16"
<script lang="ts">
    import { mutation_observer } from "@sveu/browser"
    import { timeoutfn } from "@sveu/shared"

    let messages= []

    function observer(target) {
        const { cleanup } = mutation_observer(
            target,
            (mutations) => {
                for (const mutation of mutations) {
                    messages = [...messages, mutation.attributeName]
                }
            },
            { attributes: true }
        )

        timeoutfn(() => {
            target.classList.add("text-red-500")
        }, 2)

        timeoutfn(() => {
            target.classList.remove("text-red-500")
        }, 4)

        timeoutfn(() => {
            target.setAttribute("svelte", "U")
            target.classList.add("text-red-500")
        }, 6)

        return {
            destroy() {
                cleanup()
            },
        }
    }
</script>

<h1 use:observer class="text-center">Hello From Svelte-U</h1>

<style>
:global(.text-red-500){--un-text-opacity:1;color:rgba(239,68,68,1);}
</style>
```

## 👩‍💻API

### 👻 Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **target**      | The target node          | `HTMLElement | SVGElement`        | Yes      |
| **fn**          | The function to call     | `MutationCallback`                | Yes      |

### 🙈 Options

[See MutationObserver Options](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe)

### ↩️ Returns

| Name            | Description              | Type                              |
| --------------- | -----------------------  | --------------------------------- |
| **supported**   | Whether the browser supports the `MutationObserver` API. | `Readable<boolean>` |
| **cleanup**     | A function to stop watching for changes. | `() => void` |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { on_destroy, unstore } from "@sveu/shared"

    import { support } from "../support"

    /**
     * Watch for changes being made to the DOM tree.
     *
     * @param target - The target node on which to observe DOM mutations.
     *
     * @param fn - The function to call when a mutation occurs.
     *
     * @param options - [See MutationObserver Options](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe)
     *
     * @returns
     * - `supported` - Whether the browser supports the `MutationObserver` API.
     * - `cleanup` - A function to stop watching for changes.
     */
    export function mutation_observer(
        target: HTMLElement | SVGElement | undefined | null,
        fn: MutationCallback,
        options: MutationObserverInit = {}
    ) {
        let observer: MutationObserver | undefined

        const supported = support("MutationObserver", "window")

        function cleanup() {
            if (observer) {
                observer.disconnect()
                observer = undefined
            }
        }

        if (unstore(supported) && target) {
            cleanup()

            observer = new MutationObserver(fn)

            observer.observe(target, options)
        }

        on_destroy(cleanup)

        return {
            supported,
            cleanup,
        }
    }
    ```
