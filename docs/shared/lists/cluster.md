---
title: Cluster (Lists)
description: Split the given list into chunks of the given size.
demo_link: https://svelte.dev/repl/640bdc56e5f342fb9e0f5f299c02590c?version=3.55.1
---

# Cluster

{{description}}

## 🎬 Usage

```html
<script>
    import {cluster} from "@sveu/shared/lists"

    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const clusters = cluster(list, , {size: 3}) // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **list**            | The list to cluster                          | `T[]`                 | Yes      |

### 🙈 Options

| Name                | Description                                          | Type        | Default     |
| ------------------- | ---------------------------------------------------- | ----------- | ----------- |
| **size**            | The size of each cluster                             | `number`    | `2`         |

### ↩️ Returns

Boolean

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import type { ClusterOptions } from "../../utils"

    /**
     * Split a list into sublists.
     *
     * @param list - The list to split.
     *
     * @param options - The options to use.
     * - `size` - The max size of each sublist. Default: `2`
     *
     * @returns List of sublists.
     */
    export function cluster<T>(list: T[], options: ClusterOptions = {}): T[][] {
        const { size = 2 } = options

        if (size === 0) return []

        const cluster_count = Math.ceil(list.length / size)

        return new Array(cluster_count).fill(null).map((_c: null, i: number) => {
            return list.slice(i * size, i * size + size)
        })
    }
    ```
