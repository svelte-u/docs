---
title: Window Scroll
description: Reactive window scroll.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive window scroll.

## Usage

```svelte
<script>
    import { windowScroll } from "@sveu/browser"

    const { x, y } = windowScroll()

</script>
```

## Example

```svelte live ln
<script>
    import { windowScroll } from "@sveu/browser"

    const { x, y } = windowScroll()
</script>

<div class="flex flex-col h-screen w-full items-center justify-center">
    x: {$x}<br />
    y: {$y}
</div>
```

## API

### Returns

| Name        | Description                          | Type                          |
| ----------- | ------------------------------------ | ----------------------------- |
| **x**       | A readable store with the x position | Readable<`number`>            |
| **y**       | A readable store with the y position | Readable<`number`>            |
