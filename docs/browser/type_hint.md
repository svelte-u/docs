---
title: Type Hint
description: A Collection of types and interfaces inside @sveu/browser.
---

# {{title}}

{{description}}

```ts
import type { Readable } from "svelte/store"

import type {
    AnyFn,
    ConfigurableEventFilter,
    Fn,
    IntervalFnOptions,
} from "@sveu/shared"

export interface MemoryInfo {
    /**
     * The maximum size of the heap, in bytes, that is available to the context.
     */
    jsHeapSizeLimit: number
    /**
     *  The total allocated heap size, in bytes.
     */
    totalJSHeapSize: number
    /**
     * The currently active segment of JS heap, in bytes.
     */
    usedJSHeapSize: number
}

export interface MemoryOptions extends IntervalFnOptions {
    /** The interval in seconds to check the memory. */
    interval?: number
}

export type PerformanceMemory = Performance & {
    memory: MemoryInfo
}

export interface FaviconOptions {
    /** The base url to prepend to the favicon. */
    base_url?: string

    /** The rel attribute of the favicon. */
    rel?: string
}

export interface InferEventTarget<Events> {
    addEventListener(event: Events, fn?: AnyFn, options?: any): any

    removeEventListener(event: Events, fn?: AnyFn, options?: any): any
}

export interface GeneralEventListener<E = Event> {
    (evt: E): void
}

export type ListAble<T> = T[] | T

export interface BroadcastChannelOptions {
    /**
     * The name of the channel.
     * @defaultValue "default"
     */
    name?: string
}

export interface PushOptions {
    /**
     * Convert the push object into a base64 string
     *
     * @defaultValue true
     */
    base64?: boolean

    /**
     * Start subscribing, when the user is visible
     *
     * @defaultValue true
     */
    user_visible_only?: boolean
}

type DescriptorNamePolyfill =
    | "accelerometer"
    | "accessibility-events"
    | "ambient-light-sensor"
    | "background-sync"
    | "camera"
    | "clipboard-read"
    | "clipboard-write"
    | "gyroscope"
    | "magnetometer"
    | "microphone"
    | "notifications"
    | "payment-handler"
    | "persistent-storage"
    | "push"
    | "speaker"

export type GeneralPermissionDescriptor =
    | PermissionDescriptor
    | { name: DescriptorNamePolyfill }

export interface PermissionOptions<Controls extends boolean> {
    /**
     * Expose more controls
     *
     * @defaultValue false
     */
    controls?: Controls
}

export type PermissionReturn = Readable<PermissionState | undefined>

export interface PermissionReturnWithControls {
    /** The permission state. */
    state: PermissionReturn

    /** Whether the permission is supported. */
    supported: Readable<boolean>

    /** Query the permission state. */
    query: () => Promise<PermissionStatus | undefined>
}

export interface ClipboardOptions<Source> {
    /**
     * Enabled reading for clipboard
     *
     * @defaultValue false
     */
    read?: boolean

    /**
     * Copy source
     */
    source?: Source

    /**
     * Seconds to reset state of `copied` ref
     *
     * @defaultValue 1.5
     */
    copied_during?: number

    /**
     * Whether fallback to document.execCommand('copy') if clipboard is undefined.
     *
     * @defaultValue false
     */
    legacy?: boolean
}

export interface ClipboardReturn<Optional> {
    /** Returns whether the clipboard is supported. */
    supported: Readable<boolean>

    /** The text in the clipboard. */
    text: Readable<string>

    /** Whether the text is copied. */
    copied: Readable<boolean>

    /** A function to copy the text to the clipboard. */
    copy: Optional extends true
        ? (text?: string) => Promise<void>
        : (text: string) => Promise<void>
}

export interface FileDialogOptions {
    /**
     * Allowed multiple files selection.
     *
     * @defaultValue true
     */
    multiple?: boolean

    /**
     * Allowed file types.
     *
     * @defaultValue '*'
     */
    accept?: string

    /**
     * Select the input source for the capture file.
     *
     * @see [HTMLInputElement Capture](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture)
     */
    capture?: string
}

export type NetworkType =
    | "bluetooth"
    | "cellular"
    | "ethernet"
    | "none"
    | "wifi"
    | "wimax"
    | "other"
    | "unknown"

export type NetworkEffectiveType = "slow-2g" | "2g" | "3g" | "4g" | undefined

export interface RafFnOptions {
    /**
     * Start the requestAnimationFrame loop immediately on creation
     *
     * @defaultValue true
     */
    immediate?: boolean
}

export interface FpsOptions {
    /**
     * Calculate the FPS on every x frames.
     * @defaultValue 10
     */
    every?: number
}

export type Breakpoints<K extends string = string> = Record<K, number | string>

export interface EyeDropperOpenOptions {
    /**
     * The signal to abort the eye dropper.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
     */
    signal?: AbortSignal
}

export interface EyeDropper {
    // eslint-disable-next-line @typescript-eslint/no-misused-new
    new (): EyeDropper

    open: (options?: EyeDropperOpenOptions) => Promise<{ sRGBHex: string }>
    [Symbol.toStringTag]: "EyeDropper"
}

export interface EyeDropperOptions {
    /**
     * Initial sRGBHex.
     *
     * @defaultValue ''
     */
    initial?: string
}

export interface GeolocationOptions {
    /** Whether to enable high accuracy.
     *
     * @defaultValue true
     */
    high?: boolean

    /** The maximum age of a cached position in seconds.
     *
     * @defaultValue 3
     */
    max_age?: number

    /** The timeout in seconds.
     *
     * @defaultValue 27
     */
    timeout?: number

    /**
     * To start the geolocation immediately
     *
     * @defaultValue true
     */
    immediate?: boolean
}

export interface ImageOptions {
    /** Address of the resource */
    src: string
    /** Images to use in different situations, e.g., high-resolution displays, small monitors, etc. */
    srcset?: string
    /** Image sizes for different page layouts */
    sizes?: string
}

export interface IntersectionObserverOptions {
    /**
     * The Element or Document whose bounds are used as the bounding box when testing for intersection.
     */
    root?: HTMLElement | SVGElement | undefined | null

    /**
     * A string which specifies a set of offsets to add to the root's bounding_box when calculating intersections.
     *
     * @defaultValue "0px"
     */
    margin?: string

    /**
     * Either a single number or an array of numbers between 0.0 and 1.
     *
     * @defaultValue 0.1
     */
    threshold?: number | number[]
}

export interface Position {
    x: number
    y: number
}

export interface MouseOptions extends ConfigurableEventFilter {
    /**
     * Mouse position based by page, client, or relative to previous position
     *
     * @defaultValue 'page'
     */
    type?: "page" | "client" | "movement"

    /**
     * Listen to `touchmove` events
     *
     * @defaultValue true
     */
    touch?: boolean

    /**
     * Reset to initial value when `touchend` event fired
     *
     * @defaultValue false
     */
    reset_on_touch_ends?: boolean

    /**
     * Initial values
     */
    initial_value?: Position
}

export type MouseSourceType = "mouse" | "touch" | null

export interface WebNotificationOptions extends NotificationOptions {
    /**
     * The title read-only property of the Notification interface indicates
     * the title of the notification
     *
     * @defaultValue ''
     */
    title?: string
}

export type WakeLockType = "screen"

export interface WakeLockSentinel extends EventTarget {
    type: WakeLockType
    released: boolean
    release: () => Promise<void>
}

export type NavigatorWithWakeLock = Navigator & {
    wakeLock: { request: (type: WakeLockType) => Promise<WakeLockSentinel> }
}

export interface WindowSizeOptions {
    /** Initial width */
    initial_width?: number

    /** Initial height */
    initial_height?: number

    /**
     * Listen to window `orientationchange` event
     *
     * @defaultValue true
     */
    orientation?: boolean

    /**
     * Whether the scrollbar should be included in the width and height
     * @defaultValue true
     */
    scrollbar?: boolean
}

export type WorkerFn = (...args: unknown[]) => Worker

export interface WebWorkerReturn<T = any> {
    data: Readable<T>

    error: Readable<T>

    post: (typeof Worker.prototype)["postMessage"]

    cleanup: () => void

    wk: Readable<Worker | undefined>
}

export type WebSocketStatus = "OPEN" | "CONNECTING" | "CLOSED"

export interface WebSocketOptions {
    on_connected?: (ws: WebSocket) => void

    on_disconnected?: (ws: WebSocket, event: CloseEvent) => void

    on_error?: (ws: WebSocket, event: Event) => void

    on_message?: (ws: WebSocket, event: MessageEvent) => void

    /**
     * Send heartbeat for every x seconds passed
     *
     * @defaultValue false
     */
    heartbeat?:
        | boolean
        | {
                /**
                 * Message for the heartbeat
                 *
                 * @defaultValue 'ping'
                 */
                message?: string | ArrayBuffer | Blob

                /**
                 * Interval, in seconds
                 *
                 * @defaultValue 1
                 */
                interval?: number

                /**
                 * Heartbeat response timeout, in seconds
                 *
                 * @defaultValue 1
                 */
                pong_timeout?: number
        }

    /**
     * Enabled auto reconnect
     *
     * @defaultValue false
     */
    auto_reconnect?:
        | boolean
        | {
                /**
                 * Maximum retry times.
                 *
                 * Or you can pass a predicate function (which returns true if you want to retry).
                 *
                 * @defaultValue -1
                 */
                retries?: number | (() => boolean)

                /**
                 * Delay for reconnect, in seconds
                 *
                 * @defaultValue 1
                 */
                delay?: number

                /**
                 * On maximum retry times reached.
                 */
                on_failed?: Fn
        }

    /**
     * Automatically open a connection
     *
     * @defaultValue true
     */
    immediate?: boolean

    /**
     * Automatically close a connection
     *
     * @defaultValue true
     */
    auto_close?: boolean

    /**
     * List of one or more sub-protocol strings
     *
     * @defaultValue []
     */
    protocols?: string[]
}

export interface WebSocketReturn<T> {
    /**
     * Reference to the latest data received via the websocket,
     * can be watched to respond to incoming messages
     */
    data: Readable<T | null>

    /**
     * The current websocket status, can be only one of:
     * 'OPEN', 'CONNECTING', 'CLOSED'
     */
    status: Readable<WebSocketStatus>

    /**
     * Closes the websocket connection gracefully.
     */
    close: WebSocket["close"]

    /**
     * Reopen the websocket connection.
     * If there the current one is active, will close it before opening a new one.
     */
    open: Fn

    /**
     * Sends data through the websocket connection.
     *
     * @param data - The data to send
     *
     * @param buffer - when the socket is not yet open, store the data into the buffer and sent them one connected. Default to true.
     */
    send: (data: string | ArrayBuffer | Blob, buffer?: boolean) => boolean

    /**
     * Reference to the WebSocket instance.
     */
    ws: Readable<WebSocket | undefined>
}

export interface VibrateOptions {
    /**
     *
     * Vibration Pattern
     *
     * An array of values describes alternating periods in which the
     * device is vibrating and not vibrating. Each value in the array
     * is converted to an integer, then interpreted alternately as
     * the number of milliseconds the device should vibrate and the
     * number of seconds it should not be vibrating
     *
     * @defaultValue []
     *
     */
    pattern?: number[] | number

    /**
     * Interval to run a persistent vibration, in seconds
     *
     * Pass `0` to disable
     *
     * @defaultValue 0
     *
     */
    interval?: number
}

export interface PerformanceObserverOptions extends PerformanceObserverInit {
    /**
     * Start the observer immediate.
     *
     * @defaultValue true
     */
    immediate?: boolean
}

export interface UrlQueryOptions<T> {
    /**
     * Remove `null` and `undefined` values from the query object
     *
     * @defaultValue true
     */
    remove_nullish?: boolean

    /**
     * Remove `false` values from the query object
     *
     * @defaultValue false
     */
    remove_falsy?: boolean

    /** A fallback value to use when the query is empty */
    fallback?: T

    /**
     * Write back to `window.history` automatically
     *
     * @defaultValue true
     */
    write?: boolean

    /**
     * Encode the query string using `encodeURIComponent`
     *
     * @defaultValue false
    */
    encode?: boolean
}

export interface StorageSerializer<T> {
    read(raw: string): T
    write(value: T): string
}

export interface StorageOptions<T> {
    /**
     * Where to store the data
     *
     * @defaultValue "local"
     *
     */
    store?: "local" | "session" | "cookie" | "url"

    /**
     * Called when an error occurs
     *
     * @param error - Error
     *
     */
    on_error?: (error: unknown) => void

    /**
     * Custom data serialization
     */
    serializer?: StorageSerializer<T>

    /**
     * Sync data between tabs. Only works with `store: "local"`
     *
     * @defaultValue true
     */
    sync?: boolean
}
```
