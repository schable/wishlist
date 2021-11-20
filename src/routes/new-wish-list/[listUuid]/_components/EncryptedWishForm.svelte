<script lang='ts'>
	import { EncryptedWish } from '../../../../services/entities/EncryptedWish'
	import { toEncryptedText } from '../../../../helpers/utils/toEncryptedText'
	import { translatedText } from '../../../../stores/translatedText'
	import TextInput from '../../../../design-system/TextInput.svelte'
	import NumberInput from '../../../../design-system/NumberInput.svelte'
	import TextArea from '../../../../design-system/TextArea.svelte'

	export let encryptedWish: EncryptedWish

</script>

<form action='' method='post'>
	<TextInput label={$translatedText.newWishPage.wishName} name='name' value={toEncryptedText(encryptedWish.name.ciphertext)} disabled/>
	<NumberInput label={$translatedText.newWishPage.wishPrice} name='price' value={toEncryptedText(encryptedWish.price?.ciphertext)} disabled/>
	<TextArea label={$translatedText.newWishPage.wishComment} name='comment' value={toEncryptedText(encryptedWish.comment?.ciphertext)} disabled/>
	<TextInput label={$translatedText.newWishPage.wishUrl} name='url' value={toEncryptedText(encryptedWish.url?.ciphertext)} disabled/>
</form>
