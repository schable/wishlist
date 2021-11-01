import type { CipherData } from 'easy-web-crypto'
import type { Wish } from '../../models/Wish'

export class EncryptedWishList {
	uuid: string
	deletionDate: Date
	name: CipherData
	wishes: Wish[]
}