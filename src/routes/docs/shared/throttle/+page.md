---
title: Throttle
description: Throttle execution of a function.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Throttle execution of a function. Especially useful for rate limiting execution of handlers on events like resize and scroll.

## Usage

```svelte
<script>
    import {throttle} from "@sveu/shared"

    let smashed = 0

    let updated = 0 

    const smash_throttled = throttle(() => {
        updated++
    }, 2)
</script>

<h4>Delay is set to 2 second for this demo.</h4>

<button on:click="{() => {smashed++;smash_throttled()}}">Smash me!</button>

<p>Button Smashed: {smashed }</p>

<p>Event handler called: { updated }</p>
```

## Example

```svelte live ln
<script>
    import { throttle } from "@sveu/shared"

    let smashed = 0

    let updated = 0

    const smash_throttled = throttle(() => {
        updated++
    }, 2)
</script>

<div class="space-y-4 text-center">
    <h4>Delay is set to 2 second for this demo.</h4>

    <button on:click="{() => {
            smashed++
            smash_throttled()
        }}">
        Smash me!
    </button>

    <p>Button Smashed: {smashed}</p>

    <p>Event handler called: {updated}</p>
</div>
```

## API

### Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **fn**              | Function to execute                          | `Function`            | Yes      |
| **s**               | Time to wait before executing `fn` in second | `number`              | Yes      |
| **trailing**        | Call `fn` again after the time is up         | `boolean`             | No       |
| **leading**         | Call `fn` immediately                        | `boolean`             | No       |
