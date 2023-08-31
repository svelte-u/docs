---
title: Start Typing
description: Create a typing listener for the given element.
---

Create a typing listener for the given element.

## Usage

```svelte
<script>
    import {startTyping} from "@sveu/actions"

    function fn(element, event){
         if(element !== document.activeElement) element.focus()
    }
</script>

<input use:startTyping="{fn}" />
```

## Example

```svelte live ln
<script>
    import {startTyping} from "@sveu/actions" // [svp! hl]

    function fn(element, event){
         if(element !== document.activeElement) element.focus() // [svp! hl]
    }
</script>

<input placeholder="Search....." use:startTyping="{fn}" />  <!-- // [svp! hl]  -->

<input placeholder="Enter your name"  />
```

## API

### Arguments

| Name    | Description                                  | Type                  | Required |
| --------| -------------------------------------------- | --------------------- | -------- |
| **fn**  | A function to be called when the user types a character. | (element: T, event: KeyboardEvent) => void | Yes |

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
