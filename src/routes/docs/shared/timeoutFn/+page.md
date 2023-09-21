---
title: TimeoutFn
description: Wrapper for `setTimeout` with controls.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive async state.

## Usage

```svelte
<script>
    import {timeoutFn} from "@sveu/shared"

    const { ready, start } = timeoutFn(1, { controls: true })

    const { active, pause, resume } = timeoutFn(() => {
      /* ... */
    }, 2)
</script>
```

## Example

```svelte live ln
<script>
    import { timeoutFn } from "@sveu/shared"
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
        " مرحبا",
    ]

    let word = "Hello"

    const { active, resume, pause } = timeoutFn(() => {
        word = greetings[random(0, greetings.length - 1)]
    }, 1)
</script>

<h1>{word}</h1>

{#if $active}
    <h1>Running.....</h1>
    <button on:click="{pause}">Stop</button>
{:else}
    <button on:click="{resume}">Start</button>
{/if}
```

## API

### Arguments

| Name          | Description                                             | Type                |Required|
| ------------- | ------------------------------------------------------- | -------------------  | --- |
| **fn**        | The function to invoke after the timeout.               | `Function`           | Yes |
| **interval**  | The time to wait before invoking the function in second | MaybeStore<`number`> | No  |

<br />
<br />

### Options

| Name                | Description                                          | Type        | Default     |
| ------------------- | ---------------------------------------------------- | ----------- | ----------- |
| **immediate**       | Whether to invoke the function immediately.          | `boolean`   | true        |
| **immediateCallback** | Whether to execute the callback immediately after calling this function. | `boolean`| false     |

<br />
<br />

### Returns

| Name            | Description                                          | Type        |
| --------------- | ---------------------------------------------------- | ----------- |
| **active**      | A boolean value that indicates whether the timer is executing. | Readable<`boolean`> |
| **resume**      | A function to start the timer.                       | `Function`  |
| **pause**       | A function to stop the timer.                        | `Function`  |
