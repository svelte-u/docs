---
title: Screen Orientation
description: Reactive wrapper for the ScreenOrientation API.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive wrapper for the [ScreenOrientation API.](https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation)

## Usage

```svelte
<script>
    import { screenOrientation } from "@sveu/browser"

    const { supported, orientation, angle, lock, unlock } = screenOrientation()
</script>
```

## Example

```svelte live ln
<script>
    import { screenOrientation } from "@sveu/browser"

    const { supported, orientation, angle } = screenOrientation()
</script>

<div class="flex flex-col space-y-5 mt-20 items-center">
    <p class="border border-4 shadow mb-2 p-3">
        For best results, please use a mobile or tablet device (or use your
        browser's native inspector to simulate an orientation change)
    </p>

    <p>Supported: {$supported}</p>

    <div>Orientation Type: <b>{$orientation}</b></div>

    <div>Orientation Angle: <b>{$angle}</b></div>
</div>
```

## API

### Returns

| Name            | Description                                    | Type                                |
| --------------- | ---------------------------------------------- | ----------------------------------- |
| **supported**   | Whether the ScreenOrientation API is supported | Readable<`boolean>`                 |
| **orientation** | The current orientation of the device          | Readable<`OrientationType`>         |
| **angle**       | The current angle of the device                | Readable<`number`>                  |
| **lock**        | Lock the orientation of the device             | (type: OrientationLockType) => void |
| **unlock**      | Unlock the orientation of the device           | () => void                          |
