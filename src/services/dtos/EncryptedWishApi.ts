import { EncryptedWish } from '../entities/EncryptedWish'

export class EncryptedWishApi {
	id: string
	list_uuid: string
	available: boolean
	comment: string
	name: string
	price: string
	url: string

	constructor(id: string, list_uuid: string, available: boolean, name: string, comment?: string, price?: string, url?: string) {
		this.id = id
		this.list_uuid = list_uuid
		this.available = available
		this.comment = comment
		this.name = name
		this.price = price
		this.url = url
	}

	static toEncryptedWish({ id, list_uuid, available, comment, name, price, url }: EncryptedWishApi): EncryptedWish {
		const nameCipher = JSON.parse(name)
		const commentCipher = JSON.parse(comment)
		const priceCipher = JSON.parse(price)
		const urlCipher = JSON.parse(url)
		return new EncryptedWish(id, list_uuid, available, nameCipher, commentCipher, priceCipher, urlCipher)
	}

	static fromEncryptedWish(encryptedWish: EncryptedWish): EncryptedWishApi {
		const name = JSON.stringify(encryptedWish.name)
		const comment = JSON.stringify(encryptedWish.comment)
		const price = JSON.stringify(encryptedWish.price)
		const url = JSON.stringify(encryptedWish.url)
		return new EncryptedWishApi(encryptedWish.uuid, encryptedWish.listUuid, encryptedWish.available, name, comment, price, url)
	}
}