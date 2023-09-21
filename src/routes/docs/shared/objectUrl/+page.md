---
title: Object Url
description: URL representing an object.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

URL representing an object.

## Usage

```svelte
<script>
    import {objectUrl} from "@sveu/shared"

    let file = undefined

    const on_file_change = (e) => {
        const target = e.target
        const files = target.files
        file = files && files.length > 0 ? files[0] : undefined
    }

    $: url = objectUrl(file)
</script>

<input type="file" on:change="{on_file_change}" />

{url ? url : ""}
```

## Example

```svelte live ln
<script lang="ts">
    import { objectUrl } from "@sveu/shared"

    let file: File

    const on_file_change = (e: any) => {
        const target = e.target
        const files = target.files
        file = files && files.length > 0 ? files[0] : undefined
    }

    $: url = objectUrl(file)
</script>

<input type="file" on:change="{on_file_change}" />
<br />

{#if url}
    <a href="{url}" target="_blank" rel="noreferrer">Open</a>
{/if}
```

## API

### Arguments

| Name        | Description                            | Type                            | Required|
| ----------- | -------------------------------------- | --------------------------------| --------|
| **value**   | The value to create an object URL for. | `Blob` or `MediaSource`         | Yes     |
