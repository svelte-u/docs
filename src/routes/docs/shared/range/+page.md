---
title: Range
description: Creates a range of numbers.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive async state.

## Usage

```svelte
<script>
    import {range} from "@sveu/shared"

    const numbers = range(0, 10, 2)
</script>
```

## Example

```svelte live ln
<script>
    import { range } from "@sveu/shared"
</script>

{#each range(0, 10, 2) as number}
    <p>{number}</p>
{/each}
```

## API

### Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **start**           | Starting number                      | `number`                      | Yes      |
| **stop**            | Stop number                          | `number`                      | No       |
| **step**            | Step number                          | `number`                      | No       |
