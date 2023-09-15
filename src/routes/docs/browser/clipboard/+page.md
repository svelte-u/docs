---
title: Clipboard
description: Reactive Clipboard.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive Clipboard.

## Usage

```svelte
<script>
    import {clipboard} from "@sveu/browser"

    const { supported, text, copied, copy } = clipboard()
</script>
```

## Example

<Tabs activeName="Default">

<TabPanel name="Default">

```svelte live ln
<script lang="ts">
    import { clipboard } from "@sveu/browser" // [svp! hl:1]

    let value = "Hello"

    const { text, supported, copy, copied } = clipboard() // [svp! hl:1]
</script>

{#if $supported}
    <div>
        <p>
            Current copied: <code>{$text || "none"}</code>
        </p>
        <input  bind:value="{value}" type="text" />
        <button on:click="{() => copy(value)}">
            {$copied ? "copied" : "copy"}
        </button>
    </div>
{/if}
```

</TabPanel>

<TabPanel name="With source">

```svelte live ln
<script lang="ts">
    import { clipboard } from "@sveu/browser" 

    let value = "Hello"

    $: ({ supported, copy, copied } = clipboard({ source: value })) // [svp! hl:1]
</script>

{#if $supported}
    <div>
        <p>
            Current copied: <code>{value || "none"}</code>
        </p>
        <input class="border border-3" bind:value="{value}" type="text" />
        <button on:click="{() => copy()}"> <!-- // [svp! hl:1] -->
            {$copied ? "copied" : "copy"}
        </button>
    </div>
{/if}
```

</TabPanel>

<TabPanel name="With copiedDuring">

```svelte live ln
<script lang="ts">
    import { clipboard } from "@sveu/browser"

    let value = "Hello"

    const { text, supported, copy, copied } = clipboard({copiedDuring: 3}) // [svp! hl:1]
</script>

{#if $supported}
    <div>
        <p>
            Current copied: <code>{$text || "none"}</code>
        </p>
        <input  bind:value="{value}" type="text" />
        <button on:click="{() => copy(value)}">
            {$copied ? "copied" : "copy"}
        </button>
    </div>
{/if}
```

</TabPanel>

<TabPanel name="With legacy">

```svelte live ln
<script lang="ts">
    import { clipboard } from "@sveu/browser"

    let value = "Hello"

    const { text, supported, copy, copied } = clipboard({legacy: true}) // [svp! hl:1]
</script>

{#if $supported}
    <div>
        <p>
            Current copied: <code>{$text || "none"}</code>
        </p>
        <input  bind:value="{value}" type="text" />
        <button on:click="{() => copy(value)}">
            {$copied ? "copied" : "copy"}
        </button>
    </div>
{/if}
```

</TabPanel>

<TabPanel name="With read">

```svelte live ln
<script lang="ts">
    import { clipboard } from "@sveu/browser"

    let value = "Hello"

    const { text, supported } = clipboard({read: true}) // [svp! hl:1]
</script>

{#if $supported}
    <div>
        <h1>Try to copy something in this page</h1>
        <p>
            Current copied: <code>{$text || "none"}</code>
        </p>
    </div>
{/if}
```

</TabPanel>

</Tabs>

## API

### Options

| Name             | Description                               | Type                       | Default    |
| ---------------- | ----------------------------------------- | ---------------------------| ---------- |
| **read**         | Enabled reading for clipboard.            | `boolean`                  | false      |
| **source**       | Copy from source.                         | `Source`                   | undefined  |
| **copiedDuring** | Seconds to reset state of `copied`.       | `number`                   | 1.5        |
| **legacy**       | Use legacy clipboard API                  | `boolean`                  | false      |

<br/>
<br/>

### Returns

| Name        | Description                                  | Type                               |
| ----------- | -------------------------------------------- | -----------------------------      |
| **supported** | Is the browser support Clipboard API.      | Readable<`boolean`>                |
| **text**      | The text in the clipboard.                 | Readable<`string`>                 |
| **copied**    | Whether the text is copied.                | Readable<`boolean`>                |
| **copy**      | Copy text to clipboard                     | (text: string) => Promise<`void`>  |
