---
title: Worker
description: Simple Web Workers registration and communication.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Simple Web Workers registration and communication.

## Usage

```svelte
<script>
    import { worker } from "@sveu/browser"

    const { data, post, error, cleanup } = worker("/path/to/worker.js")
</script>
```

## Example

```svelte live ln
<script>
    import { worker } from "@sveu/browser"

    let value = "svelte"

    const { data, post, error, cleanup } = worker("/worker.js")

    $: console.log($error)
</script>

<div class="flex flex-col space-y-9 mx-9 mt-9 text-center">
    <h1>Data: {$data}</h1>
    <input
        type="text"
        id="message"
        bind:value="{value}" />

    <button on:click="{() => post(value)}">Send</button>
    <br />
    <button on:click="{() => cleanup()}">Stop</button>
</div>
```

## API

### Arguments

| Name       | Description                        | Type                    | Required                   |
| ---------- | ---------------------------------  | ----------------------- | -------------------------- |
| **url**    | Worker path url                    | `string`                | No(if worker is provided ) |
| **worker** | Worker function or Worker instance | `Worker` or `WorkerFn`  | No(if url is provided )    |

<br />
<br />

### Options

[See Worker Options](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker)

<br />
<br />

### Returns

| Name          | Description                                | Type                         |
| -----------   | -------------------------------------------| -----------------------------|
| **data**      | Data from the worker                       | Readable<`any`>              |
| **error**     | Error from the worker                      | Readable<`any`>              |
| **wk**        | Worker instance                            | Readable<`Worker`>           |
| **cleanup**   | Function to terminate the worker           |  () => void                  |
| **post**      | Function to send data to the worker        |  (message: any, transfer: Transferable[]): void or (message: any, options?: StructuredSerializeOptions): void |
