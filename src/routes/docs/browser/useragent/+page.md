---
title: Useragent
description:  Wrapper around the User-Agent Client Hints API.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Wrapper around the [User-Agent Client Hints API.](https://developer.mozilla.org/en-US/docs/Web/API/User-Agent_Client_Hints_API)
## Usage

```svelte
<script>
    import {useragent} from "@sveu/browser"

    const {
        supported,
        mobile,
        arch,
        model,
        platform,
        platformVersion,
        bitness,
        brands
    } = useragent()
</script>
```

## Example

```svelte live ln
<script>
import { useragent } from "@sveu/browser"

    const {
        supported,
        mobile,
        arch,
        model,
        platform,
        platformVersion,
        bitness,
        brands
    } = useragent()
</script>

<div class="text-center">
    <h1>Supported: <small>{$supported}</small></h1>

    <h1>Is mobile: <small>{$mobile}</small></h1>

    <h1>Architecture: <small>{$arch}</small></h1>

    <h1>Model: <small>{$model}</small></h1>

    <h1>Platform: <small>{$platform}</small></h1>

    <h1>Platform version: <small>{$platformVersion}</small></h1>

    <h1>Bitness: <small>{$bitness}</small></h1>

    <h1>Brands: <small>{JSON.stringify($brands)}</small></h1>
</div>
```

## API

### Returns

| Name          | Description                                                   | Type                |
| -----------   | ------------------------------------------------------------- | ----------------    |
| **supported** | Whether the browser supports the User-Agent Client Hints api. | Readable<`boolean`> |
| **mobile**    | Whether the device is a mobile device.                        | Readable<`boolean`> |
| **arch**      | The architecture of the device.                               | Readable<`string`>  |
| **model**     | The model of the device.                                      | Readable<`string`>  |
| **platform**  | The platform of the device.                                   | Readable<`string`>  |
| **platformVersion** | The platform version of the device.                     | Readable<`string`>  |
| **bitness**   | The bitness of the device.                                    | Readable<`string`>  |
| **brands**    | The brands of the device.                         | Readable<`UserAgentDataBrand`[]>|
