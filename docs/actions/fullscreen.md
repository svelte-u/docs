---
title: Fullscreen
description: Toggle fullscreen mode of an element.
---

# {{title}}

Reactive Fullscreen API. It adds methods to present a specific Element (and its descendants) in full-screen mode, and to exit full-screen mode once it is no longer needed. This makes it possible to present desired content—such as an online game—using the user's entire screen, removing all browser user interface elements and other applications from the screen until full-screen mode is shut off.

## 🎬 Usage

```html
<script>
    import {fullscreen} from "@sveu/actions"

    function fn(data){
        ...
    }
</script>

<video
    src="https://vjs.zencdn.net/v/oceans.mp4"
    width="600"
    controls
    use:fullscreen="{fn}"
    on:fullscreen="{(e) => console.log(e.detail)}">
    <track kind="captions" />
</video>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **fn**              | A function that receives functions to control the behavior of the fullscreen. | `(data: FullscreenFnData) => void` | Yes |

### 🙈 Events

| Name                | Description                                          | Type        | Return      |
| ------------------- | ---------------------------------------------------- | ----------- | ----------- |
| **fullscreen**      | An event will fire once the fullscreen is toggled. | `CustomEvent<boolean` | A custom event with detail as boolean |

??? note

    If you use typescript, you need to add `./node_modules/@sveu/actions/events.d.ts` to your `tsconfig.json` file.

    ```json
        {
            ...

            "include": [
                ...
                "./node_modules/@sveu/actions/events.d.ts"
            ]
            ...

        }
    ```

## 🧪 Playground

[stackblitz](https://stackblitz.com/edit/github-8gcpfy?file=src%2Froutes%2Factions%2Ffullscreen%2F%2Bpage.svelte)

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { on } from "@sveu/browser"

    import type { FullscreenFnData, FullscreenFunctionMap } from "../utils"

    // from: https://github.com/sindresorhus/screenfull.js/blob/master/src/screenfull.js
    const functions_map: FullscreenFunctionMap[] = [
        [
            "requestFullscreen",
            "exitFullscreen",
            "fullscreenElement",
            "fullscreenEnabled",
            "fullscreenchange",
            "fullscreenerror",
        ],
        // New WebKit
        [
            "webkitRequestFullscreen",
            "webkitExitFullscreen",
            "webkitFullscreenElement",
            "webkitFullscreenEnabled",
            "webkitfullscreenchange",
            "webkitfullscreenerror",
        ],
        // Old WebKit
        [
            "webkitRequestFullScreen",
            "webkitCancelFullScreen",
            "webkitCurrentFullScreenElement",
            "webkitCancelFullScreen",
            "webkitfullscreenchange",
            "webkitfullscreenerror",
        ],
        [
            "mozRequestFullScreen",
            "mozCancelFullScreen",
            "mozFullScreenElement",
            "mozFullScreenEnabled",
            "mozfullscreenchange",
            "mozfullscreenerror",
        ],
        [
            "msRequestFullscreen",
            "msExitFullscreen",
            "msFullscreenElement",
            "msFullscreenEnabled",
            "MSFullscreenChange",
            "MSFullscreenError",
        ],
    ] as any

    /**
     * Make an element enter or exit fullscreen mode.
     *
     * @param element - The element to make fullscreen.
     *
     * @param fn - The function to call when the element mounted.
     * - `supported` - Whether fullscreen is supported.
     * - `enter` - The function to call to enter fullscreen.
     * - `exit` - The function to call to exit fullscreen.
     * - `toggle` - The function to call to toggle fullscreen.
     *
     */
    export function fullscreen(
        element: HTMLElement | SVGElement,
        fn: (data: FullscreenFnData) => void
    ) {
        let fullscreen = false

        let map = functions_map[0]

        function support() {
            for (const m of functions_map) {
                if (m[1] in document) {
                    map = m
                    return true
                }
            }

            return false
        }

        const supported = support()

        const [REQUEST, EXIT, ELEMENT, , EVENT] = map

        async function exit() {
            if (!supported) return

            if (document?.[ELEMENT]) await document[EXIT]()

            fullscreen = false

            element.dispatchEvent(
                new CustomEvent("fullscreen", { detail: fullscreen })
            )
        }

        async function enter() {
            if (!supported) return

            if (fullscreen) return

            await element[REQUEST]()

            fullscreen = true

            element.dispatchEvent(
                new CustomEvent("fullscreen", { detail: fullscreen })
            )
        }

        async function toggle() {
            if (fullscreen) await exit()
            else await enter()
        }

        fn({ supported, enter, exit, toggle })

        const cleanup = on(
            document,
            EVENT,
            () => {
                fullscreen = Boolean(document[ELEMENT])
                element.dispatchEvent(
                    new CustomEvent("fullscreen", { detail: fullscreen })
                )
            },
            false
        )

        return {
            destroy() {
                exit()
                cleanup()
            },
        }
    }
    ```
