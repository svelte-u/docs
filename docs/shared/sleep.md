---
title: Sleep
description: Sleeps for a given time.
demo_link: https://svelte.dev/repl/e1cea62ec47248729c255bf87849a0d5?version=3.55.1
---

# {{title}}

A function that returns a promise that resolves after a given amount of time. This function is similar to the [sleep function in Python](https://docs.python.org/3/library/time.html#time.sleep).

## 🎬 Usage

```html
<script>
    import {sleep} from "@sveu/shared"

    let text = "wake up"

    async function update_text(){
        text = "sleep...."
        await sleep(2)
        text = "wake up"
    }
</script>

<h1>{text}</h1>

<button on:click="{() => update_text()}">Sleep</button>```
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                          | Type                          | Required |
| ------------------- | ------------------------------------ | ----------------------------- | -------- |
| **s**               | Seconds to sleep                     | `number`                      | Yes      |
| **throw_on_timeout**| Throw an error on timeout            | `boolean`                     | No       |
| **reason**          | Reason to throw if `throw_on_timeout` is `true`. | `string`                      | No       |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## 👀 Source Code

??? tip "Source Code"

    ```ts
    /**
     * A function that returns a promise that resolves after a given amount of time.
     *
     * @param s - The amount of time to wait in seconds.
     *
     * @param throw_on_timeout - Whether to throw an error after the timeout.
     *
     * @param reason - The reason to throw if `throw_on_timeout` is `true`.
     *
     * @see https://docs.python.org/3/library/time.html#time.sleep
     *
     * @returns A promise that resolves after `s` seconds.
     */
    export function sleep(
        s: number,
        throw_on_timeout = false,
        reason = "Timeout"
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            if (throw_on_timeout) setTimeout(() => reject(reason), s * 1000)
            else setTimeout(resolve, s * 1000)
        })
    }
    ```
