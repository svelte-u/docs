---
title: Screen Orientation
description: Reactive wrapper for the ScreenOrientation API
demo_link: https://svelte.dev/repl/63cdbee144b84573a08e8a2782549236?version=3.56.0
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { screen_orientation } from "@sveu/browser"

    const { supported, orientation, angle, lock, unlock } = screen_orientation()
</script>
```

## 👩‍💻API

### ↩️ Returns

| Name            | Description                           | Type                                  |
| --------------- | ------------------------------------- | ------------------------------------- |
| `supported`     | Whether the API is supported          | `Readable<boolean>`                   |
| `orientation`   | The current orientation of the device | `Readable<OrientationType>`           |
| `angle`         | The current angle of the device       | `Readable<number>`                    |
| `lock`          | Lock the orientation of the device    | `(type: OrientationLockType): void`   |
| `unlock`        | Unlock the orientation of the device  | `(): void`                            |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { to_readable, to_writable, unstore } from "@sveu/shared"

    import { on } from "../event_listener"
    import { support } from "../support"

    /**
     * Wrapper for around the ScreenOrientation API
     *
     * @returns
     * - `supported` - Whether the ScreenOrientation API is supported
     * - `orientation` - The current orientation of the device
     * - `angle` - The current angle of the device
     * - `lock` - Lock the orientation of the device
     * - `unlock` - Unlock the orientation of the device
     */
    export function screen_orientation() {
        const supported_screen = support("screen", "window")

        const supported_orientation =
            unstore(supported_screen) && "orientation" in window.screen

        const supported = to_readable(
            unstore(supported_screen) && supported_orientation
        )

        const _screen_orientation = unstore(supported)
            ? window?.screen?.orientation ?? ({} as ScreenOrientation)
            : ({} as ScreenOrientation)

        const orientation = to_writable<OrientationType>(
            _screen_orientation?.type ?? "unknown"
        )

        const angle = to_writable<number>(_screen_orientation?.angle ?? 0)

        if (unstore(supported)) {
            on(window, "orientationchange", () => {
                orientation.set(window?.screen?.orientation?.type)
                angle.set(window?.screen?.orientation?.angle)
            })
        }

        /**
         * Lock the orientation of the device
         *
         * @param type - The type of orientation to lock into
         *
         */
        function lock(type: OrientationLockType) {
            if (!unstore(supported)) throw Error("The lock type is not supported")

            _screen_orientation?.lock(type)
        }

        /** Unlock the orientation of the device */
        function unlock() {
            if (unstore(supported)) _screen_orientation?.unlock()
        }

        return {
            supported,
            orientation: to_readable(orientation),
            angle: to_readable(angle),
            lock,
            unlock,
        }
    }
    ```
