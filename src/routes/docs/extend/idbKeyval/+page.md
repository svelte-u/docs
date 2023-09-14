---
title: IDB Keyval
description: Wrapper for idb-keyval.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Wrapper for [idb-keyval](https://github.com/jakearchibald/idb-keyval).

## ⚡️ Prerequisites

@install-pkg(idb-keyval)

## Usage

```svelte
<script>
    import { idb } from "@sveu/extend/idbKeyval"

    const dark_mode = idb("dark_mode", false)

</script>

<button on:click="{() => $dark_mode = !$dark_mode}">
    Toggle dark mode
</button>
```

## Example

```svelte live ln
<script>
    import { idb } from "@sveu/extend/idbKeyval" // [svp! hl:1]

    import { browser } from "@sveu/shared"

    const dark = idb("dark", false) // [svp! hl:1]
    
    function theme_toggle() {
        if(browser){

            if($dark) document.documentElement.classList.add("dark")
            else document.documentElement.classList.remove("dark")
        }
    }

    $: $dark, theme_toggle()
</script>

<h1>Is Dark mode: {$dark}</h1>

<button on:click="{() => $dark = !$dark}">
    Toggle dark mode
</button>
```

## API

### Arguments

| Name      | Description                          | Type                       | Required |
| --------- | ------------------------------------ | -------------------------- | -------- |
| **key**   | The key to store the value under.    | `string`                   | Yes      |
| **value** | The value to store. If store have already been initialized, this value will be ignored. | `any` | No      |

<br/>
<br/>

### Options

| Name         | Description                                | Type                     | Default        |
| ------------ | -------------------------------------------| ------------------------ | -------------- |
| **onError**  | The function to call when an error occurs. | (error: unknown) => void | `console.error`|
