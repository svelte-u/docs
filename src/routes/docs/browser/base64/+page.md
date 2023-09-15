---
title: Base64
description: Convert a value to a base64 string. 
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Convert a value to a base64 string.

## Usage

```svelte
<script>
    import { base64 } from "@sveu/browser"

    const result = base64("text")
</script>
```

## Example

```svelte live ln
<script lang="ts">
    import { base64 } from "@sveu/browser" // [svp! hl:1]

    let text = ""

    let file: File, image: HTMLImageElement

    $: text_result = base64(text) // [svp! hl:1]

    $: file_result = base64(file) // [svp! hl:1]

    $: image_result = base64(image) // [svp! hl:1]

    const buffer_result = base64(new ArrayBuffer(8)) // [svp! hl:1]

    function on_file_input(e: Event) {
        file = (e.target as HTMLInputElement).files![0]
    }
</script>

<div class="space-y-4 my-20 mx-10">
    <div class="grid gap-2 md:grid-cols-2">
        <div>
            <span>Text Input</span>
            <textarea
                bind:value="{text}"
                class="h-40"
                placeholder="Type something..."></textarea>
        </div>
        <div>
            <span>Base64</span>
            <textarea class="h-40" value="{$text_result}" readonly></textarea>
        </div>
    </div>

    <div class="grid gap-2 md:grid-cols-2">
        <div>
            <span>Buffer Input</span>
            <pre class="mt-2">new ArrayBuffer(1024)</pre>
        </div>
        <div>
            <span>Base64</span>
            <textarea class="h-40" value="{$buffer_result}" readonly></textarea>
        </div>
    </div>

    <div class="grid gap-2 md:grid-cols-2">
        <div>
            <span>File Input</span>
            <div>
                <input class="mt-2" type="file" on:input="{on_file_input}" />
            </div>
        </div>
        <div>
            <span>Base64</span>
            <textarea class="h-40" value="{$file_result}" readonly></textarea>
        </div>
    </div>

    <div class="grid gap-2 md:grid-cols-2">
        <div>
            <span>Image Input</span>
            <img
                bind:this="{image}"
                class="rounded  object-fill h-150 mt-2 w-full"
                src="https://avatars.githubusercontent.com/u/120715197?s=400&u=550f53b3615712b450969ba6d61f82f384c926d2&v=4"
                alt="Mila Kunis" />
        </div>
        <div>
            <span>Base64</span>
            <textarea class="h-40" value="{$image_result}" readonly></textarea>
        </div>
    </div>
</div>

<style>
    textarea {
        min-width: 0 !important;
        width: 100%;
    }
</style>
```

## API

### Arguments

| Name      | Description                          | Type                       | Required |
| --------- | ------------------------------------ | -------------------------- | -------- |
| **target** | The value to convert.               | `any`                      | Yes      |

<br/>
<br/>

### Options

| Nam           | Description                                                             | Type   |
| ------------- | ----------------------------------------------------------------------- | ------ |
| **serializer**| The serializer to use. Only used if the target is an object.|`(v: T) => string`  |
| **type**      | The MIME type to use. Only used if the target is a canvas or image.     |`string`|
| **quality**   | The image quality to use. Only used if the target is a canvas or image. |`number`|
