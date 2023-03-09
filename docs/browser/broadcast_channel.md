---
title: Broadcast Channel
description: Reactive Broadcast Channel. 
demo_link: https://svelte.dev/repl/839a0d215a45493daec15db5421c1e3c?version=3.53.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {broadcast_channel} from "@sveu/browser"

    const {data, post, error} = broadcast_channel()


    $: if ($data) alert($data)

    let value = "HI"
</script>

<h1>Open new Tab, and start a broadcast :)</h1>
<input type="text" bind:value />

<button on:click="{() => post(value)}">Post</button>
```

## 👩‍💻API

### 🙈 Options

| Name        | Description                          | Type                          | Default  |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **name**    | The name of the broadcast channel    | `string`                      | `default`|

### ↩️ Returns

| Name        | Description                                    | Type                          |
| ----------- | -----------------------------------------------| ----------------------------- |
| **supported**| Is the browser support broadcast channel      | `Readable<boolean>`           |
| **closed**   | Is the broadcast channel closed               | `Readable<boolean>`           |
| **data**     | The data from the broadcast channel           | `Readable<unknown>`           |
| **error**    | The error from the broadcast channel          | `Readable<Event | null>`      |
| **close**    | Close the broadcast channel                   | `() => void`                  |
| **post**     | Send data to the broadcast channel            | `(data: unknown) => void`     |
| **channel**  | The broadcast channel                         | `Readable<BroadcastChannel | undefined>`|

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>


## Source Code 👀

??? tip "Source Code"

    ```ts
    import {
        browser,
        on_destroy,
        to_readable,
        to_writable,
        unstore,
    } from "@sveu/shared"

    import { on } from "../event_listener"
    import { support } from "../support"
    import type { BroadcastChannelOptions } from "../utils"

    /**
     * Reactive BroadcastChannel
     *
     * @param options - The options for the BroadcastChannel.
     * - `name` - The name of the channel. default: `default`
     *
     * @returns
     * - `supported` - Is the BroadcastChannel supported.
     * - `channel` - The BroadcastChannel instance.
     * - `data` - The data from the channel.
     * - `post` - Send data to the channel.
     * - `close` - Close the channel.
     * - `error` - The error from the channel.
     * - `closed` - Is the channel closed.
     */
    export function broadcast_channel(options: BroadcastChannelOptions = {}) {
        const { name = "default" } = options

        const supported = support("BroadcastChannel", "window")

        const closed = to_writable(false)

        const channel = to_writable<BroadcastChannel | undefined>(undefined)

        const data = to_writable<unknown>(undefined)

        const error = to_writable<Event | null>(null)

        /**
         * Send data to the channel.
         *
         * @param data - The data to send to the channel.
         */
        function post(data: unknown) {
            unstore(channel)?.postMessage(data)
        }

        /** Close the channel. */
        function close() {
            unstore(channel)?.close()
            closed.set(true)
        }

        if (unstore(supported) && browser) {
            error.set(null)

            channel.set(new BroadcastChannel(name))

            on(
                unstore(channel),
                "message",
                (event: MessageEvent) => {
                    data.set(event.data)
                },
                { passive: true }
            )

            on(
                unstore(channel),
                "messageerror",
                (event: Event) => {
                    error.set(event)
                },
                { passive: true }
            )

            on(
                unstore(channel),
                "close",
                () => {
                    closed.set(true)
                },
                { passive: true }
            )
        }

        on_destroy(close)

        return {
            channel: to_readable(channel),
            closed: to_readable(closed),
            data: to_readable(data),
            error: to_readable(error),
            supported,
            close,
            post,
        }
    }
    ```
