---
title: Slug
description: Returns a random slug.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Returns a random slug.

## Usage

```svelte
<script>
    import {slug} from "@sveu/shared"
</script>
{slug()}
```

## Example

```svelte live ln
<script lang="ts">
    import { slug } from "@sveu/shared"

    const options = {
        lower: true,

        upper: true,

        digits: true,

        size: 6,

        prefix: "",
    }

    $: slugify = slug(options)
</script>

<h1>{slugify}</h1>

<hr />

<label for="lower">Lower Case</label>
<input id="lower" type="checkbox" bind:checked="{options.lower}" />
<hr />

<label for="upper">Upper Case</label>
<input id="upper" type="checkbox" bind:checked="{options.upper}" />
<hr />

<label for="digits">Digits</label>
<input id="digits" type="checkbox" bind:checked="{options.digits}" />
<hr />

<label for="size">Size</label>
<input id="size" type="text" bind:value="{options.size}" />
<hr />

<label for="prefix">Prefix</label>
<input id="prefix" type="text" bind:value="{options.prefix}" />
<hr />
```

## API

### Options

| Name                | Description                          | Type                          | Default  |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **lower**           | Use lower letters.                   | `boolean`                     | True     |
| **upper**           | Use uppercase letters.               | `boolean`                     | True     |
| **digits**          | Use digits.                          | `boolean`                     | True     |
| **size**            | Size of the slug.                    | `number`                      | 6        |
| **prefix**          | Text to use as a prefix.             | `string`                      |          |
