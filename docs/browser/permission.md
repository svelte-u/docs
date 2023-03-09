---
title: Permission
description: Reactive Permissions API
demo_link: https://svelte.dev/repl/90dc834055984a7b881f80f1b0601dd3?version=3.55.1
---

# {{title}}

{{description}} The Permissions API provides the tools to allow developers to implement a better user experience as far as permissions are concerned.



## 🎬 Usage

```html
<script>
    import { permission } from "@sveu/browser"

    const microphone = permission("microphone")
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **permission_desc** | Permission descriptor | `GeneralPermissionDescriptor | GeneralPermissionDescriptor["name"]` | Required |

### 🙈 Options

| Name        | Description                          | Type                          | Default  |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **controls** | Return controls                      | `boolean`                    | `false`  |

### ↩️ Returns

| Name          | Description                                | Type                         |
| -----------   | -------------------------------------------| -----------------------------|
| **state**     | Permission state                           | `Readable<PermissionState>`  |
| **supported** | Whether the browser supports the API(only available when controls is true)       | `Readable<boolean>`          |
| **query**     | Query permission status(only available when controls is true) | `() => Promise<PermissionStatus>` |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import {
        create_singleton_promise,
        to_readable,
        to_writable,
        unstore,
    } from "@sveu/shared"

    import { on } from "../event_listener"
    import { support } from "../support"
    import type {
        GeneralPermissionDescriptor,
        PermissionOptions,
        PermissionReturn,
        PermissionReturnWithControls,
    } from "../utils"

    export function permission(
        permission_desc:
            | GeneralPermissionDescriptor
            | GeneralPermissionDescriptor["name"],
        options?: PermissionOptions<false>
    ): PermissionReturn
    export function permission(
        permission_desc:
            | GeneralPermissionDescriptor
            | GeneralPermissionDescriptor["name"],
        options: PermissionOptions<true>
    ): PermissionReturnWithControls
    export function permission(
        permission_desc:
            | GeneralPermissionDescriptor
            | GeneralPermissionDescriptor["name"],
        options: PermissionOptions<boolean> = {}
    ): PermissionReturn | PermissionReturnWithControls {
        const { controls = false } = options

        const supported = support("permissions")

        let permission_status: PermissionStatus | undefined

        const desc = { name: permission_desc } as PermissionDescriptor

        const state = to_writable<PermissionState | undefined>(undefined)

        const on_change = () => {
            if (permission_status) state.set(permission_status.state)
        }

        const query = create_singleton_promise(async () => {
            if (!unstore(supported)) return

            if (!permission_status) {
                try {
                    permission_status = await navigator?.permissions.query(desc)

                    on(permission_status, "change", on_change)

                    on_change()
                } catch {
                    state.set("prompt")
                }
            }

            return permission_status
        })

        query()

        if (controls) {
            return {
                state: to_readable<PermissionState | undefined>(state),
                supported,
                query,
            }
        } else return to_readable(state)
    }
    ```
