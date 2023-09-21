---
title: Adjust with unit
description: Adjust a value with unit.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Adjust a value with unit.

## Usage

```svelte
<script>
    import {adjustWithUnit} from "@sveu/shared"

    const result = adjustWithUnit("10px", 1)
</script>

<h1>{$result}</h1>

<button on:click="{() => result.inc()}">Increase</button>

<button on:click="{() => result.dec()}">Decrease</button>
```

## Example

```svelte live ln
<script>
    import { adjustWithUnit } from "@sveu/shared"

    let delta = 1

    let target = "10px"

    $: result = adjustWithUnit(target, delta)
</script>

<div class="text-center">
    <h1>Result: {$result}</h1>

    <br />

    <label for="delta">Delta</label>
    <input
        id="delta"
        type="number"
        bind:value="{delta}" />
    <br />
    <br />

    <label for="target">Target</label>
    <input
        id="target"
        type="text"
        bind:value="{target}" />
    <br />
    <br />

    <button class="mr-5" on:click="{() => result.inc()}">Increase</button>

    <button on:click="{() => result.dec()}">Decrease</button>
</div>
```

## API

### Arguments

| Name                | Description                        | Type                            | Required |
| ------------------- | ---------------------------------- | ------------------------------- | -------- |
| **target**          | Value to adjust                    | MaybeStore<`string` or `number`>| Yes      |
| **delta**           | Amount to adjust by                | `number`                        | Yes      |
