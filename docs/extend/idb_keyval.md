---
title: IDB Keyval
description: Wrapper for idb-keyval.
---

# {{title}}

Wrapper for [idb-keyval](https://github.com/jakearchibald/idb-keyval).

## ⚡️ Prerequisites

- [x] Install the ***idb-keyval*** package:

<div class="termy">

```console
$ pnpm add idb-keyval

---> 100%
```

</div>

## 🎬 Usage

```html
<script>
    import {idb} from "@sveu/extend/idb_keyval"

    const dark_mode = idb("dark_mode", false)
    
</script>

<button on:click="{() => $dark_mode = !$dark_mode}">
    Toggle dark mode
</button>
```

## 👩‍💻API

### 👻 Arguments

| Name           | Description                          | Type                     | Required |
| -------------- | ------------------------------------ | -------------------------| -------- |
| **key**        | The key to store the value under.    | **string**               | `Yes`    |
| **value**      | The value to store. If store have already been initialized, this value will be ignored.| **any**                  | `No`    |

### 🙈 Options

| Name        | Description                          | Type                          | Default  |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **on_error**| The function to call when an error occurs. | `(error: unknown) => void`| `console.error` |

### ↩️ Returns

A PartialWritable from [Watchable function](/shared/watchable/).

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { browser, type, watchable } from "@sveu/shared"

    import { del, get, set, update } from "idb-keyval"

    export interface IDBOptions {
        /**
         * On error callback
         *
         * Default log error to `console.error`
         */
        on_error?: (error: unknown) => void
    }

    /**
     * Wrapper around idb-keyval.
     *
     * @param key - The key to store the value under.
     *
     * @param value - The value to store. If store have already been initialized, this value will be ignored.
     *
     * @param options - Options
     * - on_error - On error callback
     *
     * @returns A store of the value.
     */
    export function idb(key: string, value?: any, options: IDBOptions = {}) {
        const {
            on_error = (e) => {
                console.error(e)
            },
        } = options

        const data = watchable(value, async (_, n) => await write(n))

        async function read() {
            try {
                const _value = await get(key)

                if (_value === undefined) {
                    if (value !== undefined && value !== null) await set(key, value)
                } else data.set(_value)
            } catch (e) {
                on_error(e)
            }
        }

        if (browser) read()

        async function write(new_data: any) {
            try {
                if (new_data === null) {
                    await del(key)
                } else {
                    if (type(new_data) === "array")
                        await update(key, () =>
                            JSON.parse(JSON.stringify(new_data))
                        )
                    else if (type(new_data) === "object")
                        await update(key, () => ({ ...new_data }))
                    else await update(key, () => new_data)
                }
            } catch (e) {
                on_error(e)
            }
        }
        return data
    }
    ```
