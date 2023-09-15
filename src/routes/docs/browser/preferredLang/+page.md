---
title: Preferred Languages
description: Reactive Navigator Languages.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive Navigator Languages.

## Usage

```svelte
<script>
    import { preferredLang } from "@sveu/browser"

    const lang = preferredLang()
</script>
```

## Example

```svelte live ln
<script >
    import { preferredLang } from "@sveu/browser"

    const lang = preferredLang()
</script>

<h1 class="text-center">Lang: {$lang}</h1>
```
