---
title: Mouse
description: Reactive mouse position.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive mouse position.

## Usage

```svelte
<script>
    import { mouse } from "@sveu/browser"

    const { x, y, type } = mouse()
</script>
```

## Example

```svelte live ln
<script lang="ts">
    import { mouse } from "@sveu/browser"

    const { x, y, type } = mouse()
</script>

<div class="text-center">
    <h1>Mouse X: {$x}</h1>

    <h2>Mouse Y: {$y}</h2>

    <h2>Source Type: {$type}</h2>
</div>
```

## API

### Options

| Name                 | Description                                         | Type               |
| -------------------- | --------------------------------------------------- | ------------------ |
| **type**             | Mouse position based by page, client, screen or relative to previous position. | `page` or `client` or `movement` or `screen` or `relative` or `mouse` or `touch` |
| **touch**            | Listen to `touchmove` events.                       | `boolean`            |
| **resetOnTouchEnds** | Reset to initial value when `touchend` event fired. | `boolean`            |
| **fallback**         | The fallback position when the browser doesn't support mouse events. | `Position`          |

<br/>
<br/>

### Returns

| Name     | Description                               | Type                                      |
| -------- | ----------------------------------------- | ----------------------------------------- |
| **x**    | The x position.                           | Readable<`number`>                        |
| **y**    | The y position.                           | Readable<`number`>                        |
| **type** | The source type of the mouse position.    | Readable<`MouseSourceType`>               |
