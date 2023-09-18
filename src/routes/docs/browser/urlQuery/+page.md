---
title: Url Query
description: Reactive URL query string.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive URL query string.

## Usage

```svelte
<script>
    import { urlQuery } from "@sveu/browser"

    const query = urlQuery()
</script>
```

## Example

```svelte live ln
<script>
    import { urlQuery } from "@sveu/browser"


    const query = urlQuery("history", {
        fallback: { sveu: "awesome" },
    })

    $query.sveu = { is: { nice: "tool" } }
</script>

<pre class="mt-5">
{JSON.stringify($query, null, 4)}
</pre>

<div class="flex flex-col space-y-5 mt-20 items-center">
    <ul>
        <li>
            sveu={$query?.text ?? ""}
        </li>
    </ul>

    <div>
        <label for="sveu">Svelte-U is:</label>

        <input
            type="text"
            id="sveu"
            bind:value="{$query.text}"
            class="border rounded-xl border-4 p-3" />
    </div>
</div>
```

## API

### Arguments

| Name         | Description                              | Type                              | Required |
| ------------ | ---------------------------------------  | --------------------------------- | -------- |
| **mode**     | The mode to use for the URL query string | `history`, `hash` or `hash-query` | No       |

<br />
<br />

#### Mode

| Name         | Description                              | Example                            |
| ------------ | ---------------------------------------  | ---------------------------------- |
| **history**  | Used when **history mode router** is used  | `https://example.com/?sveu=awesome`|
| **hash**     | Used when **hash mode router** is used     | `https://example.com/#/your/route?sveu=awesome`|
| **hash-query**| Used when **history mode router** is used, but want to use hash as query string | `https://example.com/#sveu=awesome&sveu=cool`|

<br />
<br />

### Options

| Name              | Description                                                | Type      |
| ----------------- | -----------------------------------------------------------| --------- |
| **fallback**      | The fallback value for the URL query string                |  Dict     |
| **removeNullish** | Whether to remove nullish values from the URL query string |  boolean  |
| **removeFalsy**   | Whether to remove falsy values from the URL query string   |  boolean  |
| **write**         | Whether to write the URL query string to the URL           |  boolean  |
| **encode**        | Whether to encode the URL query string                     |  boolean  |
