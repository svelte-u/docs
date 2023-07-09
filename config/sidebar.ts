import { changeCase } from "@sveu/extend/changeCase"

import fs from "fs"
import path from "path"

function get_sidebar() {
	const packages = ["actions", "browser", "extend", "shared"]

	const sidebar = []

	for (const pkg of packages) {
		const items = []

		const pkg_path = path.join(__dirname, "..", "src/routes/docs", pkg)

		const folders = fs
			.readdirSync(pkg_path, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name)

		for (const folder of folders) {
			items.push({
				title: changeCase(folder, "capitalCase"),
				to: `/docs/${pkg}/${folder}/`,
			})
		}

		sidebar.push({
			title: changeCase(pkg, "capitalCase"),
			collapsible: true,
			items,
		})
	}

	return sidebar
}

export const sidebar = get_sidebar()
