---
title: Dropzone
description: Create a dropzone for file uploads.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Create a dropzone for file uploads.

## Usage

<Tabs activeName="Default">
  <TabPanel name="Default">

```svelte
<script>
    import { dropzone } from "@sveu/actions"

    function fn({ overDropzone, files }) {
        console.log(overDropzone, files)
    }

</script>

<div use:dropzone="{fn}">
    Drop files into dropZone
</div>
```

  </TabPanel>

  <TabPanel name="With Events">

```svelte
<script>
   import { dropzone } from "@sveu/actions"

    function hover(data) {
        console.log(data.detail)
    }

    function onDrop(data) {
        console.log(data.detail)
    }
</script>

<div use:dropzone on:hover="{hover}" on:files="{onDrop}">
    Drop files into dropZone
</div>
```

  </TabPanel>
</Tabs>

## Example

<Tabs activeName="Default">
  <TabPanel name="Default">

```svelte live ln
<script lang="ts">
    import { dropzone } from "@sveu/actions" // [svp! hl:2]
    import type { DropzoneData } from "@sveu/actions"

    let over_dropzone = false

    let files_data: any[] = []

    function on_dropzone({ overDropzone, files }: DropzoneData) { // [svp! hl]
        over_dropzone = overDropzone

        if (files) {
            files_data = files.map((file) => ({
                name: file.name,
                size: file.size,
                type: file.type,
                last_modified: file.lastModified,
            }))
        }
    }
</script>

<div class="flex text-center">
    <div class="h-auto w-full relative">
        <p>Drop files into dropZone</p>

        <!-- // [svp! hl:3]  -->
        <div
            use:dropzone="{on_dropzone}"
            class="flex flex-col h-auto bg-gray-400/10 mt-6 w-full min-h-200px justify-center items-center">
            <div>is Over Drop Zone: {over_dropzone}</div>
            <div class="flex flex-wrap justify-center items-center">
                {#each files_data as file}
                    <div class="flex flex-col justify-center items-center">
                        <div>File Name: {file.name}</div>
                        <div>File Size: {file.size}</div>
                        <div>File Type: {file.type}</div>
                        <div>
                            File Last Modified: {new Intl.DateTimeFormat(
                                "en-US"
                            ).format(file.last_modified)}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
```

  </TabPanel>

  <TabPanel name="With Events">

```svelte live ln
<script lang="ts">
    import { dropzone } from "@sveu/actions"  // [svp! hl]
    let over_dropzone = false

    let files_data: any[] = []

    function hover(data: CustomEvent<boolean>) {
        over_dropzone = data.detail
    }

    function on_file_drop(data: CustomEvent<File[]>) {
        const files = data.detail

        if (files) {
            files_data = files.map((file) => ({
                name: file.name,
                size: file.size,
                type: file.type,
                last_modified: file.lastModified,
            }))
        }
    }
</script>

<div class="flex text-center">
    <div class="h-auto w-full relative">
        <p>Drop files into dropZone</p> 
    
        <!-- // [svp! hl:5]  -->
        <div
            use:dropzone 
            on:hover="{hover}" 
            on:files="{on_file_drop}"
            class="flex flex-col h-auto bg-gray-400/10 mt-6 w-full min-h-200px justify-center items-center">
            <div>is Over Drop Zone: {over_dropzone}</div>
            <div class="flex flex-wrap justify-center items-center">
                {#each files_data as file}
                    <div class="flex flex-col justify-center items-center">
                        <div>File Name: {file.name}</div>
                        <div>File Size: {file.size}</div>
                        <div>File Type: {file.type}</div>
                        <div>
                            File Last Modified: {new Intl.DateTimeFormat(
                                "en-US"
                            ).format(file.last_modified)}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
```

  </TabPanel>

</Tabs>

## API

### Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **fn**              | A function to be called when the dropzone is hovered or files are dropped. | (data: DropzoneData) => void | No |

<br/>
<br/>

### Events

| Name                | Description                                         | Type                  |
| ------------------- | --------------------------------------------------- | --------------------- |
| **hover**           | An event will fire once a file is over the dropzone | CustomEvent<`Boolean`>|
| **files**           | An event will fire once a file is dropped.          | CustomEvent<`File[]`>   |

<br/>
<br/>

:::tip
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

:::
