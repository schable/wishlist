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
	import WishForm from './_components/NewWishForm.svelte'
	import { WishList } from './_entities/WishList'
	import { Wish } from './_entities/Wish'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'

	export let uuidGenerator: UuidGenerator

	// TODO: test this mechanism
	let wishList: WishList
	let createList = () => {
		const currentUrl = new URL(window.location.href)
		console.log(currentUrl.hash)
		if (currentUrl.hash) {
			return
		}

		wishList = new WishList(uuidGenerator.generate())
		goto(currentUrl.pathname + '/' + wishList.uuid, { replaceState: true })
		// currentUrl.pathname = currentUrl.pathname + '/'+ wishList.uuid
		// window.history.replaceState(null, '', currentUrl)
	}
</script>


<svelte:head>
	<title>Create a new wish list - Wishlist</title>
</svelte:head>


<h1>Create a wish list</h1>

<label>
	List name
	<input type='text' name='name'>
</label>

<labe>
	Deletion date
	<input type='date' name='deletionDate'>
</labe>

<button on:click={createList}>Create list</button>