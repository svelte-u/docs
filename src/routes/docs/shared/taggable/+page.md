---
title: Taggable
description: A boolean switcher.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

A boolean switcher.

## Usage

```svelte
<script>
    import { taggable } from "@sveu/shared"

    const { toggled, toggle } = taggable()
</script>

<div>
<h1>{$toggled ? "On" : "Off"}</h1>

<button
    on:click="{() => toggle()}">Toggle</button>
</div>
```

## Example

```svelte live ln
<script>
    import { taggable } from "@sveu/shared"

    const { toggled, toggle } = taggable()
</script>

<div class="flex flex-col space-y-3 mx-20 mt-20 text-center">
    <h1>{$toggled ? "On" : "Off"}</h1>

    <button
        on:click="{toggle}"
        >Toggle</button>
</div>
```

## API

### Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **value**           | Initial value                                | MaybeStore<`boolean`> | No       |

<br />
<br />

### Returns

| Name                | Description                                          |
| ------------------- | ---------------------------------------------------- |
| **toggle, toggled** | Toggle function and toggled value                   |
| **toggled**         | If the value is **writable store** to will return a function to update the value of the store |
