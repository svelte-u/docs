---
title: Jwt
description: Wrapper for jwt-decode. 
demo_link: https://svelte.dev/repl/99f8ff7bb0674f3c9b4c985810ecb84d?version=3.50.1
---

# {{title}}

Wrapper for [jwt-decode](https://github.com/auth0/jwt-decode).

## ⚡️ Prerequisites

- [x] Install the ***jwt-decode*** package:

<div class="termy">

```console
$ pnpm add jwt-decode

---> 100%
```

</div>

## 🎬 Usage

```html
<script>
    import {jwt} from "@sveu/extend/jwt"

    const token = ""

    const { header, payload } = jwt(token)
</script>

<h1>Header: {JSON.stringify(header)}</h1>

<h1>Payload: {JSON.stringify(payload)}</h1>

```

## 👩‍💻API

### 👻 Arguments

| Name        | Description                          | Type                          | Required |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **token**   | The token to decode                  | `string`                      | Yes      |

### 🙈 Options

| Name         | Description                                 | Type                       | Default      |
| ------------ | ------------------------------------------- | -------------------------  | ------------ |
| **fallback** | The value to return if the token is invalid | **any**                    | `null`       |
| **on_error** | The function to call if the token is invalid| **function**               | `No default` |

### ↩️ Returns

| Name        | Description                          | Type                          |
| ----------- | ------------------------------------ | ----------------------------- |
| **header**  | The header of the JWT                | object                        |
| **payload** | The payload of the JWT               | object                        |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>


## Source Code 👀

??? tip "Source Code"

    ```ts
    import jwt_decode from "jwt-decode"
    import type { JwtDecodeOptions, JwtHeader, JwtPayload } from "jwt-decode"

    export interface JwtOptions<Fallback> {
        /**
         * Value returned when encounter error on decoding
         *
         * @defaultValue null
         */
        fallback?: Fallback

        /**
         * Error callback for decoding
         */
        on_error?: (error: unknown) => void
    }

    /**
     * Decode JWT
     *
     * @param value - JWT string
     *
     * @param options - Options
     * - `fallback` - Value returned when encounter error on decoding. Default: `null`
     * - `on_error` - Error callback for decoding.
     *
     * @returns JWT header and payload
     */
    export function jwt<
        Payload extends object = JwtPayload,
        Header extends object = JwtHeader,
        Fallback = null
    >(value: string, options: JwtOptions<Fallback> = {}) {
        const { on_error, fallback = null } = options

        function decode_with_fallback<T extends object>(
            value: string,
            options?: JwtDecodeOptions
        ) {
            try {
                return jwt_decode<T>(value, options)
            } catch (err) {
                on_error?.(err)
                return fallback as Fallback
            }
        }

        const header = decode_with_fallback<Header>(value, { header: true })

        const payload = decode_with_fallback<Payload>(value)

        return {
            header,
            payload,
        }
    }
    ```
