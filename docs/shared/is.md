---
title: Is
description: A Collection of is functions that help you check the type of the value.
---

# {{title}}

{{description}}

## Browser

Check if the environment is browser or not.

### 🎬 Usage

```html
<script>
    import {browser} from "@sveu/shared"
</script>

<h1>browser? {browser ? 'yea' : "nope"}</h1>
```

## Is WS

Check if WebSocket is available or not.

### 🎬 Usage

```html
<script>
    import {is_ws} from "@sveu/shared"
</script>

<h1>Websocket? {is_ws ? 'yea' : "nope"}</h1>
```


## Is Set

Check if the value is Set or not.

### 🎬 Usage

```html
<script>
    import {is_set} from "@sveu/shared"
</script>

<h1>Set? {is_set(new Set()) ? 'yea' : "nope"}</h1>
```

## Is Boolean

Check if the value is Boolean or not.

### 🎬 Usage

```html
<script>
    import {is_boolean} from "@sveu/shared"
</script>

<h1>Boolean? {is_boolean(true) ? 'yea' : "nope"}</h1>
```

## Is Function

Check if the value is Function or not.

### 🎬 Usage

```html
<script>
    import {is_function} from "@sveu/shared"

    function test() {
        return "test"
    }   

</script>

<h1>Function? {is_function(test) ? 'yea' : "nope"}</h1>
```

## Is Number

Check if the value is Number or not.

### 🎬 Usage

```html
<script>
    import {is_number} from "@sveu/shared"
</script>

<h1>Number? {is_number(1) ? 'yea' : "nope"}</h1>
```

## Is String

Check if the value is String or not.

### 🎬 Usage

```html
<script>
    import {is_string} from "@sveu/shared"
</script>

<h1>String? {is_string("svelte") ? 'yea' : "nope"}</h1>
```

## Is Array

Check if the value is Array or not.

### 🎬 Usage

```html
<script>
    import {is_array} from "@sveu/shared"
</script>

<h1>Array? {is_array([]) ? 'yea' : "nope"}</h1>
```

## Is Object

Check if the value is Object or not.

### 🎬 Usage

```html
<script>
    import {is_object} from "@sveu/shared"
</script>

<h1>Object? {is_object({}) ? 'yea' : "nope"}</h1>
```

## Is Date

Check if the value is Date or not.

### 🎬 Usage

```html
<script>
    import {is_date} from "@sveu/shared"
</script>

<h1>Date? {is_date(new Date()) ? 'yea' : "nope"}</h1>
```

## Is Symbol

Check if the value is Symbol or not.

### 🎬 Usage

```html
<script>
    import {is_symbol} from "@sveu/shared"
</script>

<h1>Symbol? {is_symbol(Symbol()) ? 'yea' : "nope"}</h1>
```

## Is Windows

Check if the value is windows object or not.

### 🎬 Usage

```html
<script>
    import {is_window} from "@sveu/shared"
</script>

<h1>Windows? {is_window("f") ? 'yea' : "nope"}</h1>

<h1>Windows? {is_window(window) ? 'yea' : "nope"}</h1>
```



## Is Empty

Check if the value is empty or not.

### 🎬 Usage

```html
<script>
    import {is_empty} from "@sveu/shared"
</script>

<h1>Empty? {is_empty({}) ? 'yea' : "nope"}</h1>
```

## Is Equal

Check if the value is equal to the other value or not.

### 🎬 Usage

```html
<script>
    import {is_equal} from "@sveu/shared"

    const a = {a: 1}

    const b = {a: 1}
</script>


<h1>Equal? {is_equal(a, b) ? 'yea' : "nope"}</h1>
```

## Is Store

Check if the value is Store or not.

### 🎬 Usage

```html
<script>
    import {readable, writable} from "svelte/store"
    import {is_store} from "@sveu/shared"

    const a = readable(1)

    const b = writable(1)
</script>


<h1>is "A" a Store? {is_store(a) ? 'yea' : "nope"}</h1>
<br/>
<h1>is "B" a Store? {is_store(b) ? 'yea' : "nope"}</h1>
```

## Is Readable Store

Check if the value is Readable Store or not.

### 🎬 Usage

```html
<script>
    import {readable, writable} from "svelte/store"
    import {is_readable} from "@sveu/shared"

    const a = readable(1)

    const b = writable(1)
</script>


<h1>is "A" a Readable Store? {is_readable(a) ? 'yea' : "nope"}</h1>

<br/>

<h1>is "B" a Readable Store? {is_readable(b) ? 'yea' : "nope"}</h1>
```

## Is Readable Store Only

Check if the value is Readable Store Only or not.


### 🎬 Usage

```html
<script>
    import {readable, writable} from "svelte/store"
    import {is_readable_only} from "@sveu/shared"

    const a = readable(1)

    const b = writable(1)
</script>


<h1>is "A" a Readable Store Only? {is_readable_only(a) ? 'yea' : "nope"}</h1>

<br/>

<h1>is "B" a Readable Store Only? {is_readable_only(b) ? 'yea' : "nope"}</h1>
```

## Is Writable Store

Check if the value is Writable Store or not.

### 🎬 Usage

```html
<script>
    import {readable, writable} from "svelte/store"
    import {is_writable} from "@sveu/shared"

    const a = readable(1)

    const b = writable(1)
</script>

<h1>is "A" a Writable Store? {is_writable(a) ? 'yea' : "nope"}</h1>

<br/>

<h1>is "B" a Writable Store? {is_writable(b) ? 'yea' : "nope"}</h1>
```

## Is Partial Writable Store

Check if the store contains `subscribe` and `set` methods, valid use case is `customStore` that returns the `subscribe` and `set` methods.

### 🎬 Usage

```html
<script>
    import {readable, writable} from "svelte/store"
    import {is_partial_writable} from "@sveu/shared"

    const a = readable(1)

    const b = writable(1)

    const c = {
        subscribe: () => {},
        set: () => {}
    }
</script>

<h1>is "A" a Partial Writable Store? {is_partial_writable(a) ? 'yea' : "nope"}</h1>

<br/>

<h1>is "B" a Partial Writable Store? {is_partial_writable(b) ? 'yea' : "nope"}</h1>

<br/>

<h1>is "C" a Partial Writable Store? {is_partial_writable(c) ? 'yea' : "nope"}</h1>
```


## 👀 Source Code

??? tip "Source Code"

    ```ts
    import type { Readable, Writable } from "svelte/store"

    import { type } from "../type"
    import type { MaybeStore } from "./types"

    export const browser = typeof window !== "undefined"

    export const is_ws = typeof WebSocket !== "undefined"

    export function is_set<T>(value?: T): boolean {
        return type(value) === "set"
    }

    export function is_boolean<T>(value?: T): boolean {
        return type(value) === "boolean"
    }

    export function is_function<T>(value?: T): boolean {
        return type(value) === "function"
    }

    export function is_number<T>(value?: T): boolean {
        return type(value) === "number"
    }

    export function is_string<T>(value?: T): boolean {
        return type(value) === "string"
    }

    export function is_object<T>(value?: T): boolean {
        return type(value) === "object"
    }

    export function is_array<T>(value?: T): boolean {
        return type(value) === "array"
    }

    export function is_date<T>(value?: T): boolean {
        return type(value) === "date"
    }

    export function is_symbol<T>(value?: T): boolean {
        return type(value) === "symbol"
    }

    export function is_window<T>(value?: T): boolean {
        return typeof window !== "undefined" && type(value) === "window"
    }

    export function is_readable<T>(store: any): store is Readable<T> {
        return store && is_function(store?.subscribe)
    }

    export function is_writable<T>(store: any): store is Writable<T> {
        return (
            store &&
            ["subscribe", "set", "update"].every((n) => is_function(store[n]))
        )
    }

    export function is_partial_writable<T>(store: any): store is Writable<T> {
        return store && ["subscribe", "set"].every((n) => is_function(store[n]))
    }

    export function is_readable_only<T>(store: any): store is Readable<T> {
        return store && is_function(store?.subscribe) && !is_writable(store)
    }

    export function is_store<T>(store: any): store is MaybeStore<T> {
        return is_readable(store) || is_writable(store)
    }

    export function is_empty(value: any) {
        if (value === true || value === false) return true

        if (value === null || value === undefined) return true

        if (is_number(value)) return parseInt(value) === 0

        if (is_date(value)) return isNaN(value)

        if (is_function(value)) return false

        if (is_symbol(value)) return false

        const length = (value as any).length

        if (is_number(length)) return length === 0

        const size = (value as any).size

        if (is_number(size)) return size === 0

        const keys = Object.keys(value).length

        return keys === 0
    }

    export function is_equal<T, U>(x: T, y: U): boolean {
        if (Object.is(x, y)) return true

        if (x instanceof Date && y instanceof Date)
            return x.getTime() === y.getTime()

        if (x instanceof RegExp && y instanceof RegExp)
            return x.toString() === y.toString()

        if (
            typeof x !== "object" ||
            x === null ||
            typeof y !== "object" ||
            y === null
        ) {
            return false
        }

        const keys_x = Reflect.ownKeys(x as unknown as object)

        const keys_y = Reflect.ownKeys(y as unknown as object)

        if (keys_x.length !== keys_y.length) return false

        for (let i = 0; i < keys_x.length; i++) {
            if (!Reflect.has(y as unknown as object, keys_x[i])) return false
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //   @ts-ignore
            if (!is_equal(x[keys_x[i]], y[keys_x[i]])) return false
        }
        return true
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    export const noop = () => {}
    ```
