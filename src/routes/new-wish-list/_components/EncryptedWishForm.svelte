<script lang='ts'>
	import { EncryptedWish } from '../../../services/entities/EncryptedWish'

	export let encryptedWish: EncryptedWish

</script>

<form action='' method='post'>
	<label>
		Name
		<input type='text' name='name' value={encryptedWish.name.ciphertext} disabled />
	</label>
	<label>
		Price
		<input type='number' name='price' value={encryptedWish.price?.ciphertext || null} disabled />
	</label>
	<label>
		Comment
		<input type='text' name='comment' value={encryptedWish.comment?.ciphertext || null} disabled />
	</label>
	<label>
		URL
		<input type='url' name='url' value={encryptedWish.url?.ciphertext ||null} disabled />
	</label>
</form>
