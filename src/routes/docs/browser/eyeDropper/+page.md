---
title: Eye Dropper
description: Reactive EyeDropper API.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API).

## Usage

```svelte
<script>
    import { eyeDropper } from "@sveu/browser"

    const { supported, result, open } = eyeDropper()
</script>
```

## Example

```svelte live ln
<script>
    import { eyeDropper } from "@sveu/browser"

    const { supported, open, result } = eyeDropper()
</script>

<div >
    {#if $supported}
        <div>
            Supported: {$supported}
        </div>

        <div>
            result: <span style="color: {$result?.replace(', 0)', ', 1)')}"
                >{$result}</span>
        </div>

        <button
            disabled="{!$supported}"
            on:click="{() => open()}"
            style="background: {$result?.replace(', 0)', ', 1)')}">
            Open Eye Dropper
        </button>
    {:else}
        <span>Not Supported by Your Browser</span>
    {/if}
</div>
```

## API

### Options

[Read more in the MDN](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API)

<br/>
<br/>

### Returns

| Name         | Description                                     | Type                               |
| ------------ | ----------------------------------------------- | -----------------------------      |
| **supported**| Whether the browser supports the EyeDropper API | Readable<`boolean`>                |
| **result**   |  The sRGBHex of the selected color              | Readable<`string`>                 |
| **open**     |  Open the eye dropper                           |(openOptions?: EyeDropperOpenOptions) => Promise |
