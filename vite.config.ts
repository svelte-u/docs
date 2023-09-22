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
				ga: "G-0W8V2FLKY8",
				docsearch: {
					appId: "AFZNEE7ZW9",
					apiKey: "c4edfd7a902f53dbd7f863055e900e69",
					indexName: "svelte-u",
				},
			}),
			siteConfig: {
				title: "Svelte Utility",
				description: "A collection of useful utility functions for Svelte",
			},
		}),
	],
})

export default config
