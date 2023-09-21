---
title: Make Destructurable
description: Make isomorphic destructurable for object and array at the same time.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Make isomorphic destructurable for object and array at the same time. [Read more about](https://antfu.me/posts/destructuring-with-object-or-array).

## Usage

```svelte
<script>
    import {makeDestructurable} from "@sveu/shared"

    const foo = { name: 'foo' }

    const bar = 1024

    const obj = makeDestructurable(
        { foo, bar },
        [foo, bar]
    )


    const { foo, bar } = obj
    
    const [ foo, bar ] = obj

</script>
```

## Example

```svelte live ln
<script>
    import { makeDestructurable } from "@sveu/shared"

    const foo = { name: "foo" }

    const bar = 1024

    const obj = makeDestructurable({ foo, bar }, [foo, bar])

    let { foo: foo1, bar: bar1 } = obj

    let [foo2, bar2] = obj
</script>

<div class="text-center">
    <h1>Object like</h1>
    {foo1.name} is {bar1}
    <hr />
    <h1>Array like</h1>
    {foo2.name} is {bar2}
</div>
```

## API

### Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **obj**             | The object to make destructurable.   | Record<`string, any`>         | Yes      |
| **arr**             | The array to make destructurable.    | `T[]`                         | Yes      |
