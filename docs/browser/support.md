---
title: Support
description: Check if a feature is supported in the current browser.
demo_link: https://svelte.dev/repl/5ef3e0fbb7a8418aac094312668484db?version=3
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {support} from "@sveu/browser"

    const supported = support("clipboard")
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **feature**     | The feature to check for.| `string`                          | Yes      |
| **from**        | The object to check for the feature in. | `"navigator" | "window" | "document" | "performance"` | No |

### ↩️ Returns

A Readable boolean store value indicating whether the feature is supported.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import type { Readable } from "svelte/store"

    import { browser, to_writable } from "@sveu/shared"

    /**
     * Check if a feature is supported in the current browser.
     *
     * @param feature - The feature to check for.
     *
     * @param from - The object to check for the feature in.
     *
     * @returns A readable store with the result.
     *
     */
    export function support(
        feature: string,
        from: "navigator" | "window" | "document" | "performance" = "navigator"
    ): Readable<boolean> {
        const { subscribe, set } = to_writable(false)

        if (browser) {
            const _from =
                from === "navigator"
                    ? navigator
                    : from === "window"
                    ? window
                    : from === "document"
                    ? document
                    : performance

            set(_from && feature in _from)
        }

        return { subscribe }
    }
    ```
