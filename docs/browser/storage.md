---
title: Storage
description: Reactively stores data in the browser's storage
demo_link: https://stackblitz.com/edit/github-8gcpfy?file=src%2Froutes%2Fbrowser%2Fstorage%2F%2Bpage.svelte
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { storage } from "@sveu/browser"

    const state = storage("svelte-u", "awesome")
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name         | Description                              | Type                              | Required |
| ------------ | ---------------------------------------  | --------------------------------- | -------- |
| **key**      | The key to use for the storage           | `string`                          | Yes      |
| **fallback** | The fallback value for the storage       | `T`                               | No       |

### 🙈 Options

| Name              | Description                   | Type                             | Default        |
| ----------------- | ------------------------------| -------------------------------- | -------------- |
| **store**         | Where to store the data       | `local | session | cookie | url` | `local`        | 
| **sync**          | Whether to sync the data      | `boolean`                        | `true`         |
| **on_error**      | The function to call on error | `(error: Error) => void`         | `console.error`|
| **serializer**    | The serializer to use         | `StorageSerializer<T>`     | depends on `fallback` |

??? note

    1. ***sync*** is only available for `local`.

    2. ***serializer*** is only available for `local`, `session`, and `cookie`. If your using `url`, you can't customize the serializer b/c it's use **[url_query](/browser/url_query)** under the hood.

### ↩️ Returns

Watchable store

## 🧪 Playground

[StackBlitz]({{demo_link}})

!!! warning

    In the **StackBlitz** demo, the cookie example will not work b/c it's using a **subdomain**. **[You can test it out by running the demo locally.](https://github.com/svelte-u/playground)**

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { browser, noop, to_number, unstore, watchable } from "@sveu/shared"
    import type { Dict, Watchable } from "@sveu/shared"

    import { on } from "../event_listener"
    import { url_query } from "../url_query"
    import type { StorageOptions, StorageSerializer } from "../utils"

    const storage_serializers: Record<
        "boolean" | "object" | "number" | "any" | "string" | "map" | "set" | "date",
        StorageSerializer<any>
    > = {
        boolean: {
            read: (v: unknown) => v === "true",
            write: (v: unknown) => String(v),
        },
        object: {
            read: (v: string) => JSON.parse(v),
            write: (v: unknown) => JSON.stringify(v),
        },
        number: {
            read: (v: number | string) => to_number(v),
            write: (v: unknown) => String(v),
        },
        any: {
            read: (v: unknown) => v,
            write: (v: unknown) => String(v),
        },
        string: {
            read: (v: unknown) => v,
            write: (v: unknown) => String(v),
        },
        map: {
            read: (v: string) => new Map(JSON.parse(v)),
            write: (v: Map<unknown, unknown>) =>
                JSON.stringify(Array.from(v.entries())),
        },
        set: {
            read: (v: string) => new Set(JSON.parse(v)),
            write: (v: Set<unknown>) => JSON.stringify(Array.from(v)),
        },
        date: {
            read: (v: string | number | Date) => new Date(v),
            write: (v: Date) => v.toISOString(),
        },
    }

    /**
     * Guesses the type of the value
     *
     * @param value - The value to guess the type of
     *
     * @returns The type of the value
     */
    function guess_serializer_type(value: unknown) {
        return value == null
            ? "any"
            : value instanceof Set
            ? "set"
            : value instanceof Map
            ? "map"
            : value instanceof Date
            ? "date"
            : typeof value === "boolean"
            ? "boolean"
            : typeof value === "string"
            ? "string"
            : typeof value === "object"
            ? "object"
            : !Number.isNaN(value)
            ? "number"
            : "any"
    }

    /**
     * Gets the storage object
     *
     * @param store - The store to get
     *
     * @returns The storage object
     */
    function get_store(store: "local" | "session" | "cookie") {
        if (store === "session")
            return {
                set(key: string, value: string) {
                    sessionStorage.setItem(key, value)
                },
                get(key: string) {
                    return sessionStorage.getItem(key)
                },
                delete(key: string) {
                    sessionStorage.removeItem(key)
                },
            }

        if (store === "cookie")
            return {
                set(key: string, value: string) {
                    document.cookie = `${key}=${value};path=/;`
                },
                get(key: string) {
                    const cookies = document.cookie.split(";")

                    const cookie = cookies.find((cookie) => cookie.startsWith(key))

                    if (!cookie) return null

                    return cookie.split("=")[1]
                },
                delete(key: string) {
                    document.cookie = `${key}=; Max-Age=0; path=/;`
                },
            }
        return {
            set(key: string, value: string) {
                localStorage.setItem(key, value)
            },
            get(key: string) {
                return localStorage.getItem(key)
            },
            delete(key: string) {
                localStorage.removeItem(key)
            },
        }
    }

    /**
     * Reactively stores data in the browser's storage
     *
     * @param key - The key to store the data under
     *
     * @param fallback - The fallback value
     *
     * @param options - The options
     * - `store` - The store to use (local, session, cookie, url). Default: local
     * - `sync` - Whether to sync the data between tabs. Default: true
     * - `on_error` - The function to call when an error occurs. Default: console.error
     * - `serializer` - The serializer to use.
     *
     * @returns A watchable store
     *
     */
    export function storage<T>(
        key: string,
        fallback: T,
        options: StorageOptions<T> = {}
    ): Watchable<T> {
        const {
            store = "local",
            sync = true,
            on_error = (e) => {
                console.error(e)
            },
        } = options

        if (!browser) return watchable(fallback, noop)

        if (store === "url") {
            const _fallback = {} as Dict

            _fallback[key] = fallback

            const query = url_query("history", { fallback: _fallback })

            const data = watchable(fallback, (_, n) => {
                // @ts-expect-error It's fine
                if (!n) query.set("")
                else query.set({ [key]: n })
            })

            if (unstore(query)?.[key] !== undefined) {
                const item = unstore(query)[key]

                try {
                    if (typeof item === "string") data.set(JSON.parse(item))
                    else data.set(item)
                } catch {
                    data.set(item)
                }
            }

            return data
        }

        const type = guess_serializer_type(fallback)

        const serializer = options.serializer ?? storage_serializers[type]

        const data = watchable(fallback, (_, n) => write(n))

        const _store = get_store(store)

        update()

        /**
         * Reads the value from the store
         *
         * @returns The value
         */
        function read() {
            const value = _store.get(key)

            if (value === null) {
                if (fallback !== undefined && fallback !== null)
                    _store.set(key, serializer.write(fallback))

                return fallback
            } else if (typeof value !== "string") return value
            else return serializer.read(value)
        }

        /**
         * Writes the value to the store
         *
         * @param value - The value to write
         *
         * @returns The value
         */
        function write(value: unknown) {
            try {
                if (value === null) _store.delete(key)
                else {
                    const serialized = serializer.write(value)

                    const old_value = _store.get(key)

                    if (old_value !== serialized) _store?.set(key, serialized)
                }
            } catch (e) {
                on_error(e)
            }
        }

        /** Updates the value of the watchable store */
        function update() {
            data.pause()

            try {
                data.set(read())
            } catch (e) {
                on_error(e)
            } finally {
                data.resume()
            }
        }

        if (sync && store === "local") on(window, "storage", update)

        return data
    }
    ```
