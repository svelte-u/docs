---
title: Window Focus
description: Reactive window focus.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive window focus.

## Usage

```svelte
<script>
    import { windowFocus } from "@sveu/browser"

    const focused = windowFocus()
</script>
```

## Example

```svelte live ln
<script>
    import { windowFocus } from "@sveu/browser"

    const focused = windowFocus()

    const start_message =
        "💡 Click somewhere outside of the document to unfocus."

    let message = start_message

    $: if (!$focused) {
        message = "ℹ Tab is unfocused"
    } else {
        message = start_message
    }
</script>

<h1 class="text-center">{message}</h1>
```
