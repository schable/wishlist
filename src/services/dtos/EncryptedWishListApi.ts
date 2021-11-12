import { EncryptedWishList } from '../entities/EncryptedWishList'

export class EncryptedWishListApi {
	id: string
	deletiondate: string
	name: string

	static toEncryptedWishList({ deletiondate, id, name }: EncryptedWishListApi): EncryptedWishList {
		const date = new Date(deletiondate)
		const nameObject = JSON.parse(name)
		return new EncryptedWishList(id, date, { ciphertext: nameObject.ciphertext, iv: nameObject.iv })
	}
}