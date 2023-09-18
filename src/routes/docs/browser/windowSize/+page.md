---
title: Window Size
description: Reactive window size.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive window size.

## Usage

```svelte
<script>
    import { windowSize } from "@sveu/browser"

    const { width, height } = windowSize()
</script>
```

## Example

```svelte live ln
<script>
    import { windowSize } from "@sveu/browser"
    const { width, height } = windowSize()
</script>

<p class="text-center">{$width} x {$height}</p>
```

## API

### Options

| Name              | Description                                                       | Type          |
| ----------------- | ----------------------------------------------------------------- | ------------- |
| **initialWidth**  | The initial width of the window.                                  | `number`      |
| **initialHeight** | The initial height of the window.                                 | `number`      |
| **orientation**   | Whether to use the orientationchange.                             | `boolean`     |
| **scrollbar**     | Whether the scrollbar should be included in the width and height. | `boolean`     |

<br/>
<br/>

### Returns

| Name        | Description                              | Type                          |
| ----------- | ---------------------------------------- | ----------------------------- |
| **width**   | A readable store with the window width.  |  Readable<`number`>           |
| **height**  | A readable store with the window height. |  Readable<`number`>           |
