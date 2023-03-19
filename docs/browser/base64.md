---
title: Base64
description: Convert a value to a base64 string
demo_link: https://svelte.dev/repl/ebf6c0a46a954119ad493abbb7079126?version=3.57.0
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { base64 } from "@sveu/browser"

    const result = base64("text")
</script>

<textarea value="{$text_result}" readonly></textarea>
```

## 👩‍💻API

### 👻 Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **target**      | The value to convert     | `any`                             | Yes      |

### 🙈 Options

| Name           | Description                                                           | Type             |
| -------------- | --------------------------------------------------------------------- | ---------------  |
| **serializer** | The serializer to use. Only used if the target is an object           |`(v: T) => string`|
| **type**       | The MIME type to use. Only used if the target is a canvas or image    | `string`         |
| **quality**    | The image quality to use. Only used if the target is a canvas or image| `number`         |

### ↩️ Returns

The base64 string as readable store

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import type { Readable } from "svelte/store"

    import { browser, to_readable, to_writable } from "@sveu/shared"

    import type { Base64ObjectOptions, ToDataURLOptions } from "../utils"

    const DEFAULT_SERIALIZER = {
        array: (v: unknown[]) => JSON.stringify(v),
        object: (v: Record<string, unknown>) => JSON.stringify(v),
        set: (v: Set<unknown>) => JSON.stringify(Array.from(v)),
        map: (v: Map<string, unknown>) => JSON.stringify(Object.fromEntries(v)),
        null: () => "",
    }

    /**
     * Get the serialization function for a given target
     *
     * @param target - The target to get the serialization function for
     *
     * @returns The serialization function for the target
     */
    function get_serialization<T extends object>(target: T) {
        if (!target) return DEFAULT_SERIALIZER.null

        if (target instanceof Map) return DEFAULT_SERIALIZER.map
        else if (target instanceof Set) return DEFAULT_SERIALIZER.set
        else if (Array.isArray(target)) return DEFAULT_SERIALIZER.array
        else return DEFAULT_SERIALIZER.object
    }

    /**
     * Load an image and return a promise that resolves when the image is loaded
     *
     * @param img - The image to load
     */
    function img_loaded(img: HTMLImageElement) {
        return new Promise<void>((resolve, reject) => {
            if (!img.complete) {
                img.onload = () => {
                    resolve()
                }
                img.onerror = reject
            } else {
                resolve()
            }
        })
    }

    /**
     * Convert a blob to a base64 string
     *
     * @param blob - The blob to convert
     *
     * @returns The base64 string
     */
    function blob_to_base64(blob: Blob) {
        return new Promise<string>((resolve, reject) => {
            const fr = new FileReader()

            fr.onload = (e) => {
                resolve(e.target?.result as string)
            }

            fr.onerror = reject

            fr.readAsDataURL(blob)
        })
    }

    /**
     * Convert a value to a base64 string
     *
     * @param target - The value to convert
     *
     * @param options - The options to use
     * - `serializer` - The serializer to use. Only used if the target is an object
     * - `type` - The MIME type to use. Only used if the target is a canvas or image
     * - `quality` - The image quality to use. Only used if the target is a canvas or image
     *
     * @returns The base64 string readable store
     */
    export function base64(target: string): Readable<string>
    export function base64(target: Blob): Readable<string>
    export function base64(target: ArrayBuffer): Readable<string>
    export function base64(
        target: HTMLCanvasElement,
        options?: ToDataURLOptions
    ): Readable<string>
    export function base64(
        target: HTMLImageElement,
        options?: ToDataURLOptions
    ): Readable<string>
    export function base64<T extends Record<string, unknown>>(
        target: T,
        options?: Base64ObjectOptions<T>
    ): Readable<string>
    export function base64<T extends Map<string, unknown>>(
        target: T,
        options?: Base64ObjectOptions<T>
    ): Readable<string>
    export function base64<T extends Set<unknown>>(
        target: T,
        options?: Base64ObjectOptions<T>
    ): Readable<string>
    export function base64<T>(
        target: T[],
        options?: Base64ObjectOptions<T[]>
    ): Readable<string>
    export function base64(target: unknown, options?: any) {
        const base64 = to_writable("")

        function execute() {
            if (!browser) return

            new Promise<string>((resolve, reject) => {
                try {
                    if (target == null) resolve("")
                    else if (typeof target === "string") {
                        resolve(
                            blob_to_base64(
                                new Blob([target], { type: "text/plain" })
                            )
                        )
                    } else if (target instanceof Blob) {
                        resolve(blob_to_base64(target))
                    } else if (target instanceof ArrayBuffer) {
                        resolve(
                            window.btoa(
                                String.fromCharCode(...new Uint8Array(target))
                            )
                        )
                    } else if (target instanceof HTMLCanvasElement) {
                        resolve(target.toDataURL(options?.type, options?.quality))
                    } else if (target instanceof HTMLImageElement) {
                        const img = target.cloneNode(false) as HTMLImageElement

                        img.crossOrigin = "Anonymous"

                        img_loaded(img)
                            .then(() => {
                                const canvas = document.createElement("canvas")

                                const ctx = canvas.getContext("2d")

                                canvas.width = img.width

                                canvas.height = img.height

                                ctx?.drawImage(
                                    img,
                                    0,
                                    0,
                                    canvas.width,
                                    canvas.height
                                )

                                resolve(
                                    canvas.toDataURL(
                                        options?.type,
                                        options?.quality
                                    )
                                )
                            })
                            .catch(reject)
                    } else if (typeof target === "object") {
                        const serializer =
                            options?.serializer || get_serialization(target)

                        const serialized = serializer(target)

                        return resolve(
                            blob_to_base64(
                                new Blob([serialized], {
                                    type: "application/json",
                                })
                            )
                        )
                    } else {
                        reject(new Error("target is unsupported types"))
                    }
                } catch (error) {
                    reject(error)
                }
            }).then((res) => base64.set(res))
        }

        execute()

        return to_readable(base64)
    }
    ```
