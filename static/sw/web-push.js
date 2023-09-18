self.addEventListener("push", (e) => {
	const data = e.data.json()

	const title = data.title

	delete data.title

	self.registration.showNotification(title, data)
})
