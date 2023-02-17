---
title: QR Code
description: Wrapper for qrcode. 
---

# {{title}}

Wrapper for [qrcode](https://github.com/soldair/node-qrcode).

## ⚡️ Prerequisites

- [x] Install the ***qrcode*** package:

<div class="termy">

```console
$ pnpm add qrcode

---> 100%
```

</div>

## 🎬 Usage

```html
<script>
    import {qrcode} from "@sveu/extend/qrcode"

    const {output, pending, error} = qrcode("Hello")
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name        | Description                          | Type                          | Required |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **text**    | The text to encode                   | `string`                      | Yes      |

### 🙈 Options

Read the [qrcode documentation](https://github.com/soldair/node-qrcode#options-9)

### ↩️ Returns

| Name        | Description                          | Type                          |
| ----------- | ------------------------------------ | ----------------------------- |
| **output**  | The base64 encoded image             | `Readable<string>`            |
| **pending** | When the image is being generated    | `Readable<boolean>`           |
| **error**   | When an error occurs                 | `Readable<string | unknown>`  |

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { to_readable, to_writable } from "@sveu/shared"

    import QRCode from "qrcode"

    /**
     * Wrapper for qrcode.
     *
     * @param text - The text to encode.
     *
     * @see options in https://github.com/soldair/node-qrcode#qr-code-options
     *
     * @returns
     * - output - Readable store of the generated QR code.
     * - error  - Error if one occurred.
     * - pending - Whether the QR code is being generated.
     */
    export function qrcode(text: string, options?: QRCode.QRCodeToDataURLOptions) {
        const output = to_writable<string>("")

        const error = to_writable<boolean | unknown>(false)

        const pending = to_writable(true)

        /** Generate the QR code. */
        async function generate() {
            pending.set(true)

            error.set(false)

            try {
                output.set(await QRCode.toDataURL(text, options))
            } catch (e) {
                error.set(e)
            } finally {
                pending.set(false)
            }
        }

        generate()

        return {
            output: to_readable(output),
            error: to_readable(error),
            pending: to_readable(pending),
        }
    }
    ```
