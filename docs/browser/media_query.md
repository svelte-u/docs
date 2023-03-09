---
title: Media Query
description: Reactive Media Query.
demo_link: https://svelte.dev/repl/1e16ce396c59454cb028efc2a0b6f1da?version=3
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {media_query} from "@sveu/browser"

    const dark = media_query("(prefers-color-scheme: dark)")

    const reduced = media_query("(prefers-reduced-motion: reduce)")

    const more = media_query("(prefers-contrast: more)")

    const less = media_query("(prefers-contrast: less)")

    const custom = media_query("(prefers-contrast: custom)")

    let contrast = "no-preference"

    $: if($more) contrast = "more"

    $: if($less) contrast = "less"

    $: if($custom) contrast = "custom"

    $: if(!$more && !$less && !$custom) contrast = "no-preference"
</script>

<h1>Prefers Dark: {$dark}</h1>

<h1>Prefers Reduce Motion: {$reduced}</h1>

<h1>Prefers Contrast: {contrast}</h1>
```

## 👩‍💻API

### 👻 Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **query**       | Media Query              | `string`                          | Yes      |

### ↩️ Returns

A readable store containing the result of the media query.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { browser, to_readable, to_writable, unstore } from "@sveu/shared"

    import { on } from "../event_listener"
    import { support } from "../support"

    /**
     * Reactive Media Query.
     *
     * @param query - Media Query
     *
     * @returns Readable Store
     *
     */
    export function media_query(query: string) {
        if (!browser) return to_readable(false)

        const supported = support("matchMedia", "window")

        if (!unstore(supported)) return to_readable(false)

        const { subscribe, set } = to_writable(false)

        const media_query: MediaQueryList | undefined = window.matchMedia(query)

        function handler(event: MediaQueryListEvent) {
            set(event.matches)
        }

        set(media_query.matches)

        on(media_query, "change", handler)

        return { subscribe }
    }
    ```
