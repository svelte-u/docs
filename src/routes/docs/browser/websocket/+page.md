---
title: WebSocket
description: Reactive WebSocket client.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive WebSocket client.

## Usage

```svelte
<script>
    import { websocket } from "@sveu/browser"

    const { data, send, status } = websocket("ws://localhost:8000")
</script>
```

## Example

```svelte live ln
<script>
    import {websocket} from "@sveu/browser"

    const {data} = websocket("wss://echo-websocket.hoppscotch.io")
</script>

<h1>{$data}</h1>
```

## API

### Arguments

| Name            | Description              | Type                | Required |
| --------------- | ------------------------ | ------------------- | -------- |
| **url**         | The websocket url        | `string`            | Yes      |

<br />
<br />

### Options

| Name          | Description                                                  | Type                    |
| ------------- | ------------------------------------------------------------ | ----------------------- |
| **onConnected** | The callback to be called when the websocket is connected. | () => void              |
| **onDisconnected** | The callback to be called when the websocket is disconnected. | () => void              |
| **onError**  | The callback to be called when the websocket has an error.   | (error: unknown) => void |
| **onMessage** | The callback to be called when the websocket receives a message. | (message: unknown) => void |
| **immediate** | Whether to connect to the websocket immediately. | `boolean`               |
| **autoClose** | Whether to close the websocket connection when the websocket is disconnected. | `boolean`               |
| **protocols** | The protocols to be used for the websocket connection. | `string[]`              |
| **heartbeat** | The heartbeat options.                     | `boolean`               |
| **heartbeat.message** | The message to be sent to the server for the heartbeat. | `string`                |
| **heartbeat.interval** | The interval in second to send the heartbeat message. | `number`                |
| **heartbeat.timeout** | The timeout in second to wait for the pong message. | `number`                |
| **autoReconnect** | Whether to automatically reconnect to the websocket server when the connection is closed. | `boolean`               |
| **autoReconnect.retries** | The number of retries to reconnect to the websocket server. | `number`                |
| **autoReconnect.delay** | The delay in second before reconnecting to the websocket server. | `number`                |
| **autoReconnect.onFailed** | The callback to be called On maximum retry times reached.   | () => void              |

<br />
<br />

### Returns


| Name          | Description                                | Type                         |
| -----------   | -------------------------------------------| -----------------------------|
| **data**      | The data received from the websocket server. | Readable<`any`>                    |
| **status**    | The current websocket status.               | Readable<`WebSocketStatus`>            |
| **ws**        | WebSocket instance.                         | Readable<`WebSocket`>                  |
| **close**     | Closes the websocket connection gracefully. | (code?: number, reason?: string) => void                   |
| **open**      | Reopen the websocket connection. If there the current one is active, will close it before opening a new one. | () => void                   |
| **send**      | Sends data through the websocket connection. | (data: string, ArrayBuffer or Blob, buffer?: boolean) => boolean      |
