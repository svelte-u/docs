---
title: Fuse
description: Wrapper for fuse.js.
demo_link: https://svelte.dev/repl/f9b637076c344f06adebcd548004bb4a?version=3.55.1
---

# {{title}}

Wrapper for [fuse.js](https://github.com/krisk/Fuse).

## ⚡️ Prerequisites

- [x] Install the ***fuse.js*** package:

<div class="termy">

```console
$ pnpm add fuse.js

---> 100%
```

</div>

## 🎬 Usage

```html
<script>
    import {fuse} from "@sveu/extend/fuse"

    const data = [
        {name: "John", age: 20},
        {name: "Jane", age: 21},
        {name: "Jack", age: 22},
    ]

    const {results} = fuse("John", data, {
        fuse_options: {
            keys: ["name"]
        }
    })
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name        | Description                          | Type                          | Required |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **search**  | The text to search.                  | `string`                      | `Yes`    |
| **data**    | The data to search in.               | `T[]`                         | `Yes`    |

### 🙈 Options

| Name                | Description                                          | Type        | Default     |
| ------------------- | ---------------------------------------------------- | ----------- | ----------- |
| **limit**           | The maximum number of results to return.             | `number`    | `Infinity`  |
| **match_when_empty**| Whether to return all results when the search is empty. | `boolean` | `undefined`      |
| **fuse_options**    | [Read more](https://fusejs.io/api/options.html)     | `Fuse.IFuseOptions<T>` | `No default, required`|

### ↩️ Returns

| Name        | Description                          | Type                          |
| ----------- | ------------------------------------ | ----------------------------- |
| **results** | The results of the search.           | `Fuse.FuseResult<T>[]`        |
| **ifuse**   | Fuse instance.                       | `Fuse<T>`                     |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import Fuse from "fuse.js"

    export type _FuseOptions<T> = Fuse.IFuseOptions<T>

    export interface FuseOptions<T> {
        /**
         * Fuse.js options
         */
        fuse_options?: _FuseOptions<T>
        /**
         * Number of results to return
         */
        limit?: number
        /**
         * Match all results when search term is empty
         */
        match_when_empty?: boolean
    }

    /**
     * Wrapper for Fuse.js
     *
     * @param search - The search term
     *
     * @param data - The data to search
     *
     * @param options - Options
     * - `limit` - The maximum number of results to return.
     * - `match_when_empty` - Match all results when search term is empty
     * - `fuse_options` - [Fuse.js options](https://fusejs.io/api/options.html)
     */
    export function fuse<T>(search: string, data: T[], options: FuseOptions<T>) {
        const { fuse_options, limit, match_when_empty } = options

        const fuse_instance = new Fuse(data ?? [], fuse_options)

        let results

        if (match_when_empty && !search)
            results = data.map((item, index) => ({ item, refIndex: index }))
        else results = fuse_instance.search(search, limit ? { limit } : undefined)

        return {
            results,
            ifuse: fuse_instance,
        }
    }
    ```
