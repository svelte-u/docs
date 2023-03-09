---
title: Wake Lock
description: Reactive Screen Wake Lock API.
demo_link: https://svelte.dev/repl/22e199204a7246b5be578b51938e548a?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { wake_lock } from "@sveu/browser"

    const { active, request, release, supported } = wake_lock()
</script>
```

## 👩‍💻API

### ↩️ Returns

| Name                 | Description                          | Type                            |
| -----------          | -------------------------------------| -----------------------------   |
| **supported**        | Is the Wake Lock API supported       | `Readable<boolean>`             |
| **active**           | Is the Wake Lock active              | `Readable<boolean>`             |
| **request**          | Request a Wake Lock                  | `(type: WakeLockType) => void`  |
| **release**          | Release the Wake Lock                | `() => void`                    |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { browser, to_readable, to_writable, unstore } from "@sveu/shared"

    import { on } from "../event_listener"
    import { support } from "../support"
    import type {
        NavigatorWithWakeLock,
        WakeLockSentinel,
        WakeLockType,
    } from "../utils"

    /**
     * Reactive Screen Wake Lock API.
     *
     * @returns
     * - `supported` - Whether the Wake Lock API is supported.
     * - `active` - Whether the Wake Lock is active.
     * - `request` - Request a Wake Lock.
     * - `release` - Release the Wake Lock.
     */
    export function wake_lock() {
        let _wake_lock: WakeLockSentinel | null

        const supported = support("wakeLock")

        const active = to_writable(false)

        async function on_visibility_change() {
            if (!unstore(supported) || !_wake_lock) return

            if (document.visibilityState === "visible")
                _wake_lock = await (
                    navigator as NavigatorWithWakeLock
                ).wakeLock.request("screen")

            active.set(!_wake_lock.released)
        }

        if (browser)
            on(document, "visibilitychange", on_visibility_change, {
                passive: true,
            })

        /**
         * Request a Wake Lock.
         *
         * @param type - The type of Wake Lock to request. Defaults to "screen".
         *
         */
        async function request(type: WakeLockType) {
            if (!unstore(supported)) return

            _wake_lock = await (
                navigator as NavigatorWithWakeLock
            ).wakeLock.request(type)

            active.set(!_wake_lock.released)
        }

        /** Release the Wake Lock. */
        async function release() {
            if (!unstore(supported) || !_wake_lock) return

            await _wake_lock.release()

            active.set(!_wake_lock.released)

            _wake_lock = null
        }

        return {
            supported,
            active: to_readable(active),
            request,
            release,
        }
    }
    ```
