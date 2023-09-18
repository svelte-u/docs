import { error, json } from "@sveltejs/kit"

import { sleep } from "@sveu/shared"

import webpush from "web-push"

import type { RequestHandler } from "./$types"
import { rule } from "./helper"

webpush.setVapidDetails(
	`mailto:example@example.com`,
	"BJhRxOx05VZ7Yd9vmpvlibidolVdM-jjDJDDXSAZh8bTBcHLWJFT6dCwGViQ0SbnlDo-GGQoFuDKOuJvsieSs2Q",
	"0i6DUp65PQ0QCUEX1vJOxO3ya4ZH8n998JbA5JjLUP0"
)

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json()

	console.log("Close the tab....")

	await sleep(5)

	try {
		const result = rule.parse(data)

		const payload = JSON.stringify({ ...result.payload })

		try {
			const promises = result.tokens.map((token) => {
				const _token: webpush.PushSubscription = JSON.parse(
					Buffer.from(token, "base64").toString("utf-8")
				)

				return webpush.sendNotification(_token, payload)
			})

			await Promise.all(promises)

			return json({ success: true })
		} catch (err: any) {
			return new Response(err.message, {
				status: 400,
			})
		}
	} catch (err: any) {
		if (err) throw error(400, err.message)
	}

	return json({ success: true })
}
