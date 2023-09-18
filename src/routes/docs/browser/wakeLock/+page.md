---
title: Wake Lock
description: Reactive Screen Wake Lock API.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive Screen [Wake Lock API.](https://developer.mozilla.org/en-US/docs/Web/API/WakeLock)

## Usage

```svelte
<script>
    import { wakeLock } from "@sveu/browser"

    const { supported, active, request, release } = wakeLock()
</script>
```

## API

### Returns

| Name                 | Description                          | Type                            |
| -----------          | -------------------------------------| -----------------------------   |
| **supported**        | Is the Wake Lock API supported       | Readable<`boolean`>             |
| **active**           | Is the Wake Lock active              | Readable<`boolean`>             |
| **request**          | Request a Wake Lock                  | (type: WakeLockType) => void    |
| **release**          | Release the Wake Lock                | () => void                      |
