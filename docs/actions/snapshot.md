---
title: Snapshot
description: Takes a snapshot of an element.
demo_link: https://stackblitz.com/edit/github-8gcpfy?file=src%2Froutes%2Factions%2Fsnapshot%2F%2Bpage.svelte
---

# {{title}}

{{description}} Inspired by **[SvelteKit Snapshot](https://kit.svelte.dev/docs/snapshots)**.

## 🎬 Usage

```html
<script>
    import {snapshot} from "@sveu/actions"

    function restore(state) {
        // Your code here
    }

    function capture(target) {
        // Your code here
        return "Return the state of the node."
    }

    options = {
        restore
        capture
    }
</script>

<form use:snapshot="{options}">
    <input type="text" />

    <button>Submit</button>
</form>
```

## 👩‍💻API

### 👻 Arguments

| Name         | Description                                    | Type                      | Default    |
| -------------| ---------------------------------------------- | -----------------------   | ---------- |
| **key**      | The key to use for storing the snapshot data   | `string`                  | `snapshot` |
| **fallback** | The fallback value for the snapshot data       | `unknown`                 | `{}`       |
| **store**    | The storage to use for storing the snapshot    | `cookie | local | session`| `local`    |
| **capture**  | A function that captures the state of the node | `(target: T) => unknown`  | `undefined`|
| **restore**  | A function that restores the state of the node | `(state: any) => void`    |`() => noop`|

## 🧪 Playground

[StackBlitz]({{demo_link}})

??? warning

    In the **StackBlitz** demo, the cookie example will not work b/c it's using a **subdomain**. **[You can test it out by running the demo locally.](https://github.com/svelte-u/playground)**

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { on, storage } from "@sveu/browser"
    import { noop, unstore } from "@sveu/shared"

    import type { SnapshotOptions } from "../utils"

    /**
     * Takes a snapshot of the state of a node and restores it
     *
     * @param node - The node to take a snapshot of.
     *
     * @param options - The options to use.
     * - `key` - The key to use storing the snapshot data.
     * - `store` - The storage to use for storing the snapshot data. Defaults to "local".
     * - `fallback` - The fallback value to use if no data is found.
     * - `capture` - A function that captures the state of the node.
     * - `restore` - A function that restores the state of the node.
     *
     */
    export function snapshot<T extends HTMLElement | Window>(
        node: T,
        options: SnapshotOptions<T> = {}
    ) {
        const {
            key = "snapshot",
            capture,
            restore = () => noop,
            fallback = {},
            store = "local",
        } = options

        const state = storage(key, fallback, { store })

        restore(unstore(state))

        function _capture() {
            if (capture) {
                state.set(capture(node))
            }
        }

        const cleanup = on(window, "beforeunload", _capture)

        return {
            destroy() {
                _capture()
                cleanup()
            },
        }
    }
    ```
