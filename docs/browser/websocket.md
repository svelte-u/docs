---
title: WebSocket
description: Reactive WebSocket client.
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { websocket } from "@sveu/browser"

    const { data, send, status } = websocket("ws://localhost:8000")
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **url**         | The websocket url        | `string`                          | `true`   |

### 🙈 Options

| Name        | Description                          | Type                          | Default  |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **on_connected** | Callback when the websocket is connected. | `(ws: WebSocket) => void` | `undefined` |
| **on_disconnected** | Callback when the websocket is disconnected. | `(ws: WebSocket) => void` | `undefined` |
| **on_error** | Callback when the websocket encounters an error. | `(error: Event) => void` | `undefined` |
| **on_message** | Callback when the websocket receives a message. | `(message: MessageEvent) => void` | `undefined` |
| **immediate** | Whether to connect to the websocket immediately. | `boolean` | `true` |
| **auto_close** | Whether to close the websocket connection when the component is destroyed. | `boolean` | `true` |
| **protocols** | The protocols to use. | `string[]` | `[]` |
| **auto_reconnect** | Whether to reconnect to the websocket when the connection is lost. | `boolean | { delay: number, retries: number | (() => boolean), on_failed: Fn }` | `false` |
| **heartbeat** | Whether to send a heartbeat message to the websocket server. | `boolean | { message: string | ArrayBuffer | Blob, interval: number, pong_timeout: number }` | `false` |

### ↩️ Returns

| Name            | Description                                  | Type                         |
| --------------- | -------------------------------------------  | ---------------------------- |
| **data**        | The data received from the websocket server. | `Readable<T | null>`         |
| **status**      | The current websocket status.                | `Readable<"OPEN" | "CONNECTING" | "CLOSED">`  |
| **ws**         | Reference to the WebSocket instance.         | `Readable<WebSocket>`         |
| **close**      | Closes the websocket connection gracefully.  | `(code?: number | undefined, reason?: string | undefined) => void`  |
| **open**       | Reopen the websocket connection.             | `() => void`  |
| **send**       | Sends data through the websocket connection. | `(data: string | ArrayBuffer | Blob, buffer?: boolean | undefined) => boolean`  |


## 🧪 Playground

[Stackblitz](https://stackblitz.com/edit/github-8gcpfy?file=src%2Froutes%2Fbrowser%2Fwebsocket%2F%2Bpage.svelte)

## Source Code 👀

??? tip "Source Code"

    ```ts
    import {
        browser,
        intervalfn,
        is_ws,
        on_destroy,
        to_readable,
        to_writable,
        unstore,
    } from "@sveu/shared"
    import type { Fn } from "@sveu/shared"

    import { on } from "../event_listener"
    import type {
        WebSocketOptions,
        WebSocketReturn,
        WebSocketStatus,
    } from "../utils"

    const DEFAULT_PING_MESSAGE = "ping"

    function resolve_nested_options<T>(options: T | true): T {
        if (options === true) return {} as T
        return options
    }

    /**
     * Reactive WebSocket client.
     *
     * @param url - The websocket url.
     *
     * @param options - The websocket options.
     *
     * @returns
     * - `data`: The data received from the websocket server.
     * - `status`: The current websocket status, can be only one of: 'OPEN', 'CONNECTING', 'CLOSED'
     * - `ws`: Reference to the WebSocket instance.
     * - `close`: Closes the websocket connection gracefully.
     * - `open`: Reopen the websocket connection. If there the current one is active, will close it before opening a new one.
     * - `send`: Sends data through the websocket connection.
     */
    export function websocket<T>(
        url: string,
        options: WebSocketOptions = {}
    ): WebSocketReturn<T> {
        const {
            on_connected,
            on_disconnected,
            on_error,
            on_message,
            immediate = true,
            auto_close = true,
            protocols = [],
        } = options

        const data = to_writable<T | null>(null)

        const status = to_writable<WebSocketStatus>("CLOSED")

        const ws_store = to_writable<WebSocket | undefined>(undefined)

        let heartbeat_pause: Fn | undefined

        let heartbeat_resume: Fn | undefined

        let explicitly_closed = false

        let retried = 0

        let buffered_data: (string | ArrayBuffer | Blob)[] = []

        let pong_timeout_wait: ReturnType<typeof setTimeout> | undefined

        /**
         * Close the websocket connection.
         *
         * @param code - The code of the close event. Default to `1000`. see https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/code
         *
         * @param reason - The reason of the close event.
         *
         */
        function close(code = 1000, reason?: string) {
            if (!unstore(ws_store)) return

            explicitly_closed = true

            heartbeat_pause?.()

            unstore(ws_store)?.close(code, reason)
        }

        function _send_buffer() {
            if (
                buffered_data?.length &&
                unstore(ws_store) &&
                unstore(status) === "OPEN"
            ) {
                for (const buffer of buffered_data) unstore(ws_store)?.send(buffer)

                buffered_data = []
            }
        }

        function reset_heartbeat() {
            clearTimeout(pong_timeout_wait)
            pong_timeout_wait = undefined
        }

        /**
         * Send data to the websocket server.
         *
         * @param data - The data to send.
         *
         * @param buffer - Whether to buffer the data if the websocket is not connected. Default to `true`.
         *
         * @returns Whether the data is sent.
         */
        function send(data: string | ArrayBuffer | Blob, buffer = true) {
            if (!unstore(ws_store) || unstore(status) !== "OPEN") {
                if (buffer) buffered_data = [...buffered_data, data]
                return false
            }

            _send_buffer()

            unstore(ws_store)?.send(data)

            return true
        }

        function _init() {
            if (explicitly_closed) return

            const ws = new WebSocket(url, protocols)

            ws_store.set(ws)

            status.set("CONNECTING")

            ws.onopen = () => {
                status.set("OPEN")

                on_connected?.(ws)

                heartbeat_resume?.()

                _send_buffer()
            }

            ws.onclose = (event: CloseEvent) => {
                status.set("CLOSED")

                ws_store.set(undefined)

                on_disconnected?.(ws, event)

                if (!explicitly_closed && options.auto_reconnect) {
                    const {
                        retries = -1,
                        delay = 1,
                        on_failed,
                    } = resolve_nested_options(options.auto_reconnect)
                    retried += 1

                    if (
                        typeof retries === "number" &&
                        (retries < 0 || retried < retries)
                    )
                        setTimeout(_init, delay * 1000)
                    else if (typeof retries === "function" && retries())
                        setTimeout(_init, delay * 1000)
                    else on_failed?.()
                }
            }

            ws.onerror = (event) => {
                on_error?.(ws, event)
            }

            ws.onmessage = (event: MessageEvent<any>) => {
                if (options.heartbeat) {
                    reset_heartbeat()
                    const { message = DEFAULT_PING_MESSAGE } =
                        resolve_nested_options(options.heartbeat)
                    if (event.data === message) return
                }

                data.set(event.data)

                on_message?.(ws, event)
            }
        }

        if (options.heartbeat) {
            const {
                message = DEFAULT_PING_MESSAGE,
                interval = 1,
                pong_timeout = 1,
            } = resolve_nested_options(options.heartbeat)

            const { pause, resume } = intervalfn(
                () => {
                    send(message, false)
                    pong_timeout_wait = setTimeout(() => {
                        // auto-reconnect will be trigger with ws.onclose()
                        close()
                    }, pong_timeout * 1000)
                },
                interval,
                { immediate: false }
            )

            heartbeat_pause = pause

            heartbeat_resume = resume
        }

        if (immediate && is_ws) _init()

        if (auto_close) {
            if (browser) on(window, "beforeunload", () => close())

            on_destroy(close)
        }

        function open() {
            close()

            explicitly_closed = false

            retried = 0

            _init()
        }

        return {
            data: to_readable(data),
            status: to_readable(status),
            ws: to_readable(ws_store),
            close,
            send,
            open,
        }
    }
    ```
