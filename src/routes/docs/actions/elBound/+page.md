---
title: Element Bounding
description: Reactive bounding box of an element.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta name="elBound" lib="actions"/>

Reactive bounding box of an HTML element.

## Usage

```svelte
<script>
    import { elBound } from "@sveu/actions"

    function fn(data) {
        console.log(data)
    }
</script>

<textarea use:elBound="{fn}"></textarea>
```

## Example

```svelte live ln
<script lang="ts">
    import { elBound } from "@sveu/actions" // [svp! hl]

    import type { ElementBoundData } from "@sveu/actions"

    let height = 0,
        bottom = 0,
        left = 0,
        right = 0,
        top = 0,
        width = 0,
        x = 0,
        y = 0

    $: text = `
    height: ${height}
    bottom: ${bottom}
    left:  ${left}
    right:  ${right}
    top:  ${top}
    width:  ${width}
    x:  ${x}
    y:  ${y}
    `
    
    function fn(data: ElementBoundData) {  // [svp! hl]
        x = data.x

        y = data.y

        right = data.right

        left = data.left

        top = data.top

        bottom = data.bottom

        width = data.width

        height = data.height

        width = data.width
    }
</script>

<div class="text-center">
    <textarea
        class="border border-4 h-63 w-75"
        readonly
        value="{text}"
        use:elBound="{fn}"></textarea> <!-- // [svp! hl]  -->
</div>

```

## API

### Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **fn**              | A function that receive the bounding box of the element. | (data: BoundingData) => void | Yes |

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
