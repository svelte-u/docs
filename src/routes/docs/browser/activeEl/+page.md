---
title: Active Element
description: Reactive document.activeElement.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive document.activeElement.

## Usage

```svelte
<script>
    import { activeEl } from '@sveu/browser'

    const el = activeEl()
</script>
```

## Example

```svelte live ln
<script lang="ts">
    import { activeEl } from "@sveu/browser"

    const el = activeEl()

    $: key = $el?.dataset?.id || "null"
</script>

<note> Select the inputs below to see the changes </note>
<br />
<br />
<div>
    {#each [1, 2, 3, 4, 5, 6] as i}
        <input
            type="text"
            data-id="{i}"
            placeholder="{String(i)}" />
    {/each}
</div>

<div class="font-black">
    Current Active Element:
    <span >{key}</span>
</div>
```
