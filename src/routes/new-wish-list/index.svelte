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
	<title>Create a new wish list - Wishlist</title>
</svelte:head>


<h1>Create a wish list</h1>

<form on:submit|preventDefault={createList}>
	<label>
		List name
		<input type='text' name='name' bind:value={wishList.name}>
	</label>

	<labe>
		Deletion date
		<input type='date' name='deletionDate' bind:value={wishList.deletionDate}>
	</labe>

	<button type='submit'>Create list</button>
</form>

<p>The list will be saved when the first item is added</p>