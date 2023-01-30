---
title: Make Destructurable
description: Make isomorphic destructurable for object and array at the same time.
demo_link: https://svelte.dev/repl/f3186658dc0c4206a7f5210e59151699?version=3.55.1
---

# {{title}}

{{description}} [Read more about](https://antfu.me/posts/destructuring-with-object-or-array).

## 🎬 Usage

```html
<script>
    import {make_destructurable} from "@sveu/shared"

    const foo = { name: 'foo' }

    const bar = 1024

    const obj = make_destructurable(
        { foo, bar },
        [foo, bar]
    )


    const { foo, bar } = obj
    
    const [ foo, bar ] = obj

</script>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **obj**             | The object to make destructurable.   | `Record<string, any>`         | Yes      |
| **arr**             | The array to make destructurable.    | `any[]`                       | Yes      |

### ↩️ Returns

A destructurable object.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## 👀 Source Code

??? tip "Source Code"

    ```ts
    /**
     * Make isomorphic destructurable for object and array at the same time
     *
     * @param obj - The object to make destructurable.
     *
     * @param arr - The array to use for destructuring.
     *
     * @see https://antfu.me/posts/destructuring-with-object-or-array
     *
     * @returns The destructurable object.
     */
    export function make_destructurable<
        Obj extends Record<string, unknown>,
        Arr extends readonly any[]
    >(obj: Obj, arr: Arr): Obj & Arr {
        if (typeof Symbol !== "undefined") {
            const clone = { ...obj }

            Object.defineProperty(clone, Symbol.iterator, {
                enumerable: false,
                value() {
                    let index = 0
                    return {
                        next: () => ({
                            value: arr[index++],
                            done: index > arr.length,
                        }),
                    }
                },
            })

            return clone as Obj & Arr
        } else {
            return Object.assign([...arr], obj) as unknown as Obj & Arr
        }
    }
    ```
