---
title: Try it
description: Convert a function to an error-first async function.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Convert a function to an error-first async function.

## Usage

```svelte
<script>
    import {tryit} from "@sveu/shared"

    function add(a, b) {
        return a + b
    }

    const add_async = tryit(add)
    
    const {result, error} = await add_async(1, 2)
</script>
```

## Example

```svelte live ln
<script>
    import { tryit } from "@sveu/shared"
    let result, error

    function add(a, b) {
        throw Error("You can't add number here")
        return a + b
    }

    const add_async = tryit(add)

    async function run() {
        const data = await add_async(1, 2)
        result = data?.result ?? undefined
        error = data.error?.message
    }

    run()
</script>

{#if result}{result}{/if}
{#if error}{error}{/if}
```

## API

### Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **fn**              | Function to convert                  | `(...args: any[]) => any`     | Yes      |

<br />
<br />

### Returns

| Name                | Description                          | Type                          |
| ------------------- | ------------------------------------ | ----------------------------- |
| **result**          | Result of the function               | `any`                         |
| **error**           | Error thrown by the function         | `Error`                       |
