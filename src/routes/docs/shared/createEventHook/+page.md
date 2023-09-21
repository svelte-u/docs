---
title: Create Event Hook
description: Creates a hook that can be used to create event listeners.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Creates a hook that can be used to create event listeners. Useful for creating functions that need to be called on a specific event. With that you can build reusable functions.

## Usage

```svelte
<script>
    import { createEventHook } from '@sveu/shared'

    function request(url) {
        const fetchResult = createEventHook()

        const fetchError = createEventHook()

        fetch(url)
            .then(result => fetch_result.trigger(result))
            .catch(error => fetch_error.trigger(error?.message))

        return {
            onResult: fetch_result.on,
            onError: fetch_error.on,
        }
    }
</script>
```

## Example

```svelte live ln
<script >
    import { createEventHook } from "@sveu/shared"

    let data

    function request(url) {
        const fetchResult = createEventHook()

        const fetchError = createEventHook()

        fetch(url)
            .then((result) => fetchResult.trigger(result))
            .catch((error) => fetchError.trigger(error?.message))

        return {
            onResult: fetchResult.on,
            onError: fetchError.on,
        }
    }

    const { onResult, onError } = request(
        "https://jsonplaceholder.typicode.com/todos/1"
    )

    onResult(async (result) => {
        const _data = await result.json()

        console.table(_data)

        data = JSON.stringify(_data)
    })

    onError((message) => {
        console.log(message)
    })
</script>
<h4>Check your console</h4>

{data}
```

## API

### Returns

| Name        | Description                           | Type                                            |
| ----------- | ------------------------------------- | ----------------------------------------------- |
| **on**      | Add a function to the event hook      | EventHookOn<`any`>                              |
| **off**     | Remove a function from the event hook | EventHookOff<`any`>                             |
| **trigger** | Trigger the event hook                | EventHookTrigger<`any`>                         |
