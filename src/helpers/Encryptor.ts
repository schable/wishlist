import type { CipherData } from 'easy-web-crypto'
import { encrypt, exportKey, genAESKey, importKey } from 'easy-web-crypto'
import type { WishList } from '../models/WishList'
import { EncryptedWishList } from '../services/entities/EncryptedWishList'
import type { Wish } from '../models/Wish'
import { EncryptedWish } from '../services/entities/EncryptedWish'

export class Encryptor {
	aesEncryptionKey

	constructor(aesEncryptionKey: CryptoKey) {
		this.aesEncryptionKey = aesEncryptionKey
	}

	static async new(encryptionKey?: string): Promise<Encryptor> {
		if (encryptionKey) {
			const jsonWebKey = Encryptor.toJwk(encryptionKey) as ArrayBuffer
			const aesEncryptionKey = await importKey(jsonWebKey, 'jwk')
			return new Encryptor(aesEncryptionKey)
		} else {
			const aesEncryptionKey: CryptoKey = await genAESKey()
			return new Encryptor(aesEncryptionKey)
		}
	}

	static toJwk(key: string): JsonWebKey {
		return {
			alg: 'A128GCM',
			ext: true,
			k: key,
			key_ops: ['encrypt', 'decrypt'],
			kty: 'oct',
		}
	}

	static fromJwk(key: JsonWebKey): string {
		return key.k
	}

	async getEncryptionKeyForUrl(): Promise<string> {
		const exportedKey: JsonWebKey = await exportKey(this.aesEncryptionKey, 'jwk') as JsonWebKey
		return Encryptor.fromJwk(exportedKey)
	}

	async encrypt(data?: string): Promise<CipherData> {
		return data ? await encrypt(this.aesEncryptionKey, data) : Promise.resolve(undefined)
	}

	async fromWishList(wishList: WishList): Promise<EncryptedWishList> {
		const encryptedWishList = new EncryptedWishList()
		encryptedWishList.uuid = wishList.uuid
		encryptedWishList.deletionDate = wishList.deletionDate
		encryptedWishList.name = await this.encrypt(wishList.name)
		return encryptedWishList
	}

	async fromWish(wish: Wish): Promise<EncryptedWish> {
		const encryptedWish = new EncryptedWish()
		encryptedWish.uuid = wish.uuid
		encryptedWish.listUuid = wish.listUuid
		encryptedWish.reserved = wish.reserved
		encryptedWish.comment = await this.encrypt(wish.comment)
		encryptedWish.name = await this.encrypt(wish.name)
		encryptedWish.price = await this.encrypt(wish.price?.toString())
		encryptedWish.url = await this.encrypt(wish.url)
		return encryptedWish
	}

}