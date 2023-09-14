---
title: Fuse
description: Wrapper for fuse.js.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Wrapper for [fuse.js](https://github.com/krisk/Fuse).

## ⚡️ Prerequisites

@install-pkg(fuse.js)

## Usage

```svelte
<script>
    import {fuse} from "@sveu/extend/fuse"

    const data = [
        {name: "John", age: 20},
        {name: "Jane", age: 21},
        {name: "Jack", age: 22},
    ]

    const {results} = fuse("John", data, {
        fuseOptions: {
            keys: ["name"]
        }
    })
</script>
```

## Example

```svelte live ln
<script>
    import { fuse } from "@sveu/extend/fuse" // [svp! hl:1]

    const data = [
    {
        firstName: "Roslyn",
        lastName: "Mitchell",
    },
    {
        firstName: "Cathleen",
        lastName: "Matthews",
    },
    {
        firstName: "Carleton",
        lastName: "Harrelson",
    },
    {
        firstName: "Allen",
        lastName: "Moores",
    },
    {
        firstName: "John",
        lastName: "Washington",
    },
    {
        firstName: "Brooke",
        lastName: "Colton",
    },
    {
        firstName: "Mary",
        lastName: "Rennold",
    },
    {
        firstName: "Nanny",
        lastName: "Field",
    },
    {
        firstName: "Chasity",
        lastName: "Michael",
    },
    {
        firstName: "Oakley",
        lastName: "Giles",
    },
    {
        firstName: "Johanna",
        lastName: "Shepherd",
    },
    {
        firstName: "Maybelle",
        lastName: "Wilkie",
    },
    {
        firstName: "Dawson",
        lastName: "Rowntree",
    },
    {
        firstName: "Manley",
        lastName: "Pond",
    },
    {
        firstName: "Lula",
        lastName: "Sawyer",
    },
    {
        firstName: "Hudson",
        lastName: "Hext",
    },
    {
        firstName: "Alden",
        lastName: "Senior",
    },
    {
        firstName: "Tory",
        lastName: "Hyland",
    },
    {
        firstName: "Constance",
        lastName: "Josephs",
    },
    {
        firstName: "Larry",
        lastName: "Kinsley",
    },
    ]

    let search = ""

    let matchWhenEmpty = false

    let limit

    let results = []

    $: ({ results } = fuse(search, data, { // [svp! hl:7]
        fuseOptions: {
            keys: ["firstName", "lastName"],
        },
        matchWhenEmpty,
        limit,
    }))

</script>

<form class="flex flex-col justify-start">
    <div>
    <label for="search">Search</label>
    <input id="search" type="search" bind:value="{search}" />
    </div>
    <br/>
    <div>
    <label for="limit">limit</label>
    <input id="limit" type="number" bind:value="{limit}" />
    </div>

    <br/>

    <div>
    <label for="match_when_empty">Match When Empty</label>
    <input
        id="match_when_empty"
        type="checkbox"
        bind:checked="{matchWhenEmpty}" />
    </div>
</form>

<ul class="space-y-3 my-3 text-center">
    {#each results as result}
        <li>{`${result.item.firstName} ${result.item.lastName}`}</li>
    {/each}
</ul>
```

## API

### Arguments

| Name      | Description                          | Type                       | Required |
| --------- | ------------------------------------ | -------------------------- | -------- |
| **search**| The text to search.                  | `string`                   | Yes      |
| **data**  | The data to search in.               | `T[]`                      | Yes      |

<br/>
<br/>

### Options

| Name                | Description                                          | Type        | Default     |
| ------------------- | ---------------------------------------------------- | ----------- | ----------- |
| **limit**           | The maximum number of results to return.             | `number`    | Infinity  |
| **matchWhenEmpty**  | Whether to return all results when the search is empty.| `boolean` | undefined   |
| **fuseOptions**| [Read more](https://fusejs.io/api/options.html)|`Fuse.IFuseOptions<T>`| No default, required|
