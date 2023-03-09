---
title: Window Focus
description: Reactive window focus.
demo_link: https://svelte.dev/repl/ad8fd160073c4422abc4ab6a57fecea9?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { window_focus } from "@sveu/browser"

    const focused = window_focus()
</script>
```

## 👩‍💻API

### ↩️ Returns

A readable boolean store with the current window focus state.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { browser, to_readable, to_writable } from "@sveu/shared"

    import { on } from "../event_listener"

    /**
     * Reactively track window focus with `window.onfocus` and `window.onblur`.
     *
     * @returns A readable store with the current window focus state.
     */
    export function window_focus() {
        if (!browser) return to_readable(false)

        const { set, subscribe } = to_writable(window.document.hasFocus())

        on(window, "blur", () => set(false))

        on(window, "focus", () => set(true))

        return { subscribe }
    }
    ```
