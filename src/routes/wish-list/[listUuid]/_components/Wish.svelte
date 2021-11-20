<script lang='ts'>
	import { Wish } from '../../../../models/Wish'
	import { translatedText } from '../../../../stores/translatedText'

	export let saveWishAvailability
	export let wish: Wish

	const toggleAvailability = () => {
		wish.available = !wish.available
		saveWishAvailability(wish)
	}
</script>

<div class='text-sm grid grid-rows-4 grid-cols-1 gap-2 h-full'>
	<div class='flex justify-between items-start'>
		<p class='font-medium text-lg truncate space-x-2'>{wish.name}</p>
		{#if wish.price}
			<p>{wish.price}&nbsp;€</p>
		{/if}
	</div>

	{#if wish.url}
		<a class='underline text-green-900' href={wish.url} target='_blank'>👀 {$translatedText.viewListPage.wishUrl}</a>
	{:else}
		<p class='italic font-thin'>{$translatedText.viewListPage.missingUrl}</p>
	{/if}

	{#if wish.comment}
		<p class='grid grid-cols-1'>
			<span>{$translatedText.viewListPage.wishComment}</span>
			<span class='font-extralight'>{wish.comment}</span>
		</p>
	{:else}
		<p class='italic font-thin'>{$translatedText.viewListPage.missingComment}</p>
	{/if}

	<div class='text-center row-start-4'>
		<button class='bg-gray-900 text-green-100 rounded p-2 shadow disabled:cursor-not-allowed disabled:bg-gray-50' type='button' disabled={!wish.available}
						on:click={toggleAvailability}>{#if wish.available}{$translatedText.viewListPage.bookAction}{:else}{$translatedText.viewListPage.bookedAction}{/if}</button>
	</div>
</div>
