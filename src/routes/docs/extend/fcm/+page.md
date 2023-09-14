---
title: Fcm
description: Wrapper for firebase cloud messaging. 
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Wrapper for [firebase cloud messaging](https://firebase.google.com/docs/cloud-messaging).

## ⚡️ Prerequisites

@install-pkg(firebase)

## Usage

```svelte
<script>
    import { initializeApp } from "firebase/app"
    import {fcm} from "@sveu/extend/fcm"

    const config = {
        ...
    }

    const app = initializeApp(config)

    const { token, error, supported, messaging, onMessage } = fcm(firebase, "vapid key")
</script>
```

## API

### Arguments

| Name           | Description                          | Type                       | Required |
| -------------- | ------------------------------------ | -------------------------- | -------- |
| **firebase**   | Firebase app instance.               | `firebase.app.App`         | Yes      |
| **vapidKey**   | VAPID key.                           | `string`                   | Yes      |

<br/>
<br/>

### Options

| Nam          | Description                                           | Type        | Default     |
| ------------ | ----------------------------------------------------  | ----------- | ----------- |
| **swPath**   | The url path to the service worker file.              | `string`    | No default  |

<br/>
<br/>

### Returns

| Name        | Description                                        | Type                           |
| ----------- | -------------------------------------------------- | ------------------------------ |
| **token**   | The token to use for push notifications.           | Readable<`string`>             |
| **error**   | Readable store that contains error if one occurred.| Readable<`Error`>              |
| **supported**| Indicates whether FCM is supported.               | Readable<`boolean`>            |
| **messaging**| The firebase messaging instance.        | Readable<`firebase.messaging.Messaging`> |
| **onMessage**| The function to handle incoming messages.         | fn: (payload: unknown) => void |
