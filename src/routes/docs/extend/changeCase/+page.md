---
title: Change Case
description: Wrapper for change-case.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Wrapper for [change-case](https://github.com/blakeembrey/change-case).

## ⚡️ Prerequisites

@install-pkg(change-case)

## Usage

```svelte
<script>
    import {changeCase} from "@sveu/extend/changeCase"
    
    let value = "Svelte Utility"
    
    console.log(changeCase(value, "snakeCase"))
</script>
```

## Example

```svelte live ln
<script lang="ts">
    import {changeCase} from "@sveu/extend/changeCase"

    const cases = [
        "camelCase",
        "capitalCase",
        "constantCase",
        "dotCase",
        "headerCase",
        "noCase",
        "paramCase",
        "pascalCase",
        "pathCase",
        "sentenceCase",
        "snakeCase",
    ]

    let value = "Svelte Utility"

    let selected = "snakeCase"
</script>

<h1 class="font-bold mt-5 text-lg text-center">{changeCase(value, selected)}</h1>

<h2>Select Case:</h2>
<select bind:value="{selected}">
    {#each cases as _case}
        <option value="{_case}">{changeCase(_case, "capitalCase")}</option> // [svp! hl:1]
    {/each}
</select>
```

## API

### Arguments

| Name      | Description                          | Type                       | Required |
| --------- | ------------------------------------ | -------------------------- | -------- |
| **input** | The string to convert                | `string`                   | Yes      |
| **type**  | The type of conversion to perform    | `string`                   | Yes      |

<br/>
<br/>

### Options

Read the [change-case documentation](https://github.com/blakeembrey/change-case#options) for more information.
