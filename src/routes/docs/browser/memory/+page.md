---
title: Memory
description: Reactive Memory Info.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive Memory Info.

## Usage

```svelte
<script>
    import {memory} from "@sveu/browser"

    const {supported, result} = memory()
</script>
```

## Example

```svelte live ln
<script>
    import { memory } from "@sveu/browser"

    const { supported, result } = memory()
</script>

<div class="text-center">
    <h1>Supported: {$supported}</h1>

    <h2>Js Heap Size Limit: {$result?.jsHeapSizeLimit}</h2>

    <h2>Total Js Heap: {$result?.totalJSHeapSize}</h2>

    <h2>Used Js Heap: {$result?.usedJSHeapSize}</h2>
</div>
```

## API

### Options

| Name                 | Description                                         | Type               |
| -------------------- | --------------------------------------------------- | ------------------ |
| **interval**         | The interval in seconds to check the memory.        | `number`           |
| **IntervalFnOptions**|See [IntervalFnOptions](/shared/intervalFn/#Options).|`IntervalFnOptions` |

<br/>
<br/>

### Returns

| Name          | Description                               | Type                                      |
| ------------- | ----------------------------------------- | ----------------------------------------- |
| **supported** | If the browser supports the `memory` API. | boolean                                   |
| **result**    | A readable store with the memory info.    | Readable<`MemoryInfo`>                    |
