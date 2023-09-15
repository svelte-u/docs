---
title: Event Dispatcher
description: Dispatch custom events in the browser.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Dispatch custom events in the browser.

## Usage

```svelte
<script>
    import { eventDispatcher } from "@sveu/browser"

    const dispatch = eventDispatcher(element)
</script>
```

## Example

```svelte live ln
<script>
    import { on, eventDispatcher } from "@sveu/browser" // [svp! hl:1]

    let counter = 0

    let counter_event = 0

    function clicked(node) {
        const dispatch = eventDispatcher(node) // [svp! hl:1]

        const cleanup = on(node, "click", () => {
            dispatch("clicked", ++counter) // [svp! hl:1]
        })

        return {
            destroy() {
                cleanup()
            },
        }
    }
</script>
Counter: {counter}

<br/>

Counter from the event: {counter_event}

<br/>

<button use:clicked on:clicked="{(e) => counter_event = e.detail}">Click me</button>
```

## API

### Arguments

| Name      | Description                           | Type                                      |Required|
| --------- | ------------------------------------- | ---------------------------------------------- | - |
| **target**| The element to dispatch the event on.|`HTMLElement` or `SVGElement` or `null` or `undefined` | Yes |

<br/>
<br/>

### Returns

| Name         | Description                                  | Type                               |
| ------------ | -------------------------------------------- | -----------------------------      |
| **dispatch** | The function to dispatch the event           | (name: string, value: T) => void   |
