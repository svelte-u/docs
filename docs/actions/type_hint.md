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
```
