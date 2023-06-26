import { defaultTheme } from "@sveltepress/theme-default"
import { sveltepress } from "@sveltepress/vite"

import { defineConfig } from "vite"

const config = defineConfig({
	plugins: [
		sveltepress({
			theme: defaultTheme({
				navbar: [
					{
						title: "Docs",
						to: "/docs/intro/",
					},
					{
						title: "Contributing",
						to: "/contributing/",
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
							],
						},
						{
							title: "Actions",
							collapsible: true,
							items: [],
						},
						{
							title: "Browser",
							collapsible: true,
							items: [],
						},
						{
							title: "Extend",
							collapsible: true,
							items: [],
						},
						{
							title: "Shared",
							collapsible: true,
							items: [],
						},
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
