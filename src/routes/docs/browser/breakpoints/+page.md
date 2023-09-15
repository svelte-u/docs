---
title: Breakpoints
description: Reactive viewport breakpoints. 
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive viewport breakpoints.

## Usage

```svelte
<script>
    import {breakpoints} from "@sveu/browser"

    const { gt, gte, lt, lte, bn, xs, sm, md, lg, xl } = breakpoints({
        tablet: 640,
        laptop: 1024,
        desktop: 1280,
    })

    const laptop = bn('laptop', 'desktop')
</script>

<h1>{$laptop}</h1>
```

## Example

```svelte live ln
<script>
    import { breakpoints } from "@sveu/browser"

    const breakpoints_tailwind = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
    }

    const breakpoint = breakpoints(breakpoints_tailwind)

    const sm_width = breakpoints_tailwind.sm

    const sm = breakpoint.lt("sm")

    const sme = breakpoint.lte("sm")

    const md = breakpoint.bn("sm", "md")

    const lg = breakpoint.bn("md", "lg")

    const xl = breakpoint.bn("lg", "xl")

    const xxl = breakpoint.bn("xl", "2xl")

    const xxxl = breakpoint["2xl"]
</script>

<div class="text-center">
    <h1>SM Width: {sm_width}</h1>

    <h1>SM: {$sm}</h1>

    <h1>SME: {$sme}</h1>

    <h1>MD: {$md}</h1>

    <h1>LG: {$lg}</h1>

    <h1>XL: {$xl}</h1>

    <h1>XXL: {$xxl}</h1>

    <h1>XXXL: {$xxxl}</h1>
</div>
```

## API

### Arguments

| Name            | Description                          | Type                              | Required |
| --------------- | ------------------------------------ | --------------------------------- | -------- |
| **breakpoints** | The breakpoints to use.              | Breakpoints<`K`>                  | Yes      |

<br/>
<br/>

### Returns

| Name        | Description                                                        | Type                |
| ----------- | -------------------------------------------------------------------| ------------------- |
| **gt**      | Checks if the viewport is greater than the breakpoint.             | Readable<`boolean`> |
| **gte**     | Checks if the viewport is greater than or equal to the breakpoint. | Readable<`boolean`> |
| **lt**      | Checks if the viewport is smaller than the breakpoint.             | Readable<`boolean`> |
| **lte**     | Checks if the viewport is smaller than or equal to the breakpoint. | Readable<`boolean`> |
| **bn**      | Checks if the viewport is between the two breakpoints.             | Readable<`boolean`> |
| **shortcut**| Shortcut methods for each breakpoint                               | Readable<`boolean`> |
