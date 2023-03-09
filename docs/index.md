---
description: A collection of utility functions, which help you build powerful app in svelte.
---

<p align="center">
	<img style="height: 10rem;"  src="https://avatars.githubusercontent.com/u/120715197" />

	<h3 align="center">Svelte Utility</h3>
	<h2 align="center">Write less, Do more</h2>
</p>


---
The key features are:

* **Type Strong 💪**: Written in [TypeScript](https://www.typescriptlang.org/), with [TS Docs](https://github.com/microsoft/tsdoc).
* **Fast to code 🚀**: Increase the speed to develop features by about 200% to 300%.
* **Fewer bugs 🐞**: Reduce about 40% of human (developer) induced errors.
* **SSR Friendly 🕺**: Works perfectly with server-side.
* **Easy 💫**: Designed to be easy to use and learn. Less time reading docs.
* **Interactive demos 🎉** : Documentation of functions also come with interactive demos!.
* **Feature Rich  🌈**: 100+ functions for you to choose from.
* **Fully 🌳 shakeable**: Only take what you want.

## Installation

=== "Actions"

	<div class="termy">

	```console
	$ pnpm add -D @sveu/actions

	---> 100%
	```

	</div>


=== "Browser"

	<div class="termy">

	```console
	$ pnpm add -D @sveu/browser

	---> 100%
	```

	</div>

=== "Extend"

	<div class="termy">

	```console
	$ pnpm add -D @sveu/extend

	---> 100%
	```

	</div>

=== "Shared"

	<div class="termy">

	```console
	$ pnpm add -D @sveu/shared

	---> 100%
	```

	</div>

## 🧪 Example

=== "Actions"

    ``` html
	<script>
	import { dropzone } from "@sveu/actions"

	function hover(event) {
		...
	}

	function on_file_drop(event) {
		...
	}
	</script>

	<div use:dropzone on:hover="{hover}" on:files="{on_file_drop}" />

    ```

=== "Browser"

    ``` html

	<script>
	import {permission} from "@sveu/browser"

	const { state, supported } = permission("geolocation", {controls: true})
	</script>

	<h1>Is supported is: {$supported}</h1>

	<h1>state is: {$state}</h1>

    ```

=== "Extend"

    ``` html
	
	<script>
	import { fcm } from "@sveu/extend/fcm"
	
	const { token, error, supported, on_message } = fcm(firebase_app, {vapid_key:"my-key",})
	
	</script>

    ```

=== "Shared"

    ``` html

	<script>
	import {strftime} from "@sveu/shared"
	
	const time = strftime(Date.now(), "%Y-%m-%d %H:%M:%S") // 2023-03-09 13:52:34
	</script>

	{time}
    ```

## 🙏 Thanks

This project is heavily inspired by the following awesome projects.

- [vueuse/vueuse](https://github.com/vueuse/vueuse/)
- [rayepps/radash](https://github.com/rayepps/radash)
- [Python](https://python.org)
- [Vue](https://vuejs.org)

## 📜 License

[MIT License](#License) © 2022-PRESENT [Mohamed Nesredin](https://github.com/mohamed-kaizen)
