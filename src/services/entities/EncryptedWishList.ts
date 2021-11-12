import type { CipherData } from 'easy-web-crypto'

export class EncryptedWishList {
	uuid: string
	deletionDate: Date
	name: CipherData

	constructor(uuid: string, deletionDate: Date, name: CipherData) {
		this.uuid = uuid
		this.deletionDate = deletionDate
		this.name = name
	}
}