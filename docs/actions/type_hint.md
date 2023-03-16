---
title: Type Hint
description: A Collection of types and interfaces inside @sveu/actions.
---

# {{title}}

{{description}}

```ts
    export type DropzoneData = {
        over_dropzone: boolean
        files?: File[]
    }

    export interface ElementBoundData {
        /** The height of the element. */
        height: number

        /** The width of the element. */
        width: number

        /** The bottom position of the element. */
        bottom: number

        /** The left position of the element. */
        left: number

        /** The right position of the element. */
        right: number

        /** The top position of the element. */
        top: number

        /** The x position of the element. */
        x: number

        /** The y position of the element. */
        y: number
    }

    export type FullscreenFnData = {
        supported: boolean

        enter: () => Promise<void>

        exit: () => Promise<void>

        toggle: () => Promise<void>
    }

    export type FullscreenFunctionMap = [
        "requestFullscreen",
        "exitFullscreen",
        "fullscreenElement",
        "fullscreenEnabled",
        "fullscreenchange",
        "fullscreenerror"
    ]

    export interface SnapshotOptions<T = unknown> {
        /**
         * The key to use storing the snapshot data.
         */
        key?: string

        /**
         * The storage to use for storing the snapshot data.
         *
         * @defaultValue "local"
         */
        store?: "cookie" | "local" | "session"

        /**
         * The fallback value to use if no data is found.
         *
         * @defaultValue `{}`
         *
         */
        fallback?: unknown

        /**
         * A function that captures the state of the node.
         *
         * @param target - The node to capture the state of.
         */
        capture?: (target: T) => unknown

        /**
         * A function that restores the state of the node.
         *
         * @param state - The state to restore.
         *
         */
        restore?: (state: any) => void
    }
```
