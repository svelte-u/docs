---
title: FPS
description: Reactive FPS (frames per second).
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive FPS (frames per second).

## Usage

```svelte
<script>
    import {fps} from "@sveu/browser"

    const result = fps()
</script>
```

## Example

```svelte live ln
<script>
    import { fps } from "@sveu/browser"

    const result = fps()
</script>

<h1>{$result}</h1>
```

## API

### Options

| Name         | Description                          | Type                       | Default    |
| -----------  | ------------------------------------ | ---------------------------| --------   |
| **every**    | Calculate the FPS on every x frames. | `number`                   | 10         |
