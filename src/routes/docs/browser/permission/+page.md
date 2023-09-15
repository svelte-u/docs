---
title: Permission
description: Reactive Permissions API.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API).

## Usage

```svelte
<script>
    import { permission } from "@sveu/browser"

    const microphone = permission("microphone")
</script>
```

## Example

```svelte live ln
<script>
    import { permission } from "@sveu/browser"

    const accelerometer = permission("accelerometer")

    const accessibilityEvents = permission("accessibility-events")

    const ambientLightSensor = permission("ambient-light-sensor")

    const backgroundSync = permission("background-sync")

    const camera = permission("camera")

    const clipboardRead = permission("clipboard-read")

    const clipboardWrite = permission("clipboard-write")

    const gyroscope = permission("gyroscope")

    const magnetometer = permission("magnetometer")

    const microphone = permission("microphone")

    const notifications = permission("notifications")

    const paymentHandler = permission("payment-handler")

    const persistentStorage = permission("persistent-storage")

    const push = permission("push")

    const speaker = permission("speaker")

    const geolocation = permission("geolocation")

    $: code = JSON.stringify(
        {
            accelerometer: $accelerometer,
            accessibilityEvents: $accessibilityEvents,
            ambientLightSensor: $ambientLightSensor,
            backgroundSync: $backgroundSync,
            camera: $camera,
            clipboardRead: $clipboardRead,
            clipboardWrite: $clipboardWrite,
            gyroscope: $gyroscope,
            magnetometer: $magnetometer,
            microphone: $microphone,
            notifications: $notifications,
            paymentHandler: $paymentHandler,
            persistentStorage: $persistentStorage,
            push: $push,
            speaker: $speaker,
            geolocation: $geolocation,
        },
        null,
        2
    )
</script>

<pre lang="json">{code}</pre>
```

## API

### Arguments

| Name                  | Description                                 | Type                | Required |
| --------------------- | ------------------------------------------- | ------------------- | -------- |
| **name**              | Permission name                             | `string`            | Yes      |

<br />
<br />

### Options

| Name          | Description                                  | Type                                 |
| ------------- | -------------------------------------------- | ------------------------------------ |
| **controls**  | Whether to return controls or not.           | `boolean`                            |

<br />
<br />

### Return

| Name          | Description                                | Type                         |
| -----------   | -------------------------------------------| -----------------------------|
| **state**     | Permission state                           | `Readable<PermissionState>`  |
| **supported** | Whether the browser supports the API(only available when controls is true)       | Readable<`boolean`>         |
| **query**  | Query permission status(only available when controls is true) | () => Promise<`PermissionStatus`> |
