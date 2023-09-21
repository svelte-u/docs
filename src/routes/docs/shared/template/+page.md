---
title: Template
description: Replace all the template expressions with the corresponding values from the data object.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Is a function that replace all the template expressions with the corresponding values from the data object.

## Usage

```svelte
<script>
    import {template} from "@sveu/shared"

    const str = `Hi {{name}},

    Welcome to {{platform}}
`
    const result = template(str, {"name": "Beatrice", "platform": "svelte"})
</script>

<h1>{result}!</h1>
```

## Example

```svelte live ln
<script>
    import { template } from "@sveu/shared"

    const str = `Hi %name%,
    Welcome to %platfrom%
    `
    const result = template(
        str,
        { name: "Beatrice", platfrom: "svelte" },
        /\%(.+?)\%/g
    )
</script>

<h1 class="text-center">{result}!</h1>
```

## API

### Arguments

| Name      | Description                                                 | Type             | Required |
| --------- | ----------------------------------------------------------- | ---------------- | -------- |
| **str**   | The string to be searched                                   | `string`         | Yes      |
| **data**  | The data object to be used to replace the search expression | Record<`string`, `any`> | Yes|
| **regex** | The search expression                                       | `RegExp`         | No       |
