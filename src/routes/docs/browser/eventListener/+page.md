---
title: Event Listener
description: Safely listen for events.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Safely listen for events.

## Usage
<Tabs activeName="Default">

  <TabPanel name="Default">

```svelte
<script>
    import { eventListener } from '@sveu/browser'

    eventListener(document, 'visibilitychange', (evt) => {console.log(evt)})
</script>
```

  </TabPanel>

  <TabPanel name="Alias">

```svelte
<script>
    import { on } from '@sveu/browser'

    on('keydown', (event) => {console.log(event.key)})
</script>
```

  </TabPanel>
</Tabs>

## Example

```svelte live ln
<script lang="ts">
    // import { eventListener } from "@sveu/browser"
    import { on } from "@sveu/browser"

    let key = ""
    
    const cleanup = on("keydown", (e: KeyboardEvent) => {
        console.log(e.key)
        
        key = e.key

        if (e.key === "Escape") cleanup()
    })
</script>

<p>{key}</p>
```

## API

### Arguments

| Name            | Description                 | Type                                   | Required |
| --------------- | --------------------------  | -------------------------------------- | -------- |
| **target**      | The target to listen to.    | `EventTarget` or `undefined`           | No       |
| **event**       | The event to listen to.     | ListAble<`string`>                     | Yes      |
| **listeners**   | The event handler.          | ListAble<`AnyFn`>                      | Yes      |
| **options**     | The event listener options. | `Boolean` or `AddEventListenerOptions` | No       |
