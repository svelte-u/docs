---
title: Adjust with unit
description: Adjust a value with unit.
demo_link: https://svelte.dev/repl/1c15cc2d3ba742fcb02906b17ec30da1?version=3.55.1
---

# {{title}}

Adjust a value with unit.

## 🎬 Usage

```html
<script>
    import {adjust_with_unit} from "@sveu/shared"

    let delta = 1

    let target = "10px"

    $: result = adjust_with_unit(target, delta)

</script>

<h1>Result: {$result}</h1>

<label for="delta">Delta</label>
<input id="delta" type="number" bind:value="{delta}">

<label for="target">Target</label>
<input id="target" type="text" bind:value="{target}">
<br/>

<button on:click="{() => result.inc()}">Increase</button>

<button on:click="{() => result.dec()}">Decrease</button>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                        | Type                            | Required |
| ------------------- | ---------------------------------- | ------------------------------- | -------- |
| **target**          | Value to adjust                    | `MaybeStore<string | number>`   | Yes      |
| **delta**           | Amount to adjust by                | `number`                        | Yes      |

### ↩️ Returns

A store that contains the adjusted value with `inc` and `dec` methods.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { to_writable } from "../to_writable"
    import type { MaybeStore } from "../utils"

    /**
     * Adjust a value with unit
     *
     * @param target - Target value
     *
     * @param delta - Delta value
     *
     * @example '2px' + 1 = '3px'
     * @example '2px' - 1 = '2px'
     * @example '15em' + (-2) = '13em'
     * @example '15em' - (-2) = '17em'
     *
     * @returns - A store with `inc` and `dec` methods
     */
    export function adjust_with_unit(
        target: MaybeStore<string | number>,
        delta: number
    ) {
        const { subscribe, update } = to_writable(target)

        function update_value(_target: string | number, type: string) {
            if (typeof _target === "number")
                return type === "inc" ? _target + delta : _target - delta

            const value = _target.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || ""

            const unit = _target.slice(value.length)

            const result =
                type === "inc"
                    ? parseFloat(value) + delta
                    : parseFloat(value) - delta

            if (Number.isNaN(result)) return _target

            return result + unit
        }

        return {
            subscribe,
            inc: () => update((n) => update_value(n, "inc")),
            dec: () => update((n) => update_value(n, "dec")),
        }
    }
    ```
