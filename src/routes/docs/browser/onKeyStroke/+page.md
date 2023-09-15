---
title: On Key Stroke
description: Listens for a keyboard key being stroked.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Listens for a keyboard key being stroked.

## Usage

```svelte
<script>
    import { onKeyStroke } from "@sveu/browser"

    onKeyStroke(["w", "W", "ArrowUp"], (e) => {
        // Do something
    })
</script>
```

## Example

```svelte live ln
<script>
    import { onKeyStroke } from "@sveu/browser"

    let translate_x = 0

    let translate_y = 0

    onKeyStroke(["w", "W", "ArrowUp"], (e) => {
        translate_y -= 10
    })

    onKeyStroke(["s", "S", "ArrowDown"], (e) => {
        translate_y += 10
    })

    onKeyStroke(["a", "A", "ArrowLeft"], (e) => {
        translate_x -= 10
    })

    onKeyStroke(["d", "D", "ArrowRight"], (e) => {
        translate_x += 10
    })
</script>

<div>
    <div class="container border-base">
        <div
            class="ball"
            style="transform: translate({translate_x}px, {translate_y}px)">
        </div>
    </div>
    <div class="mt-4 text-center">
        Use the arrow keys or w a s d keys to control the movement of the ball.
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 400px;
        height: 100px;
        margin: auto;
        overflow: hidden;
        border: 1px solid #a1a1a130;
        border-radius: 5px;
    }

    .ball {
        width: 16px;
        height: 16px;
        background: #a1a1a1;
        border-radius: 50%;
    }
</style>
```

## API

### Arguments

| Name        | Description                                 | Type                             |Required|
| ----------- | ------------------------------------------- | -------------------------------- | ------ |
| **key**     | The key to listen for.          | `string` or `string[]` or `function`or `true` | Yes    |
| **handler** | The handler to call when the key is stroked. | `(event: KeyboardEvent) => void` | Yes    |

<br/>

:::note

- `string` - The key to listen for. E.g. `"Shift"`.
- `string[]` - The keys to listen for. E.g. `["Shift", "Control"]`.
- `function` - A function that returns `true` if the key should be listened for.
- `true` - Listen for any key.
:::

<br />
<br />

### Options

| Name        | Description                            | Type                          | Default   |
| ----------- | -------------------------------------- | ----------------------------- | --------- |
| **target**  | The target to listen on.               | `EventTarget`                 | `window`  |
| **event**   | The event to listen for.               | `string`                      | `keydown` |
| **passive** | Whether the event listener is passive. | `boolean`                     | `false`   |
