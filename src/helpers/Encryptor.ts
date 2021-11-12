import type { CipherData } from 'easy-web-crypto'
import { decrypt, encrypt, exportKey, genAESKey, importKey } from 'easy-web-crypto'
import { WishList } from '../models/WishList'
import { EncryptedWishList } from '../services/entities/EncryptedWishList'
import { Wish } from '../models/Wish'
import { EncryptedWish } from '../services/entities/EncryptedWish'

export class Encryptor {
	private readonly aesEncryptionKey

	constructor(aesEncryptionKey: CryptoKey) {
		this.aesEncryptionKey = aesEncryptionKey
	}

	public static async new(encryptionKey?: string): Promise<Encryptor> {
		if (encryptionKey) {
			const jsonWebKey = Encryptor.toJsonWebKey(encryptionKey) as ArrayBuffer
			const aesEncryptionKey = await importKey(jsonWebKey, 'jwk')
			return new Encryptor(aesEncryptionKey)
		} else {
			const aesEncryptionKey: CryptoKey = await genAESKey()
			return new Encryptor(aesEncryptionKey)
		}
	}

	private static toJsonWebKey(key: string): JsonWebKey {
		return {
			alg: 'A128GCM',
			ext: true,
			k: key,
			key_ops: ['encrypt', 'decrypt'],
			kty: 'oct',
		}
	}

	private static fromJsonWebKey(key: JsonWebKey): string {
		return key.k
	}

	public async getEncryptionKeyForUrl(): Promise<string> {
		const exportedKey: JsonWebKey = await exportKey(this.aesEncryptionKey, 'jwk') as JsonWebKey
		return Encryptor.fromJsonWebKey(exportedKey)
	}

	private async encrypt(data?: string): Promise<CipherData> {
		return data ? await encrypt(this.aesEncryptionKey, data) : Promise.resolve(undefined)
	}

	private async decrypt(data?: CipherData) {
		return data ? await decrypt(this.aesEncryptionKey, data) : Promise.resolve(null)
	}

	public async fromWishList(wishList: WishList): Promise<EncryptedWishList> {
		const encryptedWishListName = await this.encrypt(wishList.name)
		return new EncryptedWishList(wishList.uuid, wishList.deletionDate, encryptedWishListName)
	}

	public async toWishList(encryptedWishList: EncryptedWishList): Promise<WishList> {
		const wishList = new WishList(encryptedWishList.uuid)
		wishList.deletionDate = encryptedWishList.deletionDate
		wishList.name = await this.decrypt(encryptedWishList.name)
		return wishList
	}

	public async fromWish(wish: Wish): Promise<EncryptedWish> {
		const comment = await this.encrypt(wish.comment)
		const name = await this.encrypt(wish.name)
		const price = await this.encrypt(wish.price?.toString())
		const url = await this.encrypt(wish.url)

		return new EncryptedWish(wish.uuid, wish.listUuid, wish.available, name, comment, price, url)
	}

	public async toWish(encryptedWish: EncryptedWish): Promise<Wish> {
		const name = await this.decrypt(encryptedWish.name)
		const comment = await this.decrypt(encryptedWish.comment)
		const url = await this.decrypt(encryptedWish.url)
		const price = await this.decrypt(encryptedWish.price)
		const wish = new Wish(encryptedWish.uuid, encryptedWish.listUuid, comment, name, price, url)
		wish.available = encryptedWish.available
		return wish
	}
}