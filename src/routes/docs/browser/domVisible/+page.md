---
title: DOM Visible
description: Reactive document.visibilityState.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive document.visibilityState.

## Usage

```svelte
<script>
    import {domVisible} from "@sveu/browser"

    const visible = domVisible()
</script>
```

## Example

```svelte live ln
<script>
    import { domVisible } from "@sveu/browser" // [svp! hl:1]

    import { timeoutFn } from "@sveu/shared"

    const visible = domVisible() // [svp! hl:1]

    const startMessage = "💡 Minimize the page or switch tab then return"

    let message = startMessage

    const timeout = timeoutFn(() => {
        message = startMessage
    }, 1)

    $: if ($visible === "visible") {
        message = "🎉 Welcome back!"
        timeout.resume()
    }
</script>

<h1>{message}</h1>
```
