export class Wish {
	available = true

	constructor(
		public uuid: string,
		public listUuid: string,
		public comment?: string,
		public name?: string,
		public price?: number,
		public url?: string,
	) {
		this.uuid = uuid
		this.listUuid = listUuid
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
