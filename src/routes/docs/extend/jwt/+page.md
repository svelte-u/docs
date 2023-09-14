---
title: Jwt
description: Wrapper for jwt-decode. 
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Wrapper for [jwt-decode](https://github.com/auth0/jwt-decode).

## ⚡️ Prerequisites

@install-pkg(jwt-decode)

## Usage

```svelte
<script>
    import {jwt} from "@sveu/extend/jwt"

    const { header, payload } = jwt("your-token")

    console.log(header)

    console.log(payload)
</script>
```

## Example

<Tabs activeName="Default">

  <TabPanel name="Default">

```svelte live ln
<script>
    import { jwt } from "@sveu/extend/jwt" // [svp! hl:1]

    let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

    $: ({ header, payload } = jwt(token)) // [svp! hl:1]
</script>

<input bind:value="{token}" />

<h1>Header:</h1>
<h2>{JSON.stringify(header)}</h2>

<hr />

<h1>Payload:</h1>
<h2>{JSON.stringify(payload)}</h2>
```

</TabPanel>

<TabPanel name="Fallback">

```svelte live ln
<script>
    import { jwt } from "@sveu/extend/jwt" // [svp! hl:1]

    let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

    $: ({ header, payload } = jwt(token, { fallback: "Sorry" })) // [svp! hl:1]
</script>

<input bind:value="{token}" />

<h1>Header:</h1>
<h2>{JSON.stringify(header)}</h2>

<hr />

<h1>Payload:</h1>
<h2>{JSON.stringify(payload)}</h2>
```

</TabPanel>

<TabPanel name="onError">

```svelte live ln
<script>
    import { jwt } from "@sveu/extend/jwt" // [svp! hl:1]

    function on_error(error) {
        alert(error.message)
    }

    let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

    $: ({ header, payload } = jwt(token, { onError: on_error })) // [svp! hl:1]
</script>

<input bind:value="{token}" />

<h1>Header:</h1>
<h2>{JSON.stringify(header)}</h2>

<hr />

<h1>Payload:</h1>
<h2>{JSON.stringify(payload)}</h2>
```

</TabPanel>

</Tabs>

## API

### Arguments

| Name      | Description                          | Type                       | Required |
| --------- | ------------------------------------ | -------------------------- | -------- |
| **value** | JWT string.                          | `string`                   | Yes      |

<br/>
<br/>

### Options

| Nam          | Description                                           | Type        | Default     |
| ------------ | ----------------------------------------------------  | ----------- | ----------- |
| **fallback** | Value returned when encounter error on decoding.      | `any`       | null        |
| **onError**  | Error callback for decoding.         | `(error: unknown) => void`   | undefined   |
