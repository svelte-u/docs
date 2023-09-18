---
title: Resize Observer
description: Wrapper around the ResizeObserver API.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Wrapper around the [ResizeObserver API.](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)

## Usage

```svelte
<script>
    import { resizeObserver } from "@sveu/browser"

    let target = null

    $: target, resizeObserver(
        target,
        (entries) => {
            //    do something
        }
    )
</script>
```

## Example

```svelte live ln
<script>
    import { resizeObserver } from "@sveu/browser"

    let text = ""

    function observer(target) {
        const { cleanup } = resizeObserver(target, (entries) => {
            const [entry] = entries

            const { width, height } = entry.contentRect

            text = `width: ${width}\nheight: ${height}`

            return {
                destroy() {
                    cleanup()
                },
            }
        })
    }
</script>

<div class="flex flex-col items-center justify-center">
    <p class="my-9">Resize the box to see changes</p>

    <textarea use:observer class="border border-4" disabled value="{text}"
    ></textarea>
</div>
```

## API

### Arguments

| Name            | Description              | Type                              | Required |
| --------------- | -----------------------  | --------------------------------- | -------- |
| **target**      | The target element to observe. | `HTMLElement` or `SVGElement` | Yes    |
| **callback**    | The callback function to invoke when the dimensions of the target element change. | `ResizeObserverCallback` | Yes |

<br/>
<br/>

### Options

[ResizeObserverOptions](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe#parameters)

<br/>
<br/>

### Returns

| Name            | Description                                          | Type                 |
| --------------- | ---------------------------------------------------- | -------------------- |
| **supported**   | Whether the browser supports the ResizeObserver API. | Readable<`boolean`>  |
| **cleanup**     | A function to cleanup the observer.                  | () => void           |
