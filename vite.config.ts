import { defaultTheme } from "@sveltepress/theme-default"
import { sveltepress } from "@sveltepress/vite"

import { defineConfig } from "vite"

import { sidebar } from "./config/sidebar"

const config = defineConfig({
	plugins: [
		sveltepress({
			theme: defaultTheme({
				navbar: [
					{
						title: "Docs",
						to: "/docs/intro/",
					},
				],
				sidebar: {
					"/docs/": [
						{
							title: "Guide",
							collapsible: true,
							items: [
								{
									title: "Get Started",
									to: "/docs/intro/",
								},
								{
									title: "Contributing",
									to: "/docs/contributing/",
								},
							],
						},
						...sidebar,
					],
				},
				github: "https://github.com/svelte-u/docs",
				logo: "/logo.png",
				discord: "https://discord.gg/nbkcHgDXPc",
			}),
			siteConfig: {
				title: "Svelte Utility",
				description: "A collection of useful utility functions for Svelte",
			},
		}),
	],
})

export default config
