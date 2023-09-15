---
title: Broadcast Channel
description: Reactive Broadcast Channel.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive Broadcast Channel.

## Usage

```svelte
<script>
    import {broadcastChannel} from "@sveu/browser"
    
    const { supported, channel, data, post, close, error, closed } = broadcastChannel()
</script>
```

## Example

<Tabs activeName="Chat">

<TabPanel name="Chat">

```svelte live ln
<script>
    import { broadcastChannel } from "@sveu/browser" // [svp! hl:1]

    let value = "HI"

    const { data, post, error } = broadcastChannel() // [svp! hl:1]

    $: if ($data) alert($data)

    $: if ($error) console.log($error)
</script>

<h1>Open new Tab, and start a broadcast :)</h1>

<input type="text" bind:value="{value}" />

<button on:click="{() => post(value)}">Post</button>
```

</TabPanel>

<TabPanel name="Theme Sync">

```svelte live ln
<script>
    import { broadcastChannel } from "@sveu/browser" // [svp! hl:1]

    let dark = false

    const { data, post, error } = broadcastChannel({ // [svp! hl:3]
       name: "svelte-u-channel",
    }) 

    function theme_toggle(value) {
        if(value) document.documentElement.classList.add("dark")

        else document.documentElement.classList.remove("dark")
    }

    $: if ($data !== undefined) dark = $data ?? false
    
    $: dark, theme_toggle(dark)

    $: if ($error) console.log($error)
</script>

<h1>Open new Tab, and start a broadcast :)</h1>

<button on:click="{() => post(dark = !dark)}">Toggle Theme</button>
```

</TabPanel>

</Tabs>

## API

### Options

| Name        | Description                          | Type                          | Default  |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **name**    | The name of the broadcast channel    | `string`                      | default  |

<br/>
<br/>

### Returns

| Name          | Description                                | Type                                     |
| ------------- | -------------------------------------------| ---------------------------------------- |
| **supported** | Is the BroadcastChannel supported.         | Readable<`boolean`>                      |
| **channel**   | The BroadcastChannel instance.             | Readable<`BroadcastChannel`>             |
| **data**      | The data from the channel.                 | Readable<`unknown`>                      |
| **post**      | Send data to the channel.                  | (data: unknown) => void                  |
| **close**     | Close the channel.                         | () => void                               |
| **error**     | The error from the channel.                | Readable<`Event`>                        |
| **closed**    | Is the channel closed.                     | Readable<`boolean`>                      |
