<script lang='ts'>
	import { EncryptedWish } from '../../../../services/entities/EncryptedWish'
	import { toEncryptedText } from '../../../../helpers/utils/toEncryptedText'

	export let encryptedWish: EncryptedWish

</script>

<div>
	<span>
		Name : {toEncryptedText(encryptedWish.name.ciphertext)}
	</span>
	<span>
		Price: {toEncryptedText(encryptedWish.price?.ciphertext)}
	</span>
	<span>
		Comment: {toEncryptedText(encryptedWish.comment?.ciphertext)}
	</span>
	<span>
		URL: {toEncryptedText(encryptedWish.url?.ciphertext)}
	</span>
</div>
