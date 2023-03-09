---
title: Preferred Languages
description: Reactive Navigator Languages.
demo_link: https://svelte.dev/repl/0fccd07db61147bc9cc5202376fc8910?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { preferred_lang } from "@sveu/browser"

    const lang = preferred_lang()
</script>
```

## 👩‍💻API

### ↩️ Returns

A subscribable store with the value of the Navigator Languages.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { to_readable, to_writable } from "@sveu/shared"

    import { on } from "../event_listener"

    /**
     * Reactive Navigator Languages.
     *
     * @returns Readable Store
     */
    export function preferred_lang() {
        if (!window) return to_readable(["en"])

        const navigator = window.navigator

        const { subscribe, set } = to_writable<readonly string[]>(
            navigator.languages
        )

        on(window, "languagechange", () => {
            set(navigator.languages)
        })

        return { subscribe }
    }
    ```
