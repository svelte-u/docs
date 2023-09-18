---
title: Image
description: Reactive load an image in the browser.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive load an image in the browser.

## Usage

```svelte
<script>
    import { image } from "@sveu/browser"

    const { loading } = image({
        src: "img-url",
    })
</script>
```

## Example

```svelte live ln
<script>
    import { image } from "@sveu/browser"
    import { browser } from "@sveu/shared"

    const src =
        "https://i.ibb.co/JjL8tSt/final-fantasy-xiii-2-lightning-2560x1440.jpg"

    const { loading } = image({
        src,
    })
</script>

<div class="grid place-items-center">
    {#if !$loading}
        <img
            src="{src}"
            alt="FF XIII-2 Lightning"
            loading="lazy"
            class="rounded-2xl h-66.25 w-90" />
    {:else if !browser}
        <!-- fallback if js is disabled -->
        <img
            src="{src}"
            alt="FF XIII-2 Lightning"
            loading="lazy"
            class="rounded-2xl h-66.25 w-90" />
    {:else}
        <div style="background-color: #f1c91a" class="rounded-2xl h-66.25 w-90">
        </div>
    {/if}
</div>
```

## API

### Arguments

| Name                  | Description                                 | Type                | Required |
| --------------------- | ------------------------------------------- | ------------------- | -------- |
| **options**           | [Read options](#Options)                    | `ImageOptions`      | Yes      |
| **asyncStateOptions** | [Read options](/docs/shared/asyncState#Options) | `AsyncStateOptions` | No       |

<br />
<br />

### Options

| Name          | Description                                  | Type                                 |
| ------------- | -------------------------------------------- | ------------------------------------ |
| **src**       | Address of the resource                      | `string`                             |
| **srcset**    | Images to use in different situations        | `string`                             |
| **sizes**     | Image sizes for different page layouts       | `string`                             |
| **alt**       | Image alternative information                | `string`                             |
| **class**     | Image classes                                | `string`                             |
| **loading**   | Image loading                                | `HTMLImageElement["loading"]`        |
| **crossOrigin** | Image CORS settings                          | `string`                             |
| **referrerPolicy** | [Referrer policy for fetch](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) | `HTMLImageElement["referrerPolicy"]` |
