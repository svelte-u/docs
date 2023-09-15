---
title: Network
description: Reactive Network status.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive Network status.

## Usage

```svelte
<script>
    import { mutationObserver } from "@sveu/browser"

    const { supported, online} = network()
</script>
```

## Example

```svelte live ln
<script>
    import { network } from "@sveu/browser"
    import { strftime } from "@sveu/shared"

    const {
        online,
        offlineAt,
        onlineAt,
        downlink,
        downlinkMax,
        effectiveType,
        rtt,
        saveData,
        type,
    } = network()
</script>

<h4>online: {$online}</h4>
<h4>online at: {$onlineAt ? strftime($onlineAt, "%c") : ""}</h4>
<h4>offline at: {$offlineAt ? strftime($offlineAt, "%c") : ""}</h4>
<h4>downlink: {$downlink}</h4>
<h4>downlink max: {$downlinkMax}</h4>
<h4>effective type: {$effectiveType}</h4>
<h4>rtt: {$rtt}</h4>
<h4>save data: {$saveData}</h4>
<h4>type: {$type}</h4>
```

## API

### Returns

| Name             | Description                                             | Type                 |
| -----------      | ------------------------------------------------------- | ---------------------|
| **supported**    | Is the Network Information API supported.               | Readable<`boolean`>  |
| **online**       | Is the device online.                                   | Readable<`boolean`>  |
| **saveData**     | Whether the device is in a "save data" mode.            | Readable<`boolean`>  |
| **offlineAt**    | The timestamp of when the device went offline.          | Readable<`number`>   |
| **onlineAt**     | The timestamp of when the device went online.           | Readable<`number`>   |
| **downlink**     | The effective bandwidth estimate in megabits per second, rounded to the nearest multiple of 25 kilobits per second. | Readable<`number`>   |
| **downlinkMax**  | The maximum downlink speed of the underlying connection technology in megabits per second, rounded to the nearest multiple of 25 kilobits per second. | Readable<`number`>   |
| **effectiveType**| The effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'. | Readable<`NetworkEffectiveType`>   |
| **rtt**          | The estimated effective round-trip time of the current connection. | Readable<`number`>   |
| **type**         | The type of connection meaning one of 'bluetooth', 'cellular', 'ethernet', 'none', 'wifi', 'wimax', 'other', or 'unknown'. | Readable<`NetworkType`>   |
