---
title: Slug
description: Returns a random slug
demo_link: https://svelte.dev/repl/e1cea62ec47248729c255bf87849a0d5?version=3.55.1
---

# {{title}}

Returns a random slug.

## 🎬 Usage

```html
<script>
    import {slug} from "@sveu/shared"
</script>
{slug()}
```

## 👩‍💻API

### 🙈 Options

| Name                | Description                          | Type                          | Default  |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **lower**           | Use lower letters.                   | `boolean`                     | True     |
| **upper**           | Use uppercase letters.               | `boolean`                     | True     |
| **digits**          | Use digits.                          | `boolean`                     | True     |
| **size**            | Size of the slug.                    | `number`                      | 6        |
| **prefix**          | Text to use as a prefix.             | `string`                      |          |

### ↩️ Returns

A random slug.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## 👀 Source Code

??? tip "Source Code"

    ```ts
    import { range } from "../range"

    interface SlugOptions {
        /**
         * Use lower letters.
         *
         * @defaultValue true
         */
        lower?: boolean

        /**
         * Use uppercase letters.
         *
         * @defaultValue true
         */
        upper?: boolean

        /**
         * Use digits.
         *
         * @defaultValue true
         */
        digits?: boolean

        /**
         * Size of the slug.
         *
         * @defaultValue 6
         */
        size?: number

        /**
         * Text to use as a prefix.
         *
         */
        prefix?: string
    }

    /**
     * Returns a random slug.
     *
     * @param options - The options.
     *
     * @returns A random slug.
     */
    export function slug(options: SlugOptions = {}): string {
        const { lower = true, upper = true, digits = true } = options

        let size = options.size || 6

        let chars = ""

        if (size <= 1) size = 2

        if (lower) chars += "abcdefghijklmnopqrstuvwxyz"

        if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

        if (digits) chars += "0123456789"

        let slug = ""

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const _ of range(size - 1))
            slug += chars[Math.floor(Math.random() * chars.length)]

        return options.prefix ? `${options.prefix}-${slug}` : slug
    }
    ```
