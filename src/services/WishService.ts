import type { Wish } from '../models/Wish'
import type { Encryptor } from '../helpers/Encryptor'

export class WishService {
	encryptor

	constructor(encryptor: Encryptor) {
		this.encryptor = encryptor
	}

	async save(wish: Wish): Promise<void> {
		const encryptedWish = await this.encryptor.fromWish(wish)
		console.log('encrypted wish saved', encryptedWish)
	}
}
