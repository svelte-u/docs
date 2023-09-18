---
title: Vibrate
description: Vibrate the device with a given pattern and duration.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Vibrate the device with a given pattern and duration.

## Usage

```svelte
<script>
    import { vibrate } from "@sveu/browser"

    const { supported, start, stop } = vibrate()
</script>
```

## Example

```svelte live ln
<script>
    import { useragent, vibrate } from "@sveu/browser"

    const { supported, start, stop } = vibrate()

    const { mobile } = useragent()
</script>

<div class="flex flex-col w-full items-center">
    {#if $supported && $mobile}
        <button
            on:click="{start}"
            >Start</button>

        <br />

        <button
            on:click="{stop}"
            >Stop</button>
    {:else}
        <h1>Your can't use this feature.</h1>
    {/if}
</div>
```

## API

### Options

| Name         | Description                          | Type                          | Default  |
| -----------  | ------------------------------------ | ----------------------------- | -------- |
| **pattern**  | Vibration Pattern in seconds         | `number[]` or `number`        | []       |
| **interval** | Interval to run a persistent vibration, in seconds | `number`        |   0      |

<br/>
<br/>

### Returns

| Name                 | Description                                    | Type                          |
| -------------------- | ---------------------------------------------- | ----------------------------- |
| **supported**        | Whether the browser supports the Vibration API | boolean                       |
| **intervalControls** | Controls for the persistent vibration          | Pauseable                     |
| **start**            | Start the vibration                            | () => void                    |
| **stop**             | Stop the vibration                             | () => void                    |
