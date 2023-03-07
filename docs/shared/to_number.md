---
title: To Number
description: Convert a value to a number.
demo_link: https://svelte.dev/repl/0ea804b174fe4c8cada62a5143d3166e?version=3.55.1
---

# {{title}}

Is a function that convert a value to a number.

## 🎬 Usage

```html
<script>
    import {to_number} from "@sveu/shared"
</script>

{to_number("1.5", {method: "int"})}
<hr/>
{to_number("edc", {nan_to_zero: true})}
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **value**           | The value to be converted            | `string | number`             | Yes      |

### 🙈 Options

| Name                | Description                          | Type                          | Default  |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **method**          | The method to be used to convert     | `"int" | "float"`             | float    |
| **nan_to_zero**     | Convert NaN to zero                  | `boolean`                     | False    |
| **radix**           | The base in mathematical numeral systems passed to parseInt. | `number` | undefined |

### ↩️ Returns

A number.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import type { ToNumberOptions } from "../utils"

    /**
     * Convert a value to a number.
     *
     * @param value - The value to convert to a number.
     *
     * @param options - Options to control the conversion.
     *
     * @returns The converted number.
     */
    export function to_number(
        value: number | string,
        options: ToNumberOptions = {}
    ): number {
        const { method, radix, nan_to_zero } = options

        let _method: "parseFloat" | "parseInt" = "parseFloat"

        if (method === "int") _method = "parseInt"

        let resolved =
            typeof value === "number" ? value : Number[_method](value, radix)

        if (nan_to_zero && isNaN(resolved)) resolved = 0

        return resolved
    }
    ```
