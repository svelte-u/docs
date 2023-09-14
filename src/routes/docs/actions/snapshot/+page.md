---
title: Snapshot
description: Takes a snapshot of an element.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Takes a snapshot of an element. Inspired by **[SvelteKit Snapshot](https://kit.svelte.dev/docs/snapshots)**.

## Usage

```svelte
<script>
    import {snapshot} from "@sveu/actions"

    function restore(state) {
        // Your code here
    }

    function capture(target) {
        // Your code here
        return "Return the state of the node."
    }

    options = {
        restore
        capture
    }
</script>

<form use:snapshot="{options}">
    <input type="text" />

    <button>Submit</button>
</form>
```

## Example

### Default

```svelte live ln
<script lang="ts">
    import { snapshot } from "@sveu/actions"

    interface SnapshotForm {
        name: string
        expires_on?: number
    }

    let snapshot_form: SnapshotForm = {
        name: "Svelte U is Awesome",
    }

    function restore(node: SnapshotForm) {
        if (node.expires_on && Date.now() < node.expires_on)
            snapshot_form = node
    }

    function capture() {
        snapshot_form.expires_on = Date.now() + 1 * 60 * 1000
        return snapshot_form
    }
</script>

 <!-- // [svp! hl:8]  -->
<form
    use:snapshot="{{ 
        capture,
        restore,
        fallback: snapshot_form,
    }}"
    class="flex flex-col items-center">
    <note class="border border-4 rounded-2xl shadow-lg mb-9 p-2">
        <p>Try type something and refresh the page</p>
    </note>

    <input
        type="text"
        name="name"
        bind:value="{snapshot_form.name}"
    />
</form>
```

### With Cookie

```svelte live ln
<script lang="ts">
    import { snapshot } from "@sveu/actions"

    interface SnapshotForm {
        name: string
        expires_on?: number
    }

    let snapshot_form: SnapshotForm = {
        name: "Svelte U is Awesome",
    }

    function restore(node: SnapshotForm) {
        if (node.expires_on && Date.now() < node.expires_on)
            snapshot_form = node
    }

    function capture() {
        snapshot_form.expires_on = Date.now() + 1 * 60 * 1000
        return snapshot_form
    }
</script>

 <!-- // [svp! hl:8]  -->
<form
    use:snapshot="{{ 
        capture,
        restore,
        fallback: snapshot_form,
        store: 'cookie',
    }}"
    class="flex flex-col items-center">
    <note class="border border-4 rounded-2xl shadow-lg mb-9 p-2">
        <p>Try type something and refresh the page</p>
    </note>

    <input
        type="text"
        name="name"
        bind:value="{snapshot_form.name}"
    />
</form>
```

### With Session

```svelte live ln
<script lang="ts">
    import { snapshot } from "@sveu/actions"

    interface SnapshotForm {
        name: string
        expires_on?: number
    }

    let snapshot_form: SnapshotForm = {
        name: "Svelte U is Awesome",
    }

    function restore(node: SnapshotForm) {
        if (node.expires_on && Date.now() < node.expires_on)
            snapshot_form = node
    }

    function capture() {
        snapshot_form.expires_on = Date.now() + 1 * 60 * 1000
        return snapshot_form
    }
</script>

 <!-- // [svp! hl:8]  -->
<form
    use:snapshot="{{ 
        capture,
        restore,
        fallback: snapshot_form,
        store: 'session',
    }}"
    class="flex flex-col items-center">
    <note class="border border-4 rounded-2xl shadow-lg mb-9 p-2">
        <p>Try type something and refresh the page</p>
    </note>

    <input
        type="text"
        name="name"
        bind:value="{snapshot_form.name}"
    />
</form>
```

## API

### Arguments

| Name | Description                                     | Type                       | Default     |
| ---- | ----------------------------------------------- | -------------------------- | ----------- |
| **key** | The key to use for storing the snapshot data | string                     | snapshot    |
| **fallback**| The fallback value for the snapshot data | unknown                    |             |
| **store**| The storage to use for storing the snapshot | cookie/local/session       | local       |
| **capture**| A function that captures the state of the node | (target: T) => unknown| undefined   |
| **restore**| A function that restores the state of the node | (state: any) => void |() => noop()  |

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
