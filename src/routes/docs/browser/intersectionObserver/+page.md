---
title: Intersection Observer
description: Wrapper for the IntersectionObserver API.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Wrapper for the IntersectionObserver API.

## Usage

```svelte
<script>
    import { intersectionObserver } from "@sveu/browser"

    let target = null

    $: target, intersectionObserver(
        target,
        ([{ isIntersecting }]) => {
            //    do something
        }
    )
</script>
```

## Example

```svelte live ln
<script lang="ts">
    import { intersectionObserver } from "@sveu/browser"

    let root: HTMLElement | null = null

    let target: HTMLElement | null = null

    let visible = false

    $: target, intersectionObserver(
        target,
        ([{ isIntersecting }]) => {
            visible = isIntersecting
        },
        { root }
    )
</script>

<div
    class="border border-dashed border-hex-ccc border-2 h-100 mx-8 mt-8 overflow-y-scroll root"
    bind:this="{root}">
    <p class="notice">Scroll me down!</p>
    <div class="target" bind:this="{target}">
        <p>Hello world!</p>
    </div>
</div>
<div class="text-center">
    Element the <span
        class:text-green="{visible}"
        class:text-red="{!visible}">{visible ? "inside" : "outside"}</span> viewport
</div>

<style>
    .text-green {
        color: green;
    }
    .text-red {
        color: red;
    }
    .notice {
        text-align: center;
        padding: 2em 0;
        margin-bottom: 300px;
        font-style: italic;
        font-size: 1.2rem;
        opacity: 0.8;
    }
    .target {
        border: 2px dashed blue;
        padding: 10px;
        max-height: 150px;
        margin: 0 2rem 400px;
    }
</style>
```

## API

### Arguments

| Name      | Description                  | Type                                             | Required |
| --------- | ---------------------------- | ------------------------------------------------------ | -- |
| **target**|The target element to observe.| `HTMLElement` or `SVGElement` or `null` or `undefined` | Yes|
| **fn**|The function to call when the target element is intersecting.|`IntersectionObserverCallback`|Yes|

<br />
<br />

### Options

| Name          | Description                                  | Type                                 |
| ------------- | -------------------------------------------- | ------------------------------------ |
| **root**      | The Element or Document whose bounds are used as the bounding box when testing for intersection. | `HTMLElement` or `SVGElement` or `null` or `undefined` |
| **margin**    | A string which specifies a set of offsets to add to the root's bounding box when calculating intersections. Defaults to "0px". | `string` |
| **threshold** | Either a single number or an array of numbers between 0.0 and 1. Defaults to 0.1. | `number` or `number[]` |

<br />
<br />

### Returns

| Name          | Description                                        | Type                          |
| ------------- | -------------------------------------------------- | ----------------------------- |
| **supported** | Whether the IntersectionObserver API is supported. | Readable<`boolean`>           |
| **stop**      | Stop the IntersectionObserver.                     | () => void                    |
