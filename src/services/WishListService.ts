import type { WishList } from '../models/WishList'
import type { Encryptor } from '../helpers/Encryptor'
import type { EncryptedWishList } from './entities/EncryptedWishList'
import { EncryptedWishListApi } from './dtos/EncryptedWishListApi'

export class WishListService {
	private encryptor

	constructor(encryptor: Encryptor) {
		this.encryptor = encryptor
	}

	public async save(wishList: WishList): Promise<void> {
		const encryptedWishList: EncryptedWishList = await this.encryptor.fromWishList(wishList)

		try {
			await fetch(`http://localhost:3000/api/new-wish-list/${encryptedWishList.uuid}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(encryptedWishList),
			})
		} catch (error){
			console.log('ERROR WHILE SAVING LIST', error)
		}
	}

	public static async getEncrypted(wishListId: string, svelteFetch: typeof fetch): Promise<EncryptedWishList> {
		const response = await svelteFetch(`http://localhost:3000/api/new-wish-list/${wishListId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const encryptedWishList = await response.json()
		return EncryptedWishListApi.toEncryptedWishList(encryptedWishList)
	}
}
