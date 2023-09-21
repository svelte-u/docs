---
title: Last Changed
description: Track the last time the value changed.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Track the last time the value changed.

## Usage

```svelte
<script>
    import {lastChanged} from "@sveu/shared"

    const {value, timestamp} = lastChanged(7)
</script>
```

## Example

```svelte live ln
<script lang="ts">
    import { lastChanged, rtf } from "@sveu/shared"

    const { value, timestamp } = lastChanged(
        "world",
        +Date.now() - 1000 * 60 * 5
    )

    $: time = rtf($timestamp)
</script>

<div class="text-center">
    <input bind:value="{$value}" />

    <div>
        Last changed: <strong>{$time}</strong> <span>({$timestamp})</span>
    </div>
</div>
```

## API

### Arguments

| Name                 | Description                                  | Type                  | Required |
| -------------------- | -------------------------------------------- | --------------------- | -------- |
| **initialValue**     | Initial value                                | MaybeStore<`T`>       | Yes      |
| **initialTimestamp** | Initial timestamp                            | `number`              | No       |

<br />
<br />

### Returns

| Name                 | Type                                         |
| -------------------- | -------------------------------------------- |
| **value**            | `Watchable`                                  |
| **timestamp**        | Readable<`number`>                           |
