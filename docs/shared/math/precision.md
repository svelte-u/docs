---
title: Precision (Math)
description: Returns a number with a fixed precision.
demo_link: https://svelte.dev/repl/6cdf4fe1ce414890bf889e502790e007?version=3.55.1
---

# Precision

{{description}}

## 🎬 Usage

```html
<script>
    import {precision} from "@sveu/shared/math"

    let number = 45.125

    const result = precision(number, 2)
</script>

<h1>{result}</h1>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **value**           | The number to be precision                   | `number`              | `yes`    |
| **digits**          | The number of digits to be precision         | `number`              | `yes`    |

### 🙈 Options

| Name     | Description                                        | Type        | Default                  |
| -------- | -------------------------------------------------- | ----------- | ------------------------ |
| **math** | Method to use for rounding, floor or ceil or round | `"floor" | "ceil" | "round"` | `round` |

### ↩️ Returns

Precision number.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { PrecisionOptions } from "../../utils"

    /**
     * Set the precision of a number.
     *
     * @param value - The value to set the precision of
     *
     * @param digits - The number of digits to keep
     *
     * @param options - The options to use
     * - `math` - Method to use for rounding, floor or ceil or round (default: "round")
     *
     */
    export function precision(
        value: number,
        digits: number,
        options?: PrecisionOptions
    ): number | string {
        const power = 10 ** digits
        return Math[options?.math || "round"](value * power) / power
    }
    ```
