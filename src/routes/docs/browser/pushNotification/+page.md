---
title: Push Notification
description: Push Notification API.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive [Push Notification API.](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)

## Usage

```svelte
<script>
    import { pushNotification } from "@sveu/browser"

    const { result, supported } = pushNotification("/sw.js", "vapid key")
</script>
```

## Example

```svelte live ln
<script>
    import { pushNotification } from "@sveu/browser"

    const { supported, result } = pushNotification(
        "/sw/web-push.js",
        "BJhRxOx05VZ7Yd9vmpvlibidolVdM-jjDJDDXSAZh8bTBcHLWJFT6dCwGViQ0SbnlDo-GGQoFuDKOuJvsieSs2Q",
    )

    let text = ""

    async function send() {
        text = "Close the Tab"

        const rep = await fetch("http://localhost:5173/api/push/web-push", {
            method: "POST",
            body: JSON.stringify({
                tokens: [$result],
                payload: {
                    title: "test",
                    body: "Hello from Svelte Utility",
                },
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const data = await rep.json()
        
        if(data.success) text = ""
    }
</script>

<div class="flex flex-col items-center justify-center">
    {#if $supported}
        <h3>Push Notification Key:</h3>
        <textarea class="h-60 w-60" value="{$result}"></textarea>

        {#if text}<p class="mt-15 text-center">{text}</p>{/if}

        <button
            class="mt-8 w-1/2"
            on:click="{send}">Send</button>
    {:else}
        <p>Not supported</p>
    {/if}
</div>
```

## API

### Arguments

| Name                  | Description                                 | Type                | Required |
| --------------------- | ------------------------------------------- | ------------------- | -------- |
| **swUrl**             | The service worker url                      | `string`            | Yes      |
| **vapid**             | The vapid key                               | `string`            | Yes      |

<br />
<br />

### Options

| Name          | Description                                                 | Type                  |
| ------------- | ----------------------------------------------------------- | --------------------- |
| **base64**    | Either to convert the push object into a base64 string.     | `boolean`             |
| **userVisibleOnly**| Either to start subscribing, when the user is visible. | `boolean`             |