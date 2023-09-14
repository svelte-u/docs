<script lang="ts">
	import { page } from "$app/stores"

	const lib = $page.url.pathname.split("/").at(-2)

	const name = $page.url.pathname.split("/").at(-1)
</script>

<div class="flex space-x-4 -mt-12 mb-8 w-full justify-end">
	<a
		class="hover:text-orange-500"
		href="https://github.com/svelte-u/docs/blob/main/src/routes/docs/{lib}/{name}/%2Bpage.md"
		target="_blank">
		<div class="i-fluent:edit-12-regular"></div>
	</a>

	<a
		class="hover:text-orange-500"
		href="https://github.com/svelte-u/{lib}/blob/main/src/{name}/index.ts"
		target="_blank">
		<div class="i-simple-icons:github"></div>
	</a>
</div>
