---
title: Debounce
description: Debounce execution of a function.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Executes a function after a certain amount of time has passed.

## Usage

```svelte
<script>
    import {debounce} from "@sveu/shared"
    const sum_debounce = debounce(() => {
        alert(7 + 7)
    }, 1)
</script>

<button on:click={sum_debounce}>Sum</button>
```

## Example

```svelte live ln
<script>
    import { debounce } from "@sveu/shared"

    let value = "Hi"

    const keydown_debounce = debounce((e) => (value = e.target.value), 1)
</script>

<input  on:input="{keydown_debounce}" />

<hr />

<h1>Value is: {value}</h1>
```

## API

### Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **fn**              | Function to execute                          | `Function`            | Yes      |
| **s**               | Time to wait before executing `fn` in second | `number`              | Yes      |

<br />
<br />

### Options

| Name               | Description                                                             | Type    |
| ------------------ | ----------------------------------------------------------------------- | ------  |
| **maxWait**        | The maximum time allowed to be delayed before it's invoked. In seconds. | `number`|
| **rejectOnCancel** | Whether to reject the last call if it's been cancel. Default false.     |`boolean`|
