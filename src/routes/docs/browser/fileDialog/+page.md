---
title: File Dialog
description: Reactive File Dialog.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Reactive File Dialog.

## Usage

```svelte
<script>
    import { fileDialog } from "@sveu/browser"

    const { files, accepted, rejected, open, reset, onChange } = fileDialog()
</script>
```

## Example

<Tabs activeName="Default">
  <TabPanel name="Default">

```svelte live ln
<script>
    import { fileDialog } from "@sveu/browser" // [svp! hl:1]

    const { files, open, reset } = fileDialog() // [svp! hl:1]
</script>

{#if $files}
    {#each $files as file}
        <div>
            {file.name}
        </div>
    {/each}
{/if}

<button on:click="{() => open()}">Choose files</button>

<button type="button" disabled="{!files}" on:click="{() => reset()}">
    Reset
</button>
```

 </TabPanel>

  <TabPanel name="With Options">

```svelte live ln
<script>
    import { fileDialog } from "@sveu/browser"

    const { files, accepted, rejected, open, reset, onChange } = fileDialog({// [svp! hl:3]
        accept: "image/png",
    })

    onChange((payload) => { // [svp! hl:3]
        console.log(payload)
    })
</script>

<button on:click="{() => open()}">Choose files</button>

<button type="button" disabled="{!files}" on:click="{() => reset()}">Reset</button>

<hr />
<h1>Files</h1>
{#if $files}
    {#each $files as file}
        <div>
            {file.name}
        </div>
    {/each}
{/if}

<hr />
<h1>Accepted Files</h1>
{#if $accepted}
    {#each $accepted as file}
        <div>
            {file.name}
        </div>
    {/each}
{/if}

<hr />
<h1>Rejected Files</h1>
{#if $rejected}
    {#each $rejected as file}
        <div>
            {file.name}
        </div>
    {/each}
{/if}
```
  
  </TabPanel>

</Tabs>

## API

### Options

| Name         | Description                          | Type                       | Default    |
| -----------  | ------------------------------------ | ---------------------------| --------   |
| **multiple** | Allowed multiple files selection     | `boolean`                  | false      |
| **accept**   | Allowed file types                   | `string`                   | *          |
| **capture**  | Capture mode                         | `string`                   | undefined  |

<br/>
<br/>

### Returns

| Name        | Description                          | Type                          |
| ----------- | -------------------------------------| ----------------------------- |
| **files**   | List of selected files.              | Readable<`FileList`>          |
| **accepted**| List of accepted files.              | Readable<`File[]`>            |
| **rejected**| List of rejected files.              | Readable<`File[]`>            |
| **open**    | Open the file dialog.                | (localOptions?) =>void        |
| **reset**   | Reset file dialog.                   | () => void                    |
| **onChange**| The event when the files change.     | EventHookOn<`any`>            |
