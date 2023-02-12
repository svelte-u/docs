---
title: Filter
description: Filter unwanted values from an object
demo_link: https://svelte.dev/repl/d7077b5f7abd475aa87ea46304c43a87?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {filter} from "@sveu/shared/dicts"

    const obj = {created_at: "2022-10-10", updated_at: "2021-10-10", deleted_at: "2020"}

    const falsy_obj = {a: 1, b: 2, c: 0, d: null, e: undefined, f: false, g: ""}


    filter(obj, (x) => x.includes("2022")) // { updated_at: "2021-10-10" ,deleted_at: "2020" }

    filter(falsy_obj) // {a: 1, b: 2}
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description            | Type                                        | Required |
| ------------------- | ---------------------- | ------------------------------------------- | -------- |
| **obj**             | object to filter       | `Record<string | number | symbol, any>`     | `yes`    |
| **filter**          | filter function        | `(value: any) => boolean`                   | `no`     |

### ↩️ Returns

A new object with filtered values.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    /**
     * filter unwanted values.
     *
     * @param obj - the object to be filtered
     *
     * @param filter - the filter function, if the function returns true, the value will be removed.
     *
     * @returns the filtered object
     */
    export function filter<RemovedKeys extends string, T>(
        obj: Record<string | number | symbol, any>,
        filter: (value: any) => boolean = (x) => !x
    ): Omit<T, RemovedKeys> {
        if (!obj) return {} as T

        return Object.keys(obj).reduce((acc, key) => {
            if (filter(obj[key])) {
                return acc
            } else return { ...acc, [key]: obj[key] }
        }, {} as T)
    }
    ```
