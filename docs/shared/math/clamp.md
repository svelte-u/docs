---
title: Clamp
description: Clamps a number between a minimum and maximum number.
demo_link: https://svelte.dev/repl/5ba002e72b9f453e83baf71ac48c2144?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {clamp} from "@sveu/shared/math"
    let min = 0

    let max = 100

    let value = 50

    $: result = clamp(value, min, max)

</script>

<h1>{result}</h1>

<label for="min">Min</label>
<input type="number" bind:value="{min}" id="min">

<label for="max">Max</label>
<input type="number" bind:value="{max}" id="max">

<label for="value">Value</label>
<input type="number" bind:value="{value}" id="value">
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **value**           | The number to clamp.                         | `number`              | Yes      |
| **min**             | The minimum number to clamp.                 | `number`              | Yes      |
| **max**             | The maximum number to clamp.                 | `number`              | Yes      |

### ↩️ Returns

A number between the minimum and maximum number.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    /**
     * Clamp a value between two other values.
     *
     * @param value - The value to clamp
     *
     * @param min - The minimum value
     *
     * @param max - The maximum value
     *
     * @returns The clamped value
     */
    export function clamp(value: number, min: number, max: number): number {
        return Math.min(max, Math.max(min, value))
    }
    ```
