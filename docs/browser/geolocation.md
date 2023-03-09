---
title: Geolocation
description: Reactive Geolocation API
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { geolocation } from "@sveu/browser"

    const { coords, located_at, error, resume, pause, supported } = geolocation()
</script>
```

## 👩‍💻API

### 🙈 Options

| Name        | Description                          | Type                          | Default  |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **high**    | Whether to enable high accuracy.     | `boolean`                     | `true`   |
| **max_age** | The maximum age of a cached position.| `number`                      | `3`      |
| **timeout** | The timeout in seconds.              | `number`                      | `27`     |

### ↩️ Returns

| Name        | Description                          | Type                          |
| ----------- | ------------------------------------ | ----------------------------- |
| **supported** | Whether the Geolocation API is supported. | `boolean`              |
| **coords** | The current coordinates.         | `Readable<GeolocationCoordinates>` |
| **located_at** | The timestamp of the last location update. | `Readable<number | null>` |
| **error** | The last error. | `Readable<GeolocationPositionError | null>` |
| **resume** | Resume watching the location. | `() => void` |
| **pause** | Pause watching the location. | `() => void` |

## 🧪 Playground

[StackBlitz](https://stackblitz.com/edit/github-8gcpfy?file=src%2Froutes%2Fbrowser%2Fgeolocation%2F%2Bpage.svelte)

## Source Code 👀

??? tip "Source Code"

    ```ts
    import {
        browser,
        on_destroy,
        to_readable,
        to_writable,
        unstore,
    } from "@sveu/shared"

    import { support } from "../support"
    import type { GeolocationOptions } from "../utils"

    /**
     * Reactive Geolocation API.
     *
     * @param options - Geolocation options.
     * - `high` Whether to enable high accuracy. Defaults to `true`.
     * - `max_age` The maximum age of a cached position in seconds. Defaults to `3`.
     * - `timeout` The timeout in seconds. Defaults to `27`.
     *
     * @returns
     * - `supported` Whether the Geolocation API is supported.
     * - `coords` The current coordinates.
     * - `located_at` The timestamp of the last location update.
     * - `error` The last error.
     * - `resume` Resume watching the location.
     * - `pause` Pause watching the location.
     */
    export function geolocation(options: GeolocationOptions = {}) {
        const { high = true, max_age = 3, timeout = 27, immediate = true } = options

        const supported = support("geolocation")

        const located_at = to_writable<number | null>(null)

        const error = to_writable<GeolocationPositionError | null>(null)

        const coords = to_writable<GeolocationPosition["coords"]>({
            accuracy: 0,
            latitude: Infinity,
            longitude: Infinity,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
        })

        function update(position: GeolocationPosition) {
            located_at.set(position.timestamp)

            coords.set({
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                altitudeAccuracy: position.coords.altitudeAccuracy,
                heading: position.coords.heading,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                speed: position.coords.speed,
            })
            error.set(null)
        }

        let watcher: number | undefined

        /** Resume watching the location. */
        function resume() {
            if (unstore(supported)) {
                watcher = navigator?.geolocation.watchPosition(
                    update,
                    (err) => error.set(err),
                    {
                        enableHighAccuracy: high,
                        maximumAge: max_age * 1000,
                        timeout: timeout * 1000,
                    }
                )
            }
        }

        if (immediate) resume()

        /** Stop watching the location. */
        function pause() {
            if (watcher && browser) navigator.geolocation.clearWatch(watcher)
        }

        on_destroy(pause)

        return {
            supported,
            coords: to_readable(coords),
            located_at: to_readable(located_at),
            error: to_readable(error),
            resume,
            pause,
        }
    }
    ```
