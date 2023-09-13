import adapter from "@sveltejs/adapter-vercel"
import { vitePreprocess } from "@sveltejs/kit/vite"

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	extensions: [".svelte", ".md"],
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter({}),
		alias: {
			$components: "src/components",
		},
	},
}

export default config
