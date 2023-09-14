---
title: Sortable
description: Wrapper for SortableJS.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Wrapper for [SortableJS](https://github.com/SortableJS/Sortable)

## ⚡️ Prerequisites

@install-pkg(sortablejs)

## Usage

```svelte
<script>
    import { sortable } from "@sveu/extend/sortable"

    let list = [
        { id: 1, name: "a" },
        { id: 2, name: "b" },
        { id: 3, name: "c" },
    ]
</script>

<ul use:sortable>
    {#each list as item}
        <li>
            {item.name}
        </li>
    {/each}
</ul>
```

## Example

```svelte live ln
<script>
    import { sortable, move_list } from "@sveu/extend/sortable" // [svp! hl:1]

    let list = [
        { id: 1, name: "a" },
        { id: 2, name: "b" },
        { id: 3, name: "c" },
    ]

    let _list = list

    const options = { // [svp! hl:6]
        animation: 500,
        onUpdate: (evt) => {
            _list = move_list(list, evt?.oldIndex ?? 0, evt?.newIndex ?? 0)
        },
    }
</script>

<!-- // [svp! hl:3] -->
<ul 
    use:sortable="{options}"
    class="rounded flex flex-col m-auto bg-gray-500/5 h-200px p-4 w-300px gap-2">
    {#each list as item}
        <li class="rounded bg-gray-500/5 p-3 h20">
            {item.name}
        </li>
    {/each}
</ul>

<pre class="text-center">
    {JSON.stringify(_list, null)}
</pre>
```

## API

### Options

Read the [SortableJS docs](https://github.com/SortableJS/Sortable#options)
