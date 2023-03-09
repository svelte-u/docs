---
title: Useragent
description:  Wrapper around the User-Agent Client Hints API.
demo_link: https://svelte.dev/repl/d26439319c564b138fcc8cd609f33c28?version=3
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import {useragent} from "@sveu/browser"

    const {
        is_supported,
        mobile,
        arch,
        model,
        platform,
        platform_version,
        bitness,
        brands
    } = useragent()
</script>
```

## 👩‍💻API

### ↩️ Returns

| Name                 | Description                          | Type                            |
| -----------          | -------------------------------------| -----------------------------   |
| **supported**        | Is the userAgentData supported       | `Readable<boolean>`             |
| **mobile**           | Is the device mobile                 | `Readable<boolean>`             |
| **arch**             | The device architecture              | `Readable<string>`              |
| **model**            | The device model                     | `Readable<string>`              |
| **platform**         | The device platform                  | `Readable<string>`              |
| **platform_version** | The device platform version          | `Readable<string>`              |
| **bitness**          | The device bitness                   | `Readable<number>`              |
| **brands**           | The device brands                    | `Readable<UserAgentDataBrand[]>`|

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import {
        async_state,
        on_destroy,
        to_readable,
        to_writable,
        unstore,
    } from "@sveu/shared"

    import { support } from "../support"

    interface UserAgentData {
        mobile: boolean

        architecture: string

        model: string

        platform: string

        platformVersion: string

        bitness: string

        brands: UserAgentDataBrand[]
    }

    interface UserAgentDataBrand {
        name: string

        version: string
    }

    /**
     * Get user agent
     *
     * @remarks This function use the User-Agent Client Hints api. See https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData
     *
     */
    export function useragent() {
        const mobile = to_writable(false)

        const arch = to_writable("")

        const model = to_writable("")

        const platform = to_writable("")

        const platform_version = to_writable("")

        const bitness = to_writable("")

        const brands = to_writable<UserAgentDataBrand[]>([
            { name: "", version: "" },
        ])

        const supported = support("userAgentData")

        if (unstore(supported)) {
            const { state } = async_state<UserAgentData>(
                // @ts-expect-error navigator.userAgentData is not supported in all browsers
                navigator.userAgentData.getHighEntropyValues([
                    "architecture",
                    "model",
                    "platform",
                    "platformVersion",
                    "bitness",
                ]),
                {
                    mobile: false,
                    architecture: "",
                    model: "",
                    platform: "",
                    platformVersion: "",
                    bitness: "",
                    brands: [{ name: "", version: "" }],
                }
            )
            const unsubscribe = state.subscribe((v) => {
                if (!v) return

                mobile.set(v.mobile)

                arch.set(v.architecture)

                model.set(v.model)

                platform.set(v.platform)

                platform_version.set(v.platformVersion)

                bitness.set(v.bitness)

                const _brands = v.brands.map((b: any) => {
                    return {
                        name: b.brand,
                        version: b.version,
                    }
                })

                brands.set(_brands)
            })

            on_destroy(unsubscribe)
        }

        return {
            supported,
            brands: to_readable(brands),
            mobile: to_readable(mobile),
            arch: to_readable(arch),
            model: to_readable(model),
            platform: to_readable(platform),
            platform_version: to_readable(platform_version),
            bitness: to_readable(bitness),
        }
    }
    ```
