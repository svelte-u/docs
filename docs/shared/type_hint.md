---
title: Type Hint
description: A Collection of types and interfaces inside @sveu/shared.
---

# {{title}}

{{description}}

```ts
    import type { Readable, Writable } from "svelte/store"

    /**
     * Maybe it's a Readable, or a plain value.
     *
     * ```ts
     * type Readable = T | Readable<T>
     * ```
     */
    export type MaybeReadable<T> = T | Readable<T>

    /**
     * Maybe it's a Writable, or a plain value.
     *
     * ```ts
     * type Writable = T | Writable<T>
     * ```
     */
    export type MaybeWritable<T> = T | Writable<T>

    /**
     * Maybe it's a Store, or a plain value.
     *
     * ```ts
     * type Store = T | Readable<T> | Writable<T>
     * ```
     */
    export type MaybeStore<T> = T | Readable<T> | Writable<T>

    /**
     * Infers the element type of an array
     */
    export type ElementOf<T> = T extends (infer E)[] ? E : never

    /**
     * Void function
     */
    export type Fn = () => void

    /**
     * Any function
     */
    export type AnyFn = (...args: any[]) => any

    export type Awaitable<T> = Promise<T> | T

    export type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never

    export type PromisifyFn<T extends AnyFn> = (
        ...args: ArgumentsType<T>
    ) => Promise<ReturnType<T>>

    export interface Stoppable {
        /**A an indicate whether a stoppable instance is executing*/
        pending: Readable<boolean>

        /**Stop the effect from executing*/
        stop: Fn

        /**Start the effect*/
        start: Fn
    }

    export interface Pauseable {
        /**A an indicate whether a pauseable instance is active*/
        active: Readable<boolean>

        /**Temporary pause the effect from executing*/
        pause: Fn

        /**Resume the effects*/
        resume: Fn
    }

    export interface PartialWritable<T> {
        /**The set function in writable stores. */
        set: (value: T) => void

        /** The subscribe function in writable stores. */
        subscribe: (
            run: (value: T) => void,
            invalidate?: (value?: T) => void
        ) => () => void
    }

    export type FunctionArgs<Args extends any[] = any[], Return = void> = (
        ...args: Args
    ) => Return

    export interface FunctionWrapperOptions<
        Args extends any[] = any[],
        This = any
    > {
        fn: FunctionArgs<Args, This>
        args: Args
        this_arg: This
    }

    export type EventFilter<
        Args extends any[] = any[],
        This = any,
        Invoke extends AnyFn = AnyFn
    > = (
        invoke: Invoke,
        options: FunctionWrapperOptions<Args, This>
    ) => ReturnType<Invoke> | Promise<ReturnType<Invoke>>

    export interface ConfigurableEventFilter {
        /**
         * Filter for if events should to be received.
         *
         */
        event_filter?: EventFilter
    }

    export interface DebounceFilterOptions {
        /**
         * The maximum time allowed to be delayed before it's invoked.
         * In seconds.
         */
        max_wait?: number

        /**
         * Whether to reject the last call if it's been cancel.
         *
         * @defaultValue false
         */
        reject_on_cancel?: boolean
    }

    export interface ToNumberOptions {
        /**
         * Method to use to convert the value to a number.
         *
         * @defaultValue 'float'
         */
        method?: "float" | "int"

        /**
         * The base in mathematical numeral systems passed to `parseInt`.
         * Only works with `method: 'parseInt'`
         */
        radix?: number

        /**
         * Replace NaN with zero
         *
         * @defaultValue false
         */
        nan_to_zero?: boolean
    }

    export interface SlugOptions {
        /**
         * Use lower letters.
         *
         * @defaultValue true
         */
        lower?: boolean

        /**
         * Use uppercase letters.
         *
         * @defaultValue true
         */
        upper?: boolean

        /**
         * Use digits.
         *
         * @defaultValue true
         */
        digits?: boolean

        /**
         * Size of the slug.
         *
         * @defaultValue 6
         */
        size?: number

        /**
         * Text to use as a prefix.
         *
         */
        prefix?: string
    }

    export type EventHookOn<T = any> = (fn: (param: T) => void) => {
        off: () => void
    }

    export type EventHookOff<T = any> = (fn: (param: T) => void) => void

    export type EventHookTrigger<T = any> = (param: T) => Promise<unknown[]>

    export interface EventHook<T = any> {
        on: EventHookOn<T>

        off: EventHookOff<T>

        trigger: EventHookTrigger<T>
    }

    export interface SingletonPromiseReturn<T> {
        (): Promise<T>
        /**
         * Reset current staled promise.
         * await it to have proper shutdown.
         */
        reset: () => Promise<void>
    }

    export interface IntervalFnOptions {
        /**
         * Start the timer immediately
         *
         * @defaultValue true
         */
        immediate?: boolean

        /**
         * Execute the callback immediate after calling this function
         *
         * @defaultValue false
         */
        immediate_callback?: boolean
    }

    export interface TimeoutFnOptions {
        /**
         * Start the timer immediate after calling this function
         *
         * @defaultValue true
         */
        immediate?: boolean
    }

    export interface TimeoutOptions<Controls extends boolean>
        extends TimeoutFnOptions {
        /**
         * Expose more controls
         *
         * @defaultValue false
         */
        controls?: Controls
        /**
         * Callback on timeout
         */
        callback?: Fn
    }

    export type ToggleFn = (value?: boolean) => void

    export interface DefaultTaggableReturn {
        toggled: Readable<boolean>

        toggle: ToggleFn
    }

    export interface RTFOptions {
        /** The locale to use.
         *
         *
         * @defaultValue en
         */
        locale?: Intl.UnicodeBCP47LocaleIdentifier

        /** The length of the internationalized message.
         *
         * @defaultValue long
         */
        style?: "long" | "short" | "narrow"

        /** The format of output message.
         *
         * @defaultValue auto
         */
        numeric?: "always" | "auto"
    }

    export type DateLike = Date | number | string | undefined

    export interface StrftimeOptions extends Intl.DateTimeFormatOptions {
        /**
         * The locale to use
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
         */
        locales?: Intl.LocalesArgument
    }

    export type StringOrNumber = string | number

    export type Sequential =
        | number[]
        | string[]
        | StringOrNumber[]
        | number[][]
        | string[][]
        | StringOrNumber[][]

    export interface PrecisionOptions {
        /**
         * Method to use for rounding
         *
         * @defaultValue 'round'
         */
        math?: "floor" | "ceil" | "round"
    }

    export type Dict = Record<string | number | symbol, any>

    export interface ClusterOptions {
        /**
         * The size of each list.
         *
         * @defaultValue 2
         */
        size?: number
    }

    export interface IntersectsOptions<T, K extends string | number | symbol> {
        fn?: (item: T) => K
    }

    export interface EnhanceSortOptions {
        /**
         * Sorting type
         *
         * @defaultValue string
         */
        type?: "number" | "string" | "object"

        /**
         * If the type is object, this will sort it by the given key
         * 
         * @defaultValue if sort_by isn't provided, it will sort by the first key
         
        */
        sort_by?: string

        /**
         * Reverse the sorting
         *
         * @defaultValue false
         *
         *
         */
        reverse?: boolean
    }

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

    export interface Watchable<T> extends PartialWritable<T> {
        /** Stop watching */
        pause: () => void

        /** Resume watching */
        resume: () => void
    }
```
