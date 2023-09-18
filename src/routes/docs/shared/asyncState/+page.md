---
title: Async State
description: Reactive async state.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive async state.

## Usage

```svelte
<script>
    import { asyncState } from "@sveu/shared"

    const { state, ready, loading, error, execute } = asyncState(
        () => Promise.resolve(1),
        0,
    )
</script>
```

## Example

```svelte live ln
<script>
    import { asyncState } from "@sveu/shared"

    async function get_random_image() {
        const resp = await fetch("https://source.unsplash.com/random/")
        return resp.url
    }

    const { loading, state, ready, execute } = asyncState(
        get_random_image,
        "https://i.ibb.co/VjFRjmf/Bugs-in-Bah-Humduck.jpg"
    )
</script>

<img src="{$state}" alt="random" width="200" height="200" />
<br />
<h3>Loading: {$loading}</h3>
<h3>Ready: {$ready}</h3>
<button disabled="{!$ready}" on:click="{() => execute()}">Fetch</button>
```

## API

### Arguments

| Name             | Description                     | Type                    | Required              |
| ---------------- | ------------------------------- | ----------------------- | --------------------- |
| **promise**      | The promise to execute.         | () => Promise<`any`>    | Yes                   |
| **initialState** | The initial state of the state. | `any`                   | No                    |

<br />
<br />

### Options

| Name        | Description                                | Type                          |
| ----------- | ------------------------------------------ | ----------------------------- |
| **delay**   | Delay for executing the promise in second. | `number`                      |
| **immediate** | Execute the promise right after the function is invoked. | `boolean` |
| **onError** | Callback when error is caught.             | (error: `unknown`) => void        |
| **resetOnExecute** | Sets the state to initial state before executing the promise. | `boolean` |
| **throwError** | An error is thrown when executing the execute function. | `boolean` |

<br />
<br />

### Returns

| Name          | Description                                | Type                         |
| -----------   | -------------------------------------------| -----------------------------|
| **state**     | The state.                                 | Readable<`any`>              |
| **ready**     | A boolean that indicates if the promise has been resolved. | Readable<`boolean`> |
| **loading**   | A boolean that indicates if the promise is being executed. | Readable<`boolean`> |
| **error**     | The error that was caught.                  | Readable<`unknown`>          |
| **execute**   | A function that executes the promise manually.|(delay?: number, ...args: any[]) => Promise<`number`> |