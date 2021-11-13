import { getEncryptedEmoji } from './getEncryptedEmoji'

export const toEncryptedText = (encryptedText?: string): string | null => {
	return encryptedText ? `${encryptedText} ${getEncryptedEmoji()}` : null
}