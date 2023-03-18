---
title: Sortable
description: Wrapper for SortableJS.
demo_link: https://svelte.dev/repl/54884da3a6324731aaf424a287d03705?version=3.57.0
---

# {{title}}

Wrapper for [SortableJS](https://github.com/SortableJS/Sortable)

## ⚡️ Prerequisites

- [x] Install the ***SortableJS*** package:

<div class="termy">

```console
$ pnpm add sortablejs

---> 100%
```

</div>

## 🎬 Usage

```html
<script>
    import { sortable } from "@sveu/extend/sortable"
    import type { Options } from "sortablejs"

    let list = [
        { id: 1, name: "a" },
        { id: 2, name: "b" },
        { id: 3, name: "c" },
    ]

    const options: Options = {
        animation: 500,
    }
</script>

<ul
    use:sortable="{options}">
</ul>
```

## 👩‍💻API

### 🙈 Options

Read the [SortableJS docs](https://github.com/SortableJS/Sortable#options)

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import Sortable from "sortablejs"
    import type { Options } from "sortablejs"

    /**
     * Move an element from one index to another in the same list.
     *
     * @param list - The list to move the element in.
     *
     * @param from - The index to move the element from.
     *
     * @param to - The index to move the element to.
     *
     */
    export function move_list<T>(list: T[], from: number, to: number) {
        const _list = list

        const element = _list[from]

        _list.splice(from, 1)

        _list.splice(to, 0, element)

        return _list
    }

    /**
     * Wrapper for the SortableJS.
     *
     * @param target - The element to make sortable.
     *
     * @param options - The options to pass to SortableJS. [See SortableJS docs](https://github.com/SortableJS/Sortable#options)
     *
     */
    export function sortable(target: HTMLElement, options: Options = {}) {
        const _sortable = new Sortable(target, { ...options })

        return {
            destroy() {
                _sortable.destroy()
            },
        }
    }
    ```
