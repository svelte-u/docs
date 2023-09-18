import { z } from "zod"

const payload = z
	.object({
		title: z.string().min(1),

		body: z.string().min(1),

		icon: z.string().url(),

		image: z.string().url(),

		badge: z.string(),

		tag: z.string(),

		dir: z.enum(["auto", "ltr", "rtl"]),

		vibrate: z.array(z.number()),

		timestamp: z.number(),

		renotify: z.boolean(),

		requireInteraction: z.boolean(),

		silent: z.boolean(),

		persistent: z.boolean(),

		sticky: z.boolean(),

		notificationCloseEvent: z.boolean(),

		showTrigger: z.boolean(),

		actions: z.array(
			z.object({
				action: z.string(),
				title: z.string(),
				icon: z.string(),
			})
		),

		data: z.record(z.unknown()),
	})
	.partial()
	.required({
		title: true,
		body: true,
	})

export const rule = z.object({
	tokens: z.array(z.string()).min(1),

	payload,
})
