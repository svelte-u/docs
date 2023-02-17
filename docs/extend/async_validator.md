---
title: Async Validator
description: Wrapper for async-validator. 
demo_link: https://svelte.dev/repl/1779dc6afb884f799ef82ed7895e584d?version=3.52.0
---
# {{title}}

Wrapper for [async-validator](https://github.com/yiminghe/async-validator).

## ⚡️ Prerequisites

- [x] Install the ***async-validator*** package:

<div class="termy">

```console
$ pnpm add async-validator

---> 100%
```

</div>

## 🎬 Usage

```html
<script>
    import {validator} from "@sveu/extend/async_validator"

    const form = { email: "", name: "", age: "" }

    const rules = {
        name: {
            type: "string",
            min: 5,
            max: 20,
            required: true,
        },
        age: {
            type: "number",
            required: true,
        },
        email: [
            {
                type: "email",
                required: true,
            },
        ],
    }

    const { errors, error, error_fields, pass, finished } = validator(
        form,
        rules
    )
</script>

```

??? note

    The `async_validator` module expose another function called `async_validator`, the different from 
    `validator` is that the `async_validator` function returns a `Promise` instead of a `Readable` store.
    It's useful when want to validate in the server side or in async functions.

## 👩‍💻API

### 👻 Arguments

| Name        | Description                          | Type                          | Required |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **value**   | The value to be validated.           | `object`                      | `Yes`    |
| **rules**   | The rules to validate the value.     | `Rules` from `async-validator`| `Yes`    |

### 🙈 Options

Read the [async-validator](https://github.com/yiminghe/async-validator#options) documentation for more information.

### ↩️ Returns

| Name        | Description                                 | Type                                   |
| ----------- | ------------------------------------------- | -------------------------------------- |
| **pass**    | Whether the validation passed.              | `Readable<boolean> || Boolean`          |
| **finished**| Whether the validation finished.(only in `validator`) | `Readable<boolean>`          |
| **error**   | Error instance                              | `Readable<AsyncValidatorError | null> || AsyncValidatorError | null` |
| **errors**  | List of errors info                         | `Readable<ValidateError[] | undefined> || ValidateError[] | undefined>`|
| **error_fields**| Key-value pairs of field names and error information. | `Readable<Record<string, ValidateError[]> | undefined> || Record<string, ValidateError[]> | undefined>`|

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import type { Readable } from "svelte/store"

    import { to_readable, to_writable } from "@sveu/shared"
    import type { Dict } from "@sveu/shared"

    import Schema from "async-validator"
    import type { Rules, ValidateError, ValidateOption } from "async-validator"

    export type AsyncValidatorError = Error & {
        errors: ValidateError[]
        fields: Record<string, ValidateError[]>
    }

    /**
     * Wrapper for async-validator.
     *
     * @param value - Value to validate
     *
     * @param rules - [Rules to validate.](https://github.com/yiminghe/async-validator#rules)
     *
     * @param options - [async-validator options.](https://github.com/yiminghe/async-validator#options)
     *
     * @returns
     * - `pass` - Whether the validation passed.
     * - `finished` - Whether the validation has finished.
     * - `error` - Error instance.
     * - `errors` - List of error information.
     * - `error_fields` - Key-value pairs of field names and error information.
     */

    export function validator(
        value: Dict,
        rules: Rules,
        options: ValidateOption = {}
    ) {
        const error = to_writable<AsyncValidatorError | null>(null)

        const finished = to_writable(false)

        const pass = to_writable(false)

        const errors = to_writable<AsyncValidatorError["errors"] | undefined>(
            undefined
        )

        const error_fields = to_writable<AsyncValidatorError["fields"] | undefined>(
            undefined
        )

        async function validate() {
            finished.set(false)

            pass.set(false)

            const validator = new Schema(rules)

            try {
                await validator.validate(value, options)

                pass.set(true)

                error.set(null)

                errors.set(undefined)

                error_fields.set(undefined)
            } catch (_error) {
                const err = _error as AsyncValidatorError

                error.set(err)

                errors.set(err?.errors)

                error_fields.set(err?.fields)
            } finally {
                finished.set(true)
            }
        }

        validate()

        return {
            pass: to_readable(pass),
            finished: to_readable(finished),
            error: to_readable(error),
            errors: to_readable(errors),
            error_fields: to_readable(error_fields),
        }
    }

    /**
     * The async version of `validator`.
     *
     * @remarks This function is different from `validator` in that it returns a promise and doesn't return readable store.
     *
     * @param value - Value to validate
     *
     * @param rules - [Rules to validate.](https://github.com/yiminghe/async-validator#rules)
     *
     * @param options - [async-validator options.](https://github.com/yiminghe/async-validator#options)
     *
     * @returns
     * - `pass` - Whether the validation passed.
     * - `error` - Error instance.
     * - `errors` - List of error information.
     * - `error_fields` - Key-value pairs of field names and error information.
     *
     */
    export async function async_validator(
        value: Dict,
        rules: Rules,
        options: ValidateOption = {}
    ) {
        const validator = new Schema(rules)

        try {
            await validator.validate(value, options)

            return {
                pass: true,
                error: null,
                errors: undefined,
                error_fields: undefined,
            }
        } catch (_error) {
            const error = _error as AsyncValidatorError

            return {
                pass: false,
                error,
                errors: error?.errors,
                error_fields: error?.fields,
            }
        }
    }
    ```
