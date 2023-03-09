---
title: Memory
description: Reactive Memory Info
demo_link: https://svelte.dev/repl/74407a7b82f14f7ab5bfa50223f942b1?version=3
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {memory} from "@sveu/browser"

    const {supported, result} = memory()
</script>
```

## 👩‍💻API

### 🙈 Options

| Name        | Description                          | Type                          | Default  |
| ----------- | ------------------------------------ | ----------------------------- | -------- |
| **interval**| The interval in seconds to check the memory. | `number` | `1` |
| **IntervalFnOptions** | See [IntervalFnOptions](/shared/intervalfn/#options). | `IntervalFnOptions` | `{}` |

### ↩️ Returns

| Name        | Description                          | Type                                      |
| ----------- | ------------------------------------ | ----------------------------------------- |
| **supported**| If the browser supports the `memory` API. | `boolean`                           |
| **result**| A readable store with the memory info. | `Readable<MemoryInfo | undefined>`        |

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { intervalfn, to_readable, to_writable, unstore } from "@sveu/shared"

    import { support } from "../support"
    import { MemoryInfo, MemoryOptions, PerformanceMemory } from "../utils"

    /**
     * Reactive Memory Info.
     *
     * @param options - Options to use:
     * - `interval` - The interval in seconds to check the memory.
     * - `IntervalFnOptions` - Options from `intervalfn`.
     *
     * @returns
     * - `supported` - If the browser supports the `memory` API.
     * - `result` - A readable store with the memory info.
     *
     */
    export function memory(options: MemoryOptions = {}) {
        const _memory = to_writable<MemoryInfo | undefined>(undefined)

        const supported = support("memory", "performance")

        if (unstore(supported)) {
            const { interval = 1 } = options

            intervalfn(
                () => {
                    _memory.set({
                        jsHeapSizeLimit: (performance as PerformanceMemory).memory
                            .jsHeapSizeLimit,
                        totalJSHeapSize: (performance as PerformanceMemory).memory
                            .totalJSHeapSize,
                        usedJSHeapSize: (performance as PerformanceMemory).memory
                            .usedJSHeapSize,
                    })
                },
                interval,
                {
                    immediate: options.immediate,
                    immediate_callback: options.immediate_callback,
                }
            )
        }

        return { supported, result: to_readable(_memory) }
    }
    ```
