---
title: Compose (Curry)
description: A composition of functions, each function is given the next function as an argument and must call it to continue executing.
demo_link: https://svelte.dev/repl/3fc47278d8e448e4a6ac808015ebd265?version=3.55.1
---

# Compose

{{description}}

## 🎬 Usage

```html
<script>
    import {compose} from "@sveu/shared/curry"

    const zero = (fn) => () => fn(0)

    const size = (fn) => (num) => fn({ num })

    const increment =
                (fn) =>
    ({ num }) =>
    fn({ num: num + 1 })

    const args = (arg) => (args) => args[arg]

    const composed = compose(zero, size, increment, increment, args("num"))

    const decomposed = zero(size(increment(increment(args("num")))))

    const expected = decomposed()

    const result = composed()
</script>

<h1>Result: {result}</h1>

<h1> Expected: {expected}</h1>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **fn**             | The function to compose                       | `Fn[]`                | `yes`    |

### ↩️ Returns

A composed function.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    export type Fn<TArgs = any, KReturn = any | void> = (
        ...args: TArgs[]
    ) => KReturn

    /**
     * a composition of functions, each function is given the next function as an argument and must call it to continue executing.
     *
     * @param fn - the function to compose
     *
     * @returns the composed function
     */
    export function compose(...fn: Fn[]) {
        return fn.reverse().reduce((acc, _fn) => _fn(acc))
    }
    ```
