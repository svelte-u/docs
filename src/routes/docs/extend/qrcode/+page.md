---
title: QR Code
description: Wrapper for qrcode. 
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Wrapper for [qrcode](https://github.com/soldair/node-qrcode).

## ⚡️ Prerequisites

@install-pkg(qrcode)

## Usage

```svelte
<script>
    import {qrcode} from "@sveu/extend/qrcode"

    const {output, pending, error} = qrcode("Hello")
</script>
```

## Example

```svelte live ln
<script>
    import { qrcode } from "@sveu/extend/qrcode" // [svp! hl:1]

    let value = "world"

    $: ({ output, pending, error } = qrcode(value)) // [svp! hl:1]
</script>

<div class="grid place-items-center">
    {#if $pending}
        <p>Pending.........</p>
    {:else}
        <img src="{$output}" alt="qrcode" />

        <br />

        {#if $error}
            <p class="text-red-500">{$error}</p>
        {/if}

        <br />
    {/if}
    <input class="border border-4" bind:value="{value}" />
</div>
```

## API

### Arguments

| Name      | Description                          | Type                       | Required |
| --------- | ------------------------------------ | -------------------------- | -------- |
| **text**  | The text to encode                   | `string`                   | Yes      |

<br/>
<br/>

### Options

Read the [qrcode documentation](https://github.com/soldair/node-qrcode#options-9)
