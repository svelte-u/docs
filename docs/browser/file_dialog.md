---
title: File Dialog
description: Reactive File Dialog. 
demo_link: https://svelte.dev/repl/2ba9641536ce4478a87db2e8c0cde5f8?version=3.53.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {file_dialog} from "@sveu/browser"

    const { files, open, reset } = file_dialog()
</script>
```

## 👩‍💻API

### 🙈 Options

| Name         | Description                          | Type                       | Default    |
| -----------  | ------------------------------------ | ---------------------------| --------   |
| **multiple** | Allow multiple files to be selected  | `boolean`                  | `false`    |
| **accept**   | File types to accept                 | `string`                   | `*`        |
| **capture**  | [Capture method]                       | `string`                   | `undefined`|

### ↩️ Returns

| Name        | Description                                | Type                               |
| ----------- | -------------------------------------------| -----------------------------      |
| **files**   | List of selected files                    | `Readable<FileList | null>`                 |
| **accepted_files** | List of accepted files              | `Readable<File[] | null>`                 |
| **rejected_files** | List of rejected files              | `Readable<File[] | null>`                 |
| **open**    | Open the file dialog                       | `(local_options?: Partial<FileDialogOptions>) => void`                       |
| **reset**   | Reset the file dialog                      | `() => void`                       |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { browser, to_readable, to_writable } from "@sveu/shared"
    import { contains } from "@sveu/shared/dicts"

    import type { FileDialogOptions } from "../utils"

    const DEFAULT_OPTIONS: FileDialogOptions = {
        multiple: true,
        accept: "*",
    }

    /**
     * Open file dialog with ease.
     *
     * @param options - Options
     * - `multiple` - Allowed multiple files selection.
     * - `accept` - Allowed file types.
     * - `capture` - Capture mode.
     *
     * @returns
     * - `files` - The files selected.
     * - `accepted` - The files accepted.
     * - `rejected` - The files rejected.
     * - `open` - Open file dialog.
     * - `reset` - Reset file dialog.
     */
    export function file_dialog(options: FileDialogOptions = {}) {
        const files = to_writable<FileList | null>(null)

        const accepted = to_writable<File[] | null>(null)

        const rejected = to_writable<File[] | null>(null)

        let input: HTMLInputElement | undefined

        if (browser) {
            input = document.createElement("input")
            input.type = "file"

            input.onchange = (event: Event) => {
                const result = event.target as HTMLInputElement

                files.set(result.files)

                if (result.accept && result.files && result.accept !== "*") {
                    const _accepted = Array.from(result.files).filter((file) => {
                        const regex = new RegExp(result.accept.replace(/\*/g, ".*"))
                        return regex.test(file.type)
                    })

                    const _rejected = Array.from(result.files).filter((file) => {
                        const regex = new RegExp(result.accept.replace(/\*/g, ".*"))
                        return !regex.test(file.type)
                    })

                    accepted.set(_accepted)

                    rejected.set(_rejected)
                }
            }
        }

        /**
         * Open file dialog.
         *
         * @param local_options - Override default options.
         *
         */
        function open(local_options?: Partial<FileDialogOptions>) {
            if (!input) return

            const _options = {
                ...DEFAULT_OPTIONS,
                ...options,
                ...local_options,
            }

            input.multiple = _options.multiple ?? true

            input.accept = _options.accept ?? "*"

            if (contains(_options, "capture"))
                input.capture = _options.capture ?? ""

            input.click()
        }

        /** Reset file dialog. */
        function reset() {
            files.set(null)

            accepted.set(null)

            rejected.set(null)

            if (input) input.value = ""
        }

        return {
            files: to_readable(files),
            accepted: to_readable(accepted),
            rejected: to_readable(rejected),
            open,
            reset,
        }
    }
    ```
[Capture method]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture
