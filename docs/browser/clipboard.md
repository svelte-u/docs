---
title: Clipboard
description: Reactive Clipboard. 
demo_link: https://svelte.dev/repl/24808df5421e4ed4a9992552bd98cd7f?version=3.53.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
  import {clipboard} from "@sveu/browser"

    const { text, supported, copy, copied } = clipboard()
</script>
```

## 👩‍💻API

### 🙈 Options

| Name        | Description                          | Type                       | Default    |
| ----------- | ------------------------------------ | ---------------------------| --------   |
| **read**    | Read clipboard                       | `boolean`                  | `false`    |
| **source**  | Copy from source                     | `Source`                   | `undefined`|
| **copied_during** | Seconds to reset state of `copied` store | `number`    | `1.5`     |
| **legacy**  | Use legacy clipboard API             | `boolean`                  | `false`    |

### ↩️ Returns

| Name        | Description                                | Type                               |
| ----------- | -------------------------------------------| -----------------------------      |
| **supported** | Is the browser support Clipboard API     | `Readable<boolean>`                |
| **text**    | Clipboard text                             | `Readable<string>`                 |
| **copied**  | Is the text copied                         | `Readable<boolean>`                |
| **copy**    | Copy text to clipboard                     | `(text?: string) => Promise<void>`  |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { timeoutfn, to_readable, to_writable, unstore } from "@sveu/shared"

    import { on } from "../event_listener"
    import { support } from "../support"
    import type { ClipboardOptions, ClipboardReturn } from "../utils"

    /**
     * Reactive Clipboard API.
     *
     * @param options - The options for the clipboard.
     * - `read` - Enabled reading for clipboard. default: `false`
     * - `source` - Copy source.
     * - `copied_during` - Seconds to reset state of `copied` ref. default: `1.5`
     * - `legacy` - Whether fallback to document.execCommand('copy') if clipboard is undefined. default: `false`
     *
     * @returns
     * - `supported` - Returns whether the clipboard is supported.
     * - `text` - The text in the clipboard.
     * - `copied` - Whether the text is copied.
     * - `copy` - A function to copy the text to the clipboard.
     */
    export function clipboard(
      options?: ClipboardOptions<undefined>
    ): ClipboardReturn<false>
    export function clipboard(
      options: ClipboardOptions<string>
    ): ClipboardReturn<true>
    export function clipboard(
      options: ClipboardOptions<string | undefined> = {}
    ): ClipboardReturn<boolean> {
      const {
        read = false,
        source,
        copied_during = 1.5,
        legacy = false,
      } = options

      const events = ["copy", "cut"]

      const clipboard_supported = support("clipboard")

      const supported = to_readable(clipboard_supported || legacy)

      const text = to_writable("")

      const copied = to_writable(false)

      const timeout = timeoutfn(() => copied.set(false), copied_during, {
        immediate: false,
      })

      /** Update text when clipboard changes. */
      async function update_text() {
        if (unstore(clipboard_supported)) {
          const value = (await navigator?.clipboard.readText()) ?? ""
          text.set(value)
        } else text.set(legacy_read())
      }

      if (unstore(supported) && read) {
        for (const event of events)
          on(event as keyof WindowEventMap, update_text)
      }

      /** Copy text to clipboard.
       *
       * @param value - The text to copy.
       */
      async function copy(value = source) {
        if (unstore(supported) && value != null) {
          if (unstore(clipboard_supported) && !legacy)
            await navigator?.clipboard.writeText(value)
          else legacy_copy(value)

          text.set(value)

          copied.set(true)

          timeout.start()
        }
      }

      /**
       * The legacy copy function.
       *
       * @param value - The text to copy.
       */
      function legacy_copy(value: string) {
        const ta = document.createElement("textarea")
        ta.value = value ?? ""
        ta.style.position = "absolute"
        ta.style.opacity = "0"
        document.body.appendChild(ta)
        ta.select()
        document.execCommand("copy")
        ta.remove()
      }

      /** The legacy read function.
       *
       * @returns The text in the clipboard.
       */
      function legacy_read() {
        return document?.getSelection?.()?.toString() ?? ""
      }

      return {
        supported,
        text: to_readable(text),
        copied: to_readable(copied),
        copy,
      }
    }
    ```
