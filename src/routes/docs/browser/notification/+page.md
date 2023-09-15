---
title: Notification
description: Reactive notification API.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/notification)

## Usage

```svelte
<script>
    import { notification } from "@sveu/browser"

    const { supported, notify, show, close, onClick, onShow, onError, onClose } = notification()
</script>
```

## Example

```svelte live ln
<script>
    import { notification } from "@sveu/browser"

    const options = {
        title: "Hello World from Svelte Utility!",

        body: "This is a notification from Svelte Utility!",

        icon: "https://avatars.githubusercontent.com/u/120715197?s=200&v=4",

        dir: "auto",

        lang: "ar",

        renotify: true,

        tag: "test",

        requireInteraction: false,

        silent: false,
    }

    $: ({ supported, show, notify } = notification(options))
</script>

<h1>supported: {$supported}</h1>

<br />

<label for="title">Title</label>
<input
    type="text"
    bind:value="{options.title}"
    id="title"
    />

<br />

<label for="body">Body</label>
<input
    type="text"
    bind:value="{options.body}"
    id="body"
    />

<br />

<label for="icon">Icon</label>
<input
    type="text"
    bind:value="{options.icon}"
    id="icon"
    />

<br />

<label for="dir">Direction</label>

<select bind:value="{options.dir}" id="dir">
    <option value="auto">auto</option>
    <option value="ltr">ltr</option>
    <option value="rtl">rtl</option>
</select>

<br />

<label for="lang">Language</label>
<input
    type="text"
    bind:value="{options.lang}"
    id="lang"
    />

<br />

<label for="renotify">Renotify</label>
<input
    type="checkbox"
    bind:checked="{options.renotify}"
    id="renotify"
    />

<br />

<label for="tag">Tag</label>
<input
    type="text"
    bind:value="{options.tag}"
    id="tag"
    />

<br />

<label for="requireInteraction">Require Interaction</label>
<input
    type="checkbox"
    bind:checked="{options.requireInteraction}"
    id="requireInteraction"
    />

<br />

<label for="silent">Silent</label>
<input
    type="checkbox"
    bind:checked="{options.silent}"
    id="silent"
    />

<br />

<button
    on:click="{() => show()}">
    Show Notification
</button>
```

## API

### Options

[See Notification API](https://developer.mozilla.org/en-US/docs/Web/API/notification#instance_properties)

### Returns

| Name            | Description                                              | Type                     |
| --------------- | -------------------------------------------------------- | ------------------------ |
| **supported**   | Whether the browser supports the Notification API.       | Readable<`boolean`>      |
| **notify**      | The notification instance.                               | Readable<`Notification`> |
| **show**        | Show the notification.                                   | () => void               |
| **close**       | Close the notification.                                  | () => void               |
| **onClick**     | The click event.                                         | EventHookOn<`any`>       |
| **onShow**      | The show event.                                          | EventHookOn<`any`>       |
| **onError**     | The error event.                                         | EventHookOn<`any`>       |
| **onClose**     | The close event.                                         | EventHookOn<`any`>       |
