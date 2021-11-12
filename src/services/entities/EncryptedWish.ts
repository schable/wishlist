import type { CipherData } from 'easy-web-crypto'

export class EncryptedWish {
	uuid: string
	listUuid: string
	available: boolean
	name: CipherData
	comment: CipherData
	price: CipherData
	url: CipherData

	constructor(uuid: string, listUuid: string, available: boolean, name: CipherData, comment?: CipherData, price?: CipherData, url?: CipherData) {
		this.uuid = uuid
		this.listUuid = listUuid
		this.available = available
		this.name = name
		this.comment = comment
		this.price = price
		this.url = url
	}
}