---
title: Object Url
description: URL representing an object.
demo_link: https://svelte.dev/repl/4a6efeadad944a79934ad4ed79fb5ff2?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {object_url} from "@sveu/shared"

    let file = undefined

    const on_file_change = (e) => {
        const target = e.target
        const files = target.files
        file = files && files.length > 0 ? files[0] : undefined
    }

    $: url = object_url(file)
</script>

<input type="file" on:change="{on_file_change}" />

{url ? url : ""}
```

## 👩‍💻API

### Arguments

| Name        | Description                            | Type                            | Required|
| ----------- | -------------------------------------- | --------------------------------| --------|
| **value**   | The value to create an object URL for. | `Blob | MediaSource`            | Yes     |

### Returns

A URL representing the object.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { on_destroy } from "../on_destroy"

    /**
     * URL representing an object.
     *
     * @param value - The value to create an object URL for.
     *
     * @returns The object URL.
     */
    export function object_url(value: Blob | MediaSource | undefined) {
        let url: string | undefined = ""

        /** Clean up the object URL. */
        function release() {
            if (url) URL.revokeObjectURL(url)

            url = undefined
        }

        release()

        if (value) url = URL.createObjectURL(value)

        on_destroy(release)

        return url
    }
    ```
