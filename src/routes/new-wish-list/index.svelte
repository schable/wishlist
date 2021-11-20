<script context='module' lang='ts'>
	import type { LoadOutput } from '@sveltejs/kit'
	import { UuidGenerator } from '../../helpers/UuidGenerator'

	export function load(): LoadOutput {
		const uuidGenerator = new UuidGenerator()

		return {
			props: {
				uuidGenerator,
			},
		}
	}
</script>

<script lang='ts'>
	import { WishList } from '../../models/WishList'
	import { goto } from '$app/navigation'
	import { Encryptor } from '../../helpers/Encryptor'
	import { WishListService } from '../../services/WishListService'
	import { translatedText } from '../../stores/translatedText'

	export let uuidGenerator: UuidGenerator

	let wishList = new WishList(uuidGenerator.generate())

	let createList = async () => {
		const currentUrl = new URL(window.location.href)
		if (currentUrl.hash) {
			return
		}
		const encryptor = await Encryptor.new()
		const encyptionKey = await encryptor.getEncryptionKeyForUrl()

		const wishListService = new WishListService(encryptor)

		await wishListService.save(wishList)

		await goto(currentUrl.pathname + '/' + wishList.uuid + '#' + encyptionKey, { replaceState: true })
	}
</script>


<svelte:head>
	<title>{$translatedText.list.pageTitle}</title>
</svelte:head>

<main class='h-screen grid grid-cols-1 pt-8 bg-gray-50 text-gray-900'>
	<h1 class='text-xl font-mono text-center'>{$translatedText.list.title}</h1>

	<form on:submit|preventDefault={createList} class='grid grid-cols-1 gap-16 p-8 bg-green-400 rounded-t-2xl shadow-md'>
		<label class='grid grid-cols-1 font-medium' title='{$translatedText.list.listTitleDetails}'>
			{$translatedText.list.listTitle}
			<input class='focus:outline-none focus:ring focus:ring-gray-900 rounded p-1 bg-green-100' type='text' name='name' bind:value={wishList.name} required>
		</label>

		<label class='grid grid-cols-1 font-medium' title='{$translatedText.list.listDeletionDateDetails}'>
			{$translatedText.list.listDeletionDate}
			<input class='focus:outline-none focus:ring focus:ring-gray-900 rounded p-1 bg-green-100' type='date' name='deletionDate' bind:value={wishList.deletionDate} required>
		</label>

		<button class='rounded-lg p-1 bg-gray-900 shadow text-green-100' type='submit'>{$translatedText.list.listSubmitButton}</button>
	</form>
</main>
