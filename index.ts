import {
	Action,
	expose,
	Form,
	fs,
	Icon,
	IconEnum,
	List,
	path,
	shell,
	toast,
	ui,
	TemplateUiCommand
} from "@kksh/api/ui/template"

shell.executeBashScript("echo 'Hello, World!'").then(console.log)

class ExtensionTemplate extends TemplateUiCommand {
	async onFormSubmit(value: Record<string, any>): Promise<void> {
		console.log("Form submitted", value)
		toast.success(`Form submitted: ${JSON.stringify(value)}`)
	}
	async load() {
		return ui.render(
			new Form.Form({
				key: "form1",
				fields: [
					new Form.NumberField({
						key: "age",
						label: "Age",
						placeholder: "Enter your age"
					})
					// new Form.NumberField({
					// 	key: "age"
					// }),
					// new Form.Form({
					// 	key: "random",
					// 	fields: [
					// 		new Form.BooleanField({ key: "Server On" }),
					// 		new Form.ArrayField({
					// 			key: "birthday",
					// 			content: new Form.DateField({ key: "birthday" })
					// 		})
					// 	]
					// })
				]
			})
		)
		return toast
			.info("Worker Template Extension loaded")
			.then(() => {
				return ui.setSearchBarPlaceholder("Enter a search term, and press enter to search")
			})
			.then(() => {
				return ui.render(
					new List.List({
						sections: [
							new List.Section({
								title: "Section 1",
								items: [
									new List.Item({
										title: "Hello, World!",
										value: "Section 1 Hello, World!",
										icon: new Icon({ type: IconEnum.Iconify, value: "gg:hello" })
									}),
									new List.Item({ title: "Hello, World 2!", value: "Section 1 Hello, World 2!" })
								]
							}),
							new List.Section({
								title: "Section 2",
								items: [
									new List.Item({
										title: "Hello, World!",
										value: "Section 2 Hello, World!",
										icon: new Icon({ type: IconEnum.Iconify, value: "gg:hello" })
									}),
									new List.Item({ title: "Hello, World 2!", value: "Section 2 Hello, World 2!" })
								]
							})
						],
						items: [
							new List.Item({
								title: "Hello, World!",
								value: "Hello, World!",
								icon: new Icon({ type: IconEnum.Iconify, value: "ri:star-s-fill" })
							}),
							new List.Item({
								title: "Hello, World 2!",
								value: "Hello, World 2!",
								icon: new Icon({ type: IconEnum.Iconify, value: "gg:hello" }),
								actions: new Action.ActionPanel({
									items: [
										new Action.Action({
											title: "Open",
											icon: new Icon({ type: IconEnum.Iconify, value: "ion:open-outline" })
										})
									]
								})
							})
						]
					})
				)
			})
	}

	onSearchTermChange(term: string): Promise<void> {
		return Promise.resolve()
	}

	onItemSelected(value: string): Promise<void> {
		console.log("Item selected:", value)
		return Promise.resolve()
	}
}

expose(new ExtensionTemplate())
