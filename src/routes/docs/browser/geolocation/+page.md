---
title: Geolocation
description: Reactive Geolocation API.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive Geolocation API.

## Usage

```svelte
<script>
    import { geolocation } from "@sveu/browser"

    const { supported, coords, locatedAt, error, resume, pause } = geolocation()
</script>
```

## Example

```svelte live ln
<script>
    import { geolocation } from "@sveu/browser"

    const { coords, locatedAt, error, resume, pause, supported } = geolocation()
</script>

<div class="grid place-items-center">
    <h1>supported: {$supported}</h1>

    <pre lang="json">{JSON.stringify(
            {
                coords: {
                    accuracy: $coords.accuracy,
                    latitude: $coords.latitude,
                    longitude: $coords.longitude,
                    altitude: $coords.altitude,
                    altitudeAccuracy: $coords.altitudeAccuracy,
                    heading: $coords.heading,
                    speed: $coords.speed,
                },
                locatedAt: $locatedAt,
                error: $error ? $error.message : error,
            },
            null,
            4
        )}</pre>
    <button on:click="{pause}">
        Pause watch
    </button>
    <br />
    <button  on:click="{resume}">
        Start watch
    </button>
</div>
```

## API

### Options

| Name          | Description                                          | Type          | Default  |
| ------------- | ---------------------------------------------------- | ------------- | -------- |
| **high**      | Whether to enable high accuracy.                     | `boolean`     | true     |
| **immediate** | Whether to start watching the location immediately.  | `boolean`     | true     |
| **maxAge**    | The maximum age of a cached position.                | `number`      | 3        |
| **timeout**   | The timeout in seconds.                              | `number`      | 27       |

<br />
<br />

### Returns

| Name          | Description                                  | Type                                 |
| ------------- | -------------------------------------------- | ------------------------------------ |
| **supported** | Whether the Geolocation API is supported.    | Readable<`boolean`>                  |
| **coords**    | The current coordinates.                     | Readable<`GeolocationCoordinates`>   |
| **locatedAt** | The timestamp of the last location update.   | Readable<`number`>                   |
| **error**     | The last error.                              | Readable<`GeolocationPositionError`> |
| **resume**    | Resume watching the location.                | () => void                           |
| **pause**     | Pause watching the location.                 | () => void                           |
