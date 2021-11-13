export const toEncryptedText = (encryptedText?: string): string | null => {
	return encryptedText ? encryptedText + ' 🔒' : null
}