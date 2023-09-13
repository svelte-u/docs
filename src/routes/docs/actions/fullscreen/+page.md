---
title: Fullscreen
description: Toggle fullscreen mode of an element.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta name="fullscreen" lib="actions"/>

Reactive Fullscreen API. It adds methods to present a specific Element (and its descendants) in full-screen mode, and to exit full-screen mode once it is no longer needed. This makes it possible to present desired content—such as an online game—using the user's entire screen, removing all browser user interface elements and other applications from the screen until full-screen mode is shut off.

## Usage

<Tabs activeName="Default">
  <TabPanel name="Default">

```svelte
<script>
    import { fullscreen } from "@sveu/actions"

    function fn({ supported, enter, exit, toggle }) {
        console.log(supported, enter, exit, toggle)
    }
</script>

<video
    src="https://vjs.zencdn.net/v/oceans.mp4"
    width="600"
    controls
    use:fullscreen="{fn}">
    <track kind="captions" />
</video>
```

  </TabPanel>

  <TabPanel name="With Events">

```svelte
<script>
   import { fullscreen } from "@sveu/actions"

    function onFullscreen(data) { 
        console.log(`Is full screen: ${data.detail}`)
    }
</script>

<video
    src="https://vjs.zencdn.net/v/oceans.mp4"
    width="600"
    controls
    use:fullscreen
    on:fullscreen="{onFullscreen}">
    <track kind="captions" />
</video>
```

  </TabPanel>
</Tabs>

## Example

### Default

```svelte live ln
<script>
    import { fullscreen } from "@sveu/actions" // [svp! hl]

    import { noop } from "@sveu/shared"

    let toggle = noop

    function fn({ supported, toggle: _toggle }) { // [svp! hl:4]
        toggle = _toggle
        console.log(supported)
    }
</script>
<div class="flex flex-col space-y-5 items-center">

    <video
        src="https://vjs.zencdn.net/v/oceans.mp4"
        width="600"
        controls
        use:fullscreen="{fn}"> <!-- // [svp! hl]  -->
        <track kind="captions" />
    </video>

    <button
        class="border-none rounded-xl bg-purple-700 shadow-none text-white p-8"
        on:click="{toggle}">
        Go Fullscreen
    </button>
</div>
```

### With Events

```svelte live ln
<script>
    import { fullscreen } from "@sveu/actions"

    import { noop } from "@sveu/shared"

    let toggle = noop

    function fn({ supported, toggle: _toggle }) {
        toggle = _toggle
    }

    function onFullscreen(data) { // [svp! hl:3]
        console.log(`Is full screen: ${data.detail}`)
    }
</script>

<div class="flex flex-col space-y-5 items-center">

    <video
        src="https://vjs.zencdn.net/v/oceans.mp4"
        width="600"
        controls
        use:fullscreen="{fn}"
        on:fullscreen="{onFullscreen}"> <!-- // [svp! hl]  -->
        <track kind="captions" />
    </video>

    <button
        class="border-none rounded-xl bg-purple-700 shadow-none text-white p-8"
        on:click="{toggle}">
        Go Fullscreen
    </button>
</div>
```

## API

### Arguments

| Name   | Description                                  | Type                  | Required |
| ------ | -------------------------------------------- | --------------------- | -------- |
| **fn** | A function that receives functions to control the behavior of the fullscreen. | (data: FullscreenFnData) => void | No |

<br/>
<br/>

### Events

| Name           | Description                                        | Type                   |
| ---------------| -------------------------------------------------- | ---------------------- |
| **fullscreen** |  An event will fire once the fullscreen is toggled | CustomEvent<`Boolean`> |

<br/>
<br/>

:::tip
If you use typescript, you need to add `./node_modules/@sveu/actions/events.d.ts` to your `tsconfig.json` file.

```json
{
    ...

    "include": [
        ...
        "./node_modules/@sveu/actions/events.d.ts"
    ]
    ...
}
```

:::
