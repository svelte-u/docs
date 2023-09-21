---
title: Watchable
description: A function that create writable store that can be watched.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Is a writeable store that call the callback function when the value changed. This function is inspired from [Vue.js watch](https://vuejs.org/guide/essentials/watchers.html) function.

## Usage

```svelte
<script>
    import {watchable} from "@sveu/shared"

    let new_value,old_value

    function callback(_old_value, _new_value) {
            new_value = _new_value
            old_value = _old_value
    }

    const watched = watchable(0, callback)
</script>

<button on:click={() => $watched++}>Increment</button>

<button on:click={() => $watched--}>Decrement</button>

<hr/>

<h1>new Value: {new_value}</h1>
<hr/>
<h1>old Value: {old_value}</h1>
```

## Example

```svelte live ln
<script>
    import { watchable } from "@sveu/shared"

    let new_value, old_value

    function callback(_old_value, _new_value) {
        new_value = _new_value
        old_value = _old_value
    }

    const watched = watchable(0, callback)
</script>

<button on:click="{() => $watched++}">Increment</button>

<button on:click="{() => $watched--}">Decrement</button>

<hr />

<h1>new Value: {new_value}</h1>
<hr />
<h1>old Value: {old_value}</h1>
```

## API

### Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **initialValue**    | The initial value of the store.      | MaybeStore<`T`>               | Yes      |
| **fn**              | A function to call when the value changes.  | `(o: T, n: T) => void` | Yes      |
