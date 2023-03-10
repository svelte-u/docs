---
title: Favicon
description: Reactive Favicon
---

# {{title}}

{{description}}

## ๐ฌ Usage

```html
<script>
    import { favicon } from "@sveu/browser"

    const icon = favicon()
</script>
```

## ๐ฉโ๐ปAPI

### ๐ป Arguments

| Name            | Description                          | Type                              | Required |
| --------------- | ------------------------------------ | --------------------------------- | -------- |
| **icon**        | The icon to set                      | `string`                          | No       |

### ๐ Options

| Name            | Description                          | Type                              | default  |
| --------------- | ------------------------------------ | --------------------------------- | -------- |
| **base_url**    | The base url of the icon             | `string`                          | `/`      |
| **rel**         | The rel of the icon                  | `string`                          | `icon`   |

### โฉ๏ธ Returns

A watchable store of the favicon.

## ๐งช Playground

[StackBlitz](https://stackblitz.com/edit/github-8gcpfy?file=src%2Froutes%2Fbrowser%2Ffavicon%2F%2Bpage.svelte)

## Source Code ๐

??? tip "Source Code"

    ```ts
    import { is_string, watchable } from "@sveu/shared"

    import type { FaviconOptions } from "../utils"

    /**
     * Reactive favicon.
     *
     * @param icon - The icon to use.
     *
     * @param options - Options to use:
     * - `base_url` - The base url to prepend to the favicon.
     * - `rel` - The rel attribute of the favicon.
     *
     * @returns A watchable store of the favicon.
     */
    export function favicon(
        icon?: string | null | undefined,
        options: FaviconOptions = {}
    ) {
        const { base_url = "/", rel = "icon" } = options

        function apply_icon(icon: string) {
            document?.head
                .querySelectorAll<HTMLLinkElement>(`link[rel*="${rel}"]`)
                .forEach((el) => (el.href = `${base_url}${icon}`))
        }

        const favicon = watchable(icon, (o, n) => {
            if (!!n && is_string(n) && o !== n) apply_icon(n)
        })

        return favicon
    }
    ```
