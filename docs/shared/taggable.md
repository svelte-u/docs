---
title: Taggable
description: A boolean switcher
demo_link: https://svelte.dev/repl/d00922f6651b4772b34d36cd0f6ccb33?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script lang="ts">
    import { taggable } from "@sveu/shared"

    const { toggled, toggle } = taggable()
    </script>

    <div class="flex flex-col space-y-3 mx-20 mt-20 text-center">
    <h1>{$toggled ? "On" : "Off"}</h1>

    <button
        on:click="{() => toggle()}"
        class="rounded-xl bg-purple-600 text-white p-3">Toggle</button>
    </div>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **value**           | Initial value                                | `MaybeStore<boolean>` | No       |

### 🙈 Returns

| Name                | Description                                          |
| ------------------- | ---------------------------------------------------- |
| **{toggle, toggled}**| Toggle function and toggled value                   |
| **toggled**         | If the value is **writable store** to will return a function to update the value of the store |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import type { Writable } from "svelte/store"

    import { to_readable } from "../to_readable"
    import { to_writable } from "../to_writable"
    import { unstore } from "../unstore"
    import { is_boolean, is_writable } from "../utils"
    import type { DefaultTaggableReturn, MaybeStore, ToggleFn } from "../utils"

    /**
     * Creates a taggable store.
     *
     * @param value - initial state.
     *
     * @defaultValue false
     *
     * @returns
     * - `toggle` - a function to toggle the state.
     * - `toggled` - a readable store with the current state. if the value is not writable store
     */
    export function taggable(value: Writable<boolean>): ToggleFn
    export function taggable(value?: MaybeStore<boolean>): DefaultTaggableReturn
    export function taggable(value: MaybeStore<boolean> = false) {
        if (is_writable(value)) {
            return (_value?: boolean) => {
                if (typeof _value !== "undefined") {
                    value.set(is_boolean(_value) ? _value : !unstore(value))
                } else value.set(!unstore(value))
            }
        } else {
            const store = to_writable(value)

            const toggle = (_value?: boolean) => {
                if (typeof _value !== "undefined") {
                    store.set(is_boolean(_value) ? _value : !unstore(store))
                } else store.set(!unstore(store))
            }

            return {
                toggled: to_readable(store),
                toggle,
            }
        }
    }
    ```
