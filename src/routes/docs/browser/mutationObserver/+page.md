---
title: Mutation Observer
description: Watch for changes being made to the DOM tree.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Watch for changes being made to the DOM tree.

## Usage

```svelte
<script>
    import { mutationObserver } from "@sveu/browser"

    let target = null

    $: target, mutationObserver(
        target,
        (mutations) => {
            //    do something
        },
        { attributes: true }
    )
</script>
```

## Example

```svelte live ln
<script>
    import { mutationObserver } from "@sveu/browser"
    import { timeoutFn } from "@sveu/shared"

    let messages = []

    function observer(target) {

        const { cleanup } = mutationObserver(
            target,
            (mutations) => {
                for (const mutation of mutations) {
                    messages = [...messages, mutation.attributeName]
                }
            },
            { attributes: true }
        )

        timeoutFn(() => {
            target.classList.add("text-red")
        }, 2)

        timeoutFn(() => {
            target.classList.remove("text-red")
        }, 4)

        timeoutFn(() => {
            target.setAttribute("svelte", "U")
            target.classList.add("text-red")
        }, 6)

        return {
            destroy() {
                cleanup()
            },
        }
    }
</script>

<h1 use:observer class="text-center">Hello From Svelte Utility</h1>

{#each messages as message}
    <p class="text-center">
        Mutation Attribute: {message}
    </p>
{/each}

<style>
    .text-red {
        color: red;
    }
</style>
```

## API

### Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **target**      | The target node          | `HTMLElement` or `SVGElement`     | Yes      |
| **fn**          | The function to call     | `MutationCallback`                | Yes      |

<br/>
<br/>

### Options

[See MutationObserver Options](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe)

### Returns

| Name            | Description                                              | Type                     |
| --------------- | -------------------------------------------------------- | ------------------------ |
| **supported**   | Whether the browser supports the `MutationObserver` API. | Readable<`boolean`>      |
| **cleanup**     | A function to stop watching for changes.                 | () => void               |
