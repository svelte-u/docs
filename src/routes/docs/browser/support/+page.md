---
title: Support
description: Check if a feature is supported in the current browser.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Check if a feature is supported in the current browser.

## Usage

```svelte
<script>
    import {support} from "@sveu/browser"

    const supported = support("clipboard")
</script>
```

## Example

```svelte live ln
<script>
    import { support } from "@sveu/browser"


    const supported = support("memory", "performance")
</script>

<h1 class="text-center">Supported: {$supported}</h1>
```

## API

### Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **feature**     | The feature to check for.| `string`                          | Yes      |
| **from**        | The object to check for the feature in. | `navigator`, `window`, `document` or `performance` | No |
