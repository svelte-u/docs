---
title: Len
description: Get the length of a value.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Is a function that returns the length of a value. The function is inspired from [Python len](https://docs.python.org/3/library/functions.html#len) function.

## Usage

```svelte
<script>
    import {len} from "@sveu/shared"

    const value = "Hello World"
</script>

<h1>Length of "{value}" is {len(value)}</h1>
```

## Example

```svelte live ln
<script lang="ts">
    import { len } from "@sveu/shared"

    const value = "Hello World"

    const mapx = new Map()

    const dict = {
        a: 1,
        b: 2,
    }

    const set = new Set([1, 2, 3])

    const list = [1, 2, 3]

    mapx.set("a", 1)

    mapx.set("b", 2)
</script>

<h1>Length of "{value}" is {len(value)}</h1>

<h1>Length of map is {len(mapx)}</h1>

<h1>Length of dict is {len(dict)}</h1>

<h1>Length of set is {len(set)}</h1>

<h1>Length of list is {len(list)}</h1>
```

## API

### Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **item**            | The value to get the length from.    | `T`                         | Yes      |
