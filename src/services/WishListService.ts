import type { WishList } from '../models/WishList'
import type { Encryptor } from '../helpers/Encryptor'

export class WishListService {
	encryptor

	constructor(encryptor: Encryptor) {
		this.encryptor = encryptor
	}

	async save(wishList: WishList): Promise<void> {
		const encryptedWishList = await this.encryptor.fromWishList(wishList)
		console.log('encrypted wish list saved', encryptedWishList)
	}
}
