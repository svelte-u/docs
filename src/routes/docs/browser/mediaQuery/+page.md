---
title: Media Query
description: Reactive Media Query.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive Media Query.

## Usage

```svelte
<script>
    import {mediaQuery} from "@sveu/browser"

    const dark = mediaQuery("(prefers-color-scheme: dark)")

    const reduced = mediaQuery("(prefers-reduced-motion: reduce)")

    const more = mediaQuery("(prefers-contrast: more)")

    const less = mediaQuery("(prefers-contrast: less)")

    const custom = mediaQuery("(prefers-contrast: custom)")
</script>
```

## Example

```svelte live ln
<script lang="ts">
    import { mediaQuery } from "@sveu/browser"

    const dark = mediaQuery("(prefers-color-scheme: dark)")

    const reduced = mediaQuery("(prefers-reduced-motion: reduce)")

    const more = mediaQuery("(prefers-contrast: more)")

    const less = mediaQuery("(prefers-contrast: less)")

    const custom = mediaQuery("(prefers-contrast: custom)")

    let contrast = "no-preference"

    $: if ($more) contrast = "more"

    $: if ($less) contrast = "less"

    $: if ($custom) contrast = "custom"

    $: if (!$more && !$less && !$custom) contrast = "no-preference"
</script>

<div class="text-center">
    <h1>Prefers Dark: {$dark}</h1>

    <h1>Prefers Reduce Motion: {$reduced}</h1>

    <h1>Prefers Contrast: {contrast}</h1>
</div>
```

## API

### Arguments

| Name            | Description              | Type                | Required |
| --------------- | ------------------------ | ------------------- | -------- |
| **query**       | Media Query              | `string`            | Yes      |
