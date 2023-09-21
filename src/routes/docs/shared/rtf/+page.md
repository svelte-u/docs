---
title: RTF
description: Relative Time Format.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Formats a date to a relative time string.

## Usage

```svelte
<script>
    import {rtf} from "@sveu/shared"

    const time = rtf(Date.now())

</script>

<h1>{$time}</h1>
```

## Example

```svelte live ln
<script lang="ts">
    import { rtf } from "@sveu/shared"

    const options = {
        locale: "ar",
        style: "long", // other values: "short" or "narrow"
        numeric: "auto", // other values: "always"
    }

    $: time = rtf(+Date.now() - 1000 * 60 * 5, options)
</script>

<h1>{$time}</h1>

<label for="locale">Locale</label>
<select id="locale" bind:value="{options.locale}">
    <option value="ar">عربي</option>
    <option value="en">English</option>
    <option value="es">Español</option>
    <option value="de">Deutsch</option>
    <option value="zh">中文</option>
    <option value="ja">日本語</option>
    <option value="fr">français</option>
    <option value="hi">हिंदी</option>
    <option value="ko">한국어/韓國語</option>
    <option value="am">हአማርኛ</option>
</select>

<label for="style">Style</label>
<select id="style" bind:value="{options.style}">
    <option value="long">Long</option>
    <option value="short">Short</option>
    <option value="narrow">Narrow</option>
</select>

<label for="numeric">Numeric</label>
<select id="numeric" bind:value="{options.numeric}">
    <option value="always">Always</option>
    <option value="auto">Auto</option>
</select>
```

## API

### Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **date**            | Date to format                               | `Date` or `Number`    | Yes      |

<br />
<br />

### Options

| Name                | Description                                          | Type        | Default     |
| ------------------- | ---------------------------------------------------- | ----------- | ----------- |
| **locale**          | Locale to use                                        | `string`    | `en`        |
| **style**           | The length of the internationalized message          | `string`    | `long`      |
| **numeric**         | The numeric representation of the relative time      | `string`    | `auto`      |
