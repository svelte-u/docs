---
title: Raf Fn
description: Call function on every `requestAnimationFrame` with controls.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Call function on every `requestAnimationFrame` with controls.

## Usage

```svelte
<script>
    import { rafFn } from "@sveu/browser"

    let count = 0

    const { pause, resume } = rafFn(() => {
        count++
        console.log(count)
    })
</script>
```

## Example

```svelte live ln
<script>
    import { rafFn } from "@sveu/browser"

    let count = 0

    const { pause, resume } = rafFn(() => {
        count++
    })
</script>

<div class="flex flex-col space-y-6 mx-9 mt-9 text-center">
    <h1>Count: {count}</h1>

    <button on:click="{pause}">Pause</button>

    <button on:click="{resume}">Resume</button>
</div>
```

## API

### Arguments

| Name            | Description                                       | Type                | Required |
| --------------- | ------------------------------------------------- | ------------------- | -------- |
| **fn**          | Function to call on every `requestAnimationFrame` | `Fn`                | Yes      |

<br />
<br />

### Options

| Name          | Description                                                  | Type      |
| ------------- | ------------------------------------------------------------ | --------- |
| **immediate** | Start the requestAnimationFrame loop immediately on creation | `boolean` |

<br />
<br />

### Returns

| Name          | Description                          | Type                                  |
| ------------- | ------------------------------------ | ------------------------------------- |
| **pause**     | Pause the requestAnimationFrame loop | `Fn`                                  |
| **resume**    | Resume the requestAnimationFrame loop| `Fn`                                  |
| **active**    | Readable store of the active state   | Readable<`boolean`>                   |
