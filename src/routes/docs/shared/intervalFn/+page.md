---
title: IntervalFn
description: Wrapper for `setInterval` with controls.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Wrapper for `setInterval` with controls.

## Usage

```svelte
<script>
    import {intervalFn} from "@sveu/shared"

    let count = 0

    const {active, resume, pause} = intervalFn(() => {
        count++
    }, 1)

</script>
<h1>Counter: {count}</h1>

<h3>IS ACTIVE: {$active ? "YES" : "NO"}</h3>
<button on:click={resume}>Resume</button>

<button on:click={pause}>Pause</button>
```

## Example

```svelte live ln
<script lang="ts">
    import { intervalFn } from "@sveu/shared"
    import { random } from "@sveu/shared/math"

    const greetings = [
        "Hello",
        "Hi",
        "Yo!",
        "Hey",
        "Hola",
        "こんにちは",
        "Bonjour",
        "Salut!",
        "你好",
        "Привет",
        "مرحبا",
        "ሃይ",
    ]

    let word = "Hello"

    const { pause, resume, active } = intervalFn(() => {
        word = greetings[random(0, greetings.length - 1)]
    }, 1)
</script>

<h1>{word}</h1>

{#if $active}
    <button on:click="{() => pause()}">Pause</button>
{:else}
    <button on:click="{() => resume()}">Resume</button>
{/if}
```

## API

### Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **fn**              | Function to execute                          | `Function`            | Yes      |
| **interval**        | Time to wait before executing `fn` in second | `number`              | No       |

<br />
<br />

### Options

| Name                  | Description                                           | Type        | Default  |
| --------------------- | ----------------------------------------------------- | ----------- | -------- |
| **immediate**         | Whether to execute `fn` immediately or not            | `boolean`   | true     |
| **immediateCallback** | Whether to execute `fn` onces this function is called | `boolean`   | false    |

<br />
<br />

### Returns

| Name                | Description                                          | Type                      |
| ------------------- | ---------------------------------------------------- | ------------------------- |
| **active**          | Whether the interval is active or not                | Readable<`boolean`>       |
| **resume**          | Resume the interval                                  | Function                  |
| **pause**           | Pause the interval                                   | Function                  |
