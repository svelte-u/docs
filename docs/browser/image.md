---
title: Image
description: Reactive load an image in the browser
demo_link: https://svelte.dev/repl/a0f9eb5709d149b9a9858a97d5e15623?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { image } from "@sveu/browser"

    const { loading } = image({
        src: "https://i.ibb.co/JjL8tSt/final-fantasy-xiii-2-lightning-2560x1440.jpg",
    })
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **options**     | [Read options](#options) | `ImageOptions`                    | Yes      |
| **async_state_options** | [Read options](/shared/async_state/#options) | `AsyncStateOptions` | No       |

### 🙈 Options

| Name        | Description                          | Type                          | Default  |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **src**     | Image source                         | `string`                      | Required filed |
| **srcset**  | Image source set                     | `string`                      | `undefined` |
| **sizes**   | Image sizes                           | `string`                      | `undefined` |

### ↩️ Returns

[AsyncState Returns](http://127.0.0.1:8000/shared/async_state/#returns)

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { async_state } from "@sveu/shared"
    import type { AsyncStateOptions } from "@sveu/shared"

    import type { ImageOptions } from "../utils"

    async function load_image(options: ImageOptions): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image()

            const { src, srcset, sizes } = options

            img.src = src

            if (srcset) img.srcset = srcset

            if (sizes) img.sizes = sizes

            img.onload = () => resolve(img)

            img.onerror = reject
        })
    }

    /**
     * Reactive load an image in the browser, you can wait the result to display it or show a fallback.
     *
     * @param options - Options.
     * - `src` Address of the resource.
     * - `srcset` Images to use in different situations, e.g., high-resolution displays, small monitors, etc.
     * - `sizes` Image sizes for different page layouts.
     *
     * @param async_state_options - see [Async state options](https://svelte-u.netlify.app/shared/async_state/#options)
     *
     * @returns An async state. See [Async state](https://svelte-u.netlify.app/shared/async_state/#returns)
     */
    export function image(
        options: ImageOptions,
        async_state_options?: AsyncStateOptions
    ) {
        const state = async_state<HTMLImageElement | undefined>(
            () => load_image(options),
            undefined,
            {
                reset_on_execute: true,
                ...async_state_options,
            }
        )
        state.execute(async_state_options ? async_state_options.delay : 0)

        return state
    }
    ```
