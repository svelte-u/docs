---
title: Getting Started
description: A quick introduction to the basics of using svelte Utility
---

Svelte Utility is a collection of utility functions that can be used in your Svelte projects. It's divided into multiple packages, each with their own focus:

-   `actions`: A collection of Svelte actions. Because `svelte actions` work in browser context, these actions are only available in the browser.
-   `browser`: A collection of function that are only available in the browser.
-   `extend`: A collection of integrations with 3rd party libraries.
-   `shared`: A shared module that is used by the other packages.

## Installation

First pick the package you want to install. For example, if you want to use the `snapshot` action, you'll need to install the `actions`, etc.

### Actions

@install-pkg(@sveu/actions)

### Browser

@install-pkg(@sveu/browser)

### Extend

@install-pkg(@sveu/extend)

### Shared

@install-pkg(@sveu/shared)

## Usage

The packages are designed to be tree-shakeable, so you can import only the functions you need. For example, if you want to use the `snapshot` action, you can import it like this:

```ts
import { snapshot } from "@sveu/actions"
```

If you want to use multiple functions from the same package, you can import them all at once:

```ts
import { dropzone, snapshot } from "@sveu/actions"
```

If you want to use multiple functions from different packages, you can import them like this:

```ts
import { snapshot } from "@sveu/actions"
import { mouse } from "@sveu/browser"
```
