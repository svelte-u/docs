---
title: Drop Zone
description: Create drop zone area
demo_link: https://svelte.dev/repl/b2af83ab9be543e39074f3b4b6418ee7?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {dropzone} from "@sveu/actions"

    function hover(data){
        ...
    }

    function on_file_drop(data){
        ...
    }

</script>

<div use:dropzone on:hover="{hover}" on:files="{on_file_drop}">
    Drop files here
</div>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **fn**              | A function to be called when the dropzone is hovered or files are dropped. | `(data: DropzoneData) => void` | No |

### 🙈 Events

| Name                | Description                                          | Type        | Return      |
| ------------------- | ---------------------------------------------------- | ----------- | ----------- |
| **hover**           | An event will fire once a file is over the dropzone. | `CustomEvent<boolean` | A custom event with detail as boolean |
| **files**           | An event will fire once a file is dropped. | `CustomEvent<File[]>` | A custom event with detail as array of files |

??? note

    If you use typescript, you need to add `./node_modules/@sveu/actions/events.d.ts` to your `tsconfig.json` file.

    ```json
        {
            ...

            "include": [
                ...
                "./node_modules/@sveu/actions/events.d.ts"
            ]
            ...

        }
    ```

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { on } from "@sveu/browser"

    import type { DropzoneData } from "../utils"

    /**
     * Create a dropzone area.
     *
     * @param element - The element to make as dropzone.
     *
     * @param fn - A function to be called when the dropzone is hovered or files are dropped.
     * - `over_dropzone` - Whether the dropzone is hovered. Type: `boolean`.
     * - `files` - The files dropped. Type: `File[]` or `undefined`.
     */
    export function dropzone(
        element: HTMLElement,
        fn?: (data: DropzoneData) => void
    ) {
        let counter = 0

        const dragenter_cleanup = on<DragEvent>(element, "dragenter", (event) => {
            event.preventDefault()

            counter += 1

            if (fn) fn({ over_dropzone: true })

            element.dispatchEvent(new CustomEvent("hover", { detail: true }))
        })

        const dragover_cleanup = on<DragEvent>(element, "dragover", (event) => {
            event.preventDefault()
        })

        const dragleave_cleanup = on<DragEvent>(element, "dragleave", (event) => {
            event.preventDefault()

            counter -= 1

            if (counter === 0) {
                if (fn) fn({ over_dropzone: false })

                element.dispatchEvent(new CustomEvent("hover", { detail: false }))
            }
        })

        const drop_cleanup = on<DragEvent>(element, "drop", (event) => {
            event.preventDefault()

            counter = 0

            const files = Array.from(event.dataTransfer?.files ?? [])

            if (fn) fn({ over_dropzone: false, files: files })

            element.dispatchEvent(new CustomEvent("hover", { detail: false }))

            element.dispatchEvent(new CustomEvent("files", { detail: files }))
        })

        return {
            destroy() {
                dragenter_cleanup()
                dragover_cleanup()
                dragleave_cleanup()
                drop_cleanup()
            },
        }
    }
    ```
