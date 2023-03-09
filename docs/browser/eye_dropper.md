---
title: Eye Dropper
description: Reactive EyeDropper API
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { eye_dropper } from "@sveu/browser"

    const { supported, open, sRGBHex } = eye_dropper()
</script>
```

## 👩‍💻API

### 🙈 Options

[Read more in the MDN](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API)

### ↩️ Returns

| Name            | Description              | Type                              |
| --------------- | ------------------------ | --------------------------------- |
| `supported`     | Whether the browser supports the EyeDropper API | `Readable<boolean>` |
| `sRGBHex`       | The sRGBHex of the selected color | `Readable<string>` |
| `open`          | Open the eye dropper | `(open_options?: EyeDropperOpenOptions) => Promise<{sRGBHex:string;} | undefined>` |

## 🧪 Playground

[StackBlitz](https://stackblitz.com/edit/github-8gcpfy?file=src%2Froutes%2Fbrowser%2Feye_dropper%2F%2Bpage.svelte)

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { to_readable, to_writable, unstore } from "@sveu/shared"

    import { support } from "../support"
    import type {
        EyeDropper,
        EyeDropperOpenOptions,
        EyeDropperOptions,
    } from "../utils"

    /**
     * Reactive [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API)
     *
     * @param options - Options
     * - `initial` - Initial sRGBHex.
     *
     * @returns - The eye dropper
     * - `supported` - Whether the browser supports the EyeDropper API
     * - `sRGBHex` - The sRGBHex of the selected color
     * - `open` - Open the eye dropper
     *
     */
    export function eye_dropper(options: EyeDropperOptions = {}) {
        const { initial = "" } = options

        const supported = support("EyeDropper", "window")

        const sRGBHex = to_writable(initial)

        /**
         * Open the eye dropper
         *
         * @param open_options - see [EyeDropperOpenOptions](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper/open)
         *
         * @returns - the dropper result
         */
        async function open(open_options?: EyeDropperOpenOptions) {
            if (!unstore(supported)) return

            const eyeDropper: EyeDropper = new (window as any).EyeDropper()

            const result = await eyeDropper.open(open_options)

            sRGBHex.set(result.sRGBHex)

            return result
        }

        return { supported, sRGBHex: to_readable(sRGBHex), open }
    }
    ```
