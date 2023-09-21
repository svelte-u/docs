---
title: To Number
description: Convert a value to a number.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive async state.

## Usage

```svelte
<script>
    import {toNumber} from "@sveu/shared"
</script>

{toNumber("1.5", {method: "int"})}
<hr/>
{toNumber("edc", {nanToZero: true})}
```

## Example

```svelte live ln
<script>
    import { toNumber } from "@sveu/shared"
</script>

{toNumber("1.5", { method: "int" })}
<hr />
{toNumber("edc", { nanToZero: true })}
```

## API

### Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **value**           | The value to be converted            | `string | number`             | Yes      |

<br />
<br />

### Options

| Name                | Description                          | Type                          | Default  |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **method**          | The method to be used to convert     | `int` or `float`              | float    |
| **nanToZero**       | Convert NaN to zero                  | `boolean`                     | False    |
| **radix**           | The base in mathematical numeral systems passed to parseInt. | `number` | undefined |
