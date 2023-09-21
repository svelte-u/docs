---
title: Sleep
description: Sleeps for a given time.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

A function that returns a promise that resolves after a given amount of time. This function is similar to the [sleep function in Python](https://docs.python.org/3/library/time.html#time.sleep).

## Usage

```svelte
<script>
    import {sleep} from "@sveu/shared"

    let text = "wake up"

    async function update_text(){
        text = "sleep...."
        await sleep(2)
        text = "wake up"
    }
</script>

<h1>{text}</h1>

<button on:click="{() => update_text()}">Sleep</button>
```

## Example

```svelte live ln
<script>
    import {sleep} from "@sveu/shared"

    let text = "wake up"

    async function update_text(){
        text = "sleep...."
        await sleep(2)
        text = "wake up"
    }
</script>

<div class="flex flex-col mx-20 mt-20 text-center">
<h1>{text}</h1>

<button on:click="{() => update_text()}">Sleep</button>
</div>
```

## API

### Arguments

| Name                | Description                                    | Type                | Required |
| ------------------- | ---------------------------------------------- | ------------------- | -------- |
| **s**               | Seconds to sleep                               | `number`            | Yes      |
| **throwOnTimeout**  | Throw an error on timeout                      | `boolean`           | No       |
| **reason**          | Reason to throw if `throwOnTimeout` is `true`. | `string`            | No       |
