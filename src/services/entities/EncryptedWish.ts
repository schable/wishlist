import type { CipherData } from 'easy-web-crypto'
import type { Wish } from '../../models/Wish'
import type { Encryptor } from '../../helpers/Encryptor'

export class EncryptedWish {
	uuid: string
	listUuid: string
	reserved: boolean
	comment: CipherData
	name: CipherData
	price: CipherData
	url: CipherData
}