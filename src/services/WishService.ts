import type { Wish } from '../models/Wish'
import type { Encryptor } from '../helpers/Encryptor'
import { EncryptedWishApi } from './dtos/EncryptedWishApi'
import type { EncryptedWish } from './entities/EncryptedWish'

export class WishService {
	encryptor

	constructor(encryptor: Encryptor) {
		this.encryptor = encryptor
	}

	async save(wish: Wish): Promise<void> {
		const encryptedWish = await this.encryptor.fromWish(wish)
		const encryptedWishApi = EncryptedWishApi.fromEncryptedWish(encryptedWish)

		try {
			await fetch(`http://localhost:3000/api/new-wish`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(encryptedWishApi),
			})
		} catch (error) {
			console.log('ERROR WHILE SAVING LIST', error)
		}
	}

	public static async getAllEncryptedForList(listUuid: string, svelteFetch: typeof fetch): Promise<EncryptedWish[]> {
		const response = await svelteFetch(`http://localhost:3000/api/wish-list/${listUuid}/wish`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const encryptedWishApiList: EncryptedWishApi[] = await response.json()
		return encryptedWishApiList.map(encryptedWishApi => EncryptedWishApi.toEncryptedWish(encryptedWishApi))

	}
}
