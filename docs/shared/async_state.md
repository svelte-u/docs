---
title: Async State
description: Reactive async state.
demo_link: https://svelte.dev/repl/65f10b7c54c94715929c783deb9647c3?version=3.52.0
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {async_state} from "@sveu/shared"
</script>
```

## 👩‍💻API

### 👻 Arguments

| Name        | Description                          | Type                          | Required |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **promise** | The promise to be resolved           | `Promise<T> | ((...args: any[]) => Promise<T>),`| Yes      |
| **initial_state** | The initial state, used until the first evaluation finishes | `T` | Yes |

### 🙈 Options

| Name        | Description                          | Type                          | Default  |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **delay** |  Delaying the executing of the promise, if `immediate` is true. In second. | `number`    | `0`      |
| **immediate** |  If true, the promise will be executed immediately. | `boolean`    | `true`   |
| **reset_on_execute** |  Sets the state to initial_state before executing the promise. | `boolean`    | `true`   |
| **throw_error** |  An error is thrown when executing the execute function. | `boolean`    | `false`   |
| **on_error** |  Callback when error is caught. | `function`    | `null`   |

### ↩️ Returns

| Name        | Description                                    | Type                          |
| ----------- | -----------------------------------------------| ----------------------------- |
| **state**   | The state of the async function                | Readable(T)                   |
| **ready**   | Whether the async function is ready to execute | Readable(boolean)             |
| **loading** | Whether the async function is loading          | Readable(boolean)             |
| **error**   | The error of the async function                | Readable(unknown)             |
| **execute** | A function to execute the async function. It can accept a `delay` option to delay the execution and an `arg` option to pass an argument to the async function. | `function(delay?: number, ...args: any[])` |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { sleep } from "../sleep"
    import { to_readable } from "../to_readable"
    import { to_writable } from "../to_writable"
    import { noop } from "../utils"

    export interface AsyncStateOptions {
        /**
         * Delay for executing the promise. In second.
         *
         * @defaultValue 0
         */
        delay?: number

        /**
         * Execute the promise right after the function is invoked.
         * Will apply the delay if any.
         *
         * When set to false, you will need to execute it manually.
         *
         * @defaultValue true
         */
        immediate?: boolean

        /**
         * Callback when error is caught.
         */
        on_error?: (e: unknown) => void

        /**
         * Sets the state to initial state before executing the promise.
         *
         * This can be useful when calling the execute function more than once (for
         * example, to refresh data). When set to false, the current state remains
         * unchanged until the promise resolves.
         *
         * @defaultValue true
         */
        reset_on_execute?: boolean

        /**
         *
         * An error is thrown when executing the execute function
         *
         * @defaultValue false
         */
        throw_error?: boolean
    }

    /**
     * A function that executes a promise and returns a state.
     *
     * @param promise - The promise to execute.
     *
     * @param initial_state - The initial state of the state.
     *
     * @param options - The options.
     * - `delay` - Delay for executing the promise. In second.
     * - `immediate` - Execute the promise right after the function is invoked.
     * - `on_error` - Callback when error is caught.
     * - `reset_on_execute` - Sets the state to initial state before executing the promise.
     * - `throw_error` - An error is thrown when executing the execute function.
     *
     * @returns An object with the following properties:
     * - `state` - The state.
     * - `ready` - A boolean that indicates if the promise has been resolved.
     * - `loading` - A boolean that indicates if the promise is being executed.
     * - `error` - The error that was caught.
     * - `execute` - A function that executes the promise manually.
     */
    export function async_state<T>(
        promise: Promise<T> | ((...args: any[]) => Promise<T>),
        initial_state: T,
        options: AsyncStateOptions = {}
    ) {
        const {
            immediate = true,
            delay = 0,
            on_error = noop,
            reset_on_execute = true,
            throw_error,
        } = options ?? {}

        const state = to_writable(initial_state)

        const ready = to_writable(false)

        const loading = to_writable(false)

        const error = to_writable<unknown | undefined>(undefined)

        /**
         * Executes the promise.
         *
         * @param delay - Delay for executing the promise. In second. default: 0
         *
         * @param args - The arguments to pass to the promise.
         *
         * @returns The state.
         */
        async function execute(delay = 0, ...args: any[]) {
            if (reset_on_execute) state.set(initial_state)

            error.set(undefined)

            ready.set(false)

            loading.set(true)

            if (delay > 0) await sleep(delay)

            const _promise =
                typeof promise === "function" ? promise(...args) : promise

            try {
                const data = await _promise

                state.set(data)

                ready.set(true)
            } catch (e) {
                error.set(e)
                on_error(e)
                if (throw_error) throw error
            } finally {
                loading.set(false)
            }

            return state as T
        }

        if (immediate) execute(delay)

        return {
            state: to_readable(state),
            ready: to_readable(ready),
            loading: to_readable(loading),
            error: to_readable(error),
            execute,
        }
    }
    ```
