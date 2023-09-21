---
title: Storage
description: Reactively stores data in the browser's storage.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactively stores data in the browser's storage.

## Usage

```svelte
<script>
    import { storage } from "@sveu/browser"

    const state = storage("svelte-u is", "awesome")
</script>
```

## Example

<Tabs activeName="Default">

  <TabPanel name="Default">

```svelte live ln
<script>
    import { storage } from "@sveu/browser"

    const state = storage("svelte-u", "awesome")
</script>

<div class="flex flex-col space-y-5 mt-20 items-center">

    <div>
        <label for="sveu">Svelte-U is:</label>

        <input
            type="text"
            id="sveu"
            bind:value="{$state}"
             />
    </div>
    <button
        class="w-1/4"
        on:click="{() => ($state = null)}"
        >remove
    </button>
</div>
```

</TabPanel>

  <TabPanel name="With store">

```svelte live ln
<script>
    import { storage } from "@sveu/browser"

    const stores = [
        "local",
        "session",
        "url",
        "cookie",
    ]

    let selected = "local"

    $: state = storage("svelte-u", "awesome", { store: selected })


</script>

<div class="flex flex-col space-y-5 mt-20 items-center">

    <div>
        <select bind:value="{selected}">
            {#each stores as store}
                <option value="{store}">{store}</option>
            {/each}
        </select>

        <br/>

        <label for="sveu">Svelte-U is:</label>
        
        <input
            type="text"
            id="sveu"
            bind:value="{$state}"
             />
    </div>
    <button
        class="w-1/4"
        on:click="{() => ($state = null)}"
        >remove
    </button>
</div>
```

</TabPanel>

</Tabs>

## API

### Arguments

| Name         | Description                              | Type                              | Required |
| ------------ | ---------------------------------------  | --------------------------------- | -------- |
| **key**      | The key to store the data under          | `string`                          | Yes      |
| **fallback** | The fallback value                       | `T`                               | No       |

<br />
<br />

### Options

| Name          | Description                   | Type                          | Default               |
| ------------- | ------------------------------| ----------------------------- | --------------------- |
| **store**     | The store to use              | `(local, session, cookie, url`|**local**              |
| **sync**      | Whether to sync the data      | `boolean`                     | **true**              |
| **onError**   | The function to call on error | `(error: Error) => void`      |**console.error**      |
| **serializer**| The serializer to use         | StorageSerializer<`T`>        |depends on **fallback**|

<br/>
<br/>

:::tip
1. ***sync*** is only available for `local`.
2. ***serializer*** is only available for `local`, `session`, and `cookie`. If your using `url`, you can't customize the serializer b/c it's use **[urlQuery](/docs/browser/urlQuery)** under the hood.
:::
