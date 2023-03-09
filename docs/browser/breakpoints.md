---
title: Breakpoints
description: Reactive viewport breakpoints. 
demo_link: https://svelte.dev/repl/6a1576a9bff349af99d0f19be7bb9ceb?version=3.52.0
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {breakpoints} from "@sveu/browser"

    const breakpoint = breakpoints({
        tablet: 640,
        laptop: 1024,
        desktop: 1280,
    })

    const laptop = breakpoint.bn('laptop', 'desktop')
</script>

<h1>{$laptop}</h1>
```

## 👩‍💻API

### 👻 Arguments

| Name            | Description                          | Type                              | Required |
| --------------- | ------------------------------------ | --------------------------------- | -------- |
| **breakpoints** | The breakpoints to use.              | `Record<string, string | number>` | Yes      |

### ↩️ Returns

| Name        | Description                                    | Type                          |
| ----------- | -----------------------------------------------| ----------------------------- |
| **gte**     | Returns true if the breakpoint is greater than or equal the current breakpoint. | `Readable<boolean>` |
| **lte**     | Returns true if the breakpoint is less than or equal the current breakpoint. | `Readable<boolean>` |
| **gt**      | Returns true if the breakpoint is greater than the current breakpoint. | `Readable<boolean>` |
| **lt**      | Returns true if the breakpoint is less than the current breakpoint. | `Readable<boolean>` |
| **bn**      | Returns true if the breakpoint is between the current breakpoint. | `Readable<boolean>` |
| **shortcut**| Shortcut methods for each breakpoint | `Readable<boolean>` |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>


## Source Code 👀

??? tip "Source Code"

    ```ts
    import type { Readable } from "svelte/store"

    import { adjust_with_unit, type, unstore } from "@sveu/shared"

    import { media_query } from "../media_query"
    import type { Breakpoints } from "../utils"

    /**
     * Reactively viewport breakpoints
     *
     * @param breakpoints - Key value pairs of breakpoints
     *
     * @returns
     * - `gt` - Checks if the viewport is greater than the breakpoint
     * - `gte` - Checks if the viewport is greater than or equal to the breakpoint
     * - `lt` - Checks if the viewport is smaller than the breakpoint
     * - `lte` - Checks if the viewport is smaller than or equal to the breakpoint
     * - `bn` - Checks if the viewport is between the two breakpoints
     * - `shortcuts` - Shortcut methods for each breakpoint
     */
    export function breakpoints<K extends string>(breakpoints: Breakpoints<K>) {
    /**
     * Get breakpoint value
     *
     * @param key - The breakpoint key
     *
     * @param delta - The delta value
     *
     * @returns The breakpoint value
     */
    function get_value(key: K, delta?: number) {
        let value = breakpoints[key]

        if (delta != null) value = unstore(adjust_with_unit(value, delta))

        if (type(value) === "number") value = `${value}px`

        return value
    }

    /**
     * Checks if the viewport is greater than or equal to the breakpoint
     *
     * @param key - The breakpoint key
     *
     * @returns Whether the breakpoint is greater than or equal to the breakpoint
     */
    function gte(key: K) {
        return media_query(`(min-width: ${get_value(key)})`)
    }

    /**
     * Checks if the viewport is greater than the breakpoint
     *
     * @param key - The breakpoint key
     *
     * @returns Whether the breakpoint is greater than the breakpoint
     */
    function gt(key: K) {
        return media_query(`(min-width: ${get_value(key, 0.1)})`)
    }

    /**
     * Checks if the viewport is smaller than or equal to the breakpoint
     *
     * @param key - The breakpoint key
     *
     * @returns Whether the breakpoint is smaller than or equal to the breakpoint
     */
    function lte(key: K) {
        return media_query(`(max-width: ${get_value(key)})`)
    }

    /**
     * Checks if the viewport is smaller than the breakpoint
     *
     * @param key - The breakpoint key
     *
     * @returns Whether the breakpoint is smaller than the breakpoint
     */
    function lt(key: K) {
        return media_query(`(max-width: ${get_value(key, -0.1)})`)
    }

    /**
     * Checks if the viewport is between the two breakpoints
     *
     * @param key - The breakpoint key
     *
     * @returns Whether the breakpoint is between the two breakpoints
     */
    function bn(a: K, b: K) {
        return media_query(
            `(min-width: ${get_value(a)}) and (max-width: ${get_value(
                b,
                -0.1
            )})`
        )
    }

    const shortcut_methods = Object.keys(breakpoints).reduce((shortcuts, k) => {
        Object.defineProperty(shortcuts, k, {
            get: () => gte(k as K),
            enumerable: true,
            configurable: true,
        })
        return shortcuts
    }, {} as Record<K, Readable<boolean>>)

    return {
        gt,
        gte,
        lt,
        lte,
        bn,
        ...shortcut_methods,
    }
    }
    ```
