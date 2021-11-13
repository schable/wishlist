<script lang='ts'>
	import { EncryptedWish } from '../../../../services/entities/EncryptedWish'
	import { toEncryptedText } from '../../../../helpers/utils/toEncryptedText'

	export let encryptedWish: EncryptedWish

</script>

<form action='' method='post'>
	<label>
		Name
		<input type='text' name='name' value={toEncryptedText(encryptedWish.name.ciphertext)} disabled />
	</label>
	<label>
		Price
		<input type='number' name='price' value={toEncryptedText(encryptedWish.price?.ciphertext)} disabled />
	</label>
	<label>
		Comment
		<input type='text' name='comment' value={toEncryptedText(encryptedWish.comment?.ciphertext)} disabled />
	</label>
	<label>
		URL
		<input type='url' name='url' value={toEncryptedText(encryptedWish.url?.ciphertext)} disabled />
	</label>
</form>
