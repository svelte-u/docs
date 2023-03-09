---
title: Worker
description: Simple Web Workers registration and communication.
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { worker } from "@sveu/browser"

    const { data, post, error, cleanup } = worker("/path/to/worker.js")
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **url**         | Worker path url          | `string`                          | No       |
| **worker**      | Worker function or Worker instance | `Worker | WorkerFn`     | No       |

### 🙈 Options

[See Worker Options](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker)

### ↩️ Returns

| Name        | Description                          | Type                                  |
| ----------- | ------------------------------------ | ------------------------------------- |
| **data**    | The data from the worker             | `Readable<any>`                       |
| **error**   | The error from the worker            | `Readable<any>`                       |
| **wk**      | The worker instance                  | `Readable<Worker>`                    |
| **post**     | Function to send data to the worker | `{(message: any, transfer: Transferable[]): void;(message: any, options?: StructuredSerializeOptions | undefined): void;}`                    |
| **cleanup**  | Function to terminate the worker     | `() => void                          |

## 🧪 Playground

[StackBlitz](https://stackblitz.com/edit/github-8gcpfy?file=src%2Froutes%2Fbrowser%2Fworker%2Feg1.svelte)

## Source Code 👀

??? tip "Source Code"

    ```ts
    import {
        browser,
        noop,
        on_destroy,
        to_readable,
        to_writable,
        unstore,
    } from "@sveu/shared"

    import { WebWorkerReturn, WorkerFn } from "../utils"

    /**
     * Simple Web Workers registration and communication.
     *
     * @param url - URL of the worker
     *
     * @param options - [WorkerOptions](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker)
     *
     * @returns
     * - `data` - Readable store with the data from the worker
     * - `error` - Readable store with the error from the worker
     * - `wk` - Readable store with the worker instance
     * - `post` - Function to send data to the worker
     * - `cleanup` - Function to terminate the worker
     */
    export function worker<T>(
        url: string,
        options?: WorkerOptions
    ): WebWorkerReturn<T>
    /**
     * Simple Web Workers registration and communication.
     *
     * @param worker - Worker function or Worker instance
     *
     * @returns
     * - `data` - Readable store with the data from the worker
     * - `error` - Readable store with the error from the worker
     * - `wk` - Readable store with the worker instance
     * - `post` - Function to send data to the worker
     * - `cleanup` - Function to terminate the worker
     */
    export function worker<T>(worker: Worker | WorkerFn): WebWorkerReturn<T>
    export function worker<T>(
        arg0: string | WorkerFn | Worker,
        options?: WorkerOptions
    ): WebWorkerReturn<T> {
        let unsubscribe: () => void = noop

        const data = to_writable<any>(null)

        const error = to_writable<any>(null)

        const wk = to_writable<Worker | undefined>(undefined)

        if (browser) {
            if (typeof arg0 === "string") wk.set(new Worker(arg0, options))
            else if (typeof arg0 === "function") wk.set(arg0())
            else wk.set(arg0)

            unsubscribe = wk.subscribe((_worker) => {
                if (!_worker) return

                _worker.onmessage = (e: MessageEvent) => {
                    data.set(e.data)
                }

                _worker.onerror = (e: ErrorEvent) => {
                    error.set(e.error)
                }
            })
        }

        function post(value: T) {
            const _wk = unstore(wk)

            if (!_wk) return

            _wk.postMessage(value)
        }

        function cleanup() {
            unstore(wk)?.terminate()

            unsubscribe()
        }

        on_destroy(cleanup)

        return {
            data: to_readable(data),
            error: to_readable(error),
            wk: to_readable(wk),
            post,
            cleanup,
        }
    }
    ```
