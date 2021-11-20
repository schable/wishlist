<script lang='ts'>
	import { EncryptedWish } from '../../../../services/entities/EncryptedWish'
	import { toEncryptedText } from '../../../../helpers/utils/toEncryptedText'
	import { translatedText } from '../../../../stores/translatedText'

	export let encryptedWish: EncryptedWish

</script>

<div class='text-sm grid grid-rows-4 grid-cols-1 gap-2 h-full'>
	<div class='flex justify-between items-start'>
		<p class='font-medium text-lg truncate space-x-2'>{toEncryptedText(encryptedWish.name.ciphertext)}</p>
		{#if encryptedWish.price}
			<p class='truncate'>{toEncryptedText(encryptedWish.price.ciphertext)}&nbsp;€</p>
		{/if}
	</div>

	{#if encryptedWish.url}
		<a class='underline text-green-900 truncate'>👀 {toEncryptedText(encryptedWish.url.ciphertext)}</a>
	{:else}
		<p class='italic font-thin'>{$translatedText.viewListPage.missingUrl}</p>
	{/if}

	{#if encryptedWish.comment}
		<p class='grid grid-cols-1'>
			<span>{$translatedText.viewListPage.wishComment}</span>
			<span class='font-extralight truncate'>{toEncryptedText(encryptedWish.comment.ciphertext)}</span>
		</p>
	{:else}
		<p class='italic font-thin'>{$translatedText.viewListPage.missingComment}</p>
	{/if}

	<div class='text-center row-start-4'>
		<button class='bg-gray-900 text-green-100 rounded p-2 shadow disabled:cursor-not-allowed disabled:bg-gray-50' type='button' disabled={true}>{#if encryptedWish.available}{$translatedText.viewListPage.bookAction}{:else}{$translatedText.viewListPage.bookedAction}{/if}</button>
	</div>
</div>
