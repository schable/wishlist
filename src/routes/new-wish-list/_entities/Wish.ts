export class Wish {
	reserved: boolean = false

	constructor(
		public uuid: string,
		public comment?: string,
		public name?: string,
		public price?: number,
		public url?: string,
	) {
		this.uuid = uuid
		this.comment = comment
		this.name = name
		this.price = price
		this.url = url
	}

	isEmpty(): boolean {
		return (
			this.comment === undefined &&
			this.name === undefined &&
			this.price === undefined &&
			this.url === undefined
		)
	}
}
