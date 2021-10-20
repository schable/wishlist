<script context='module' lang='ts'>
	import type { LoadOutput } from '@sveltejs/kit'

	import { WishService } from '../../services/wishService'

	export function load(): LoadOutput {
		const wishService = new WishService()
		return {
			props: {
				wishService,
			},
		}
	}
</script>

<script lang='ts'>
	import WishForm from './_components/NewWishForm.svelte'

	export let wishService
	let wishForms: WishForm[] = [WishForm]

	const saveWish = (blurEvent, prevValue?) => {
		const fieldValue = blurEvent.target.value
		let fieldValueHasChanged = fieldValue !== prevValue

		console.log({ fieldValue, prevValue })

		if (fieldValueHasChanged) {
			wishService.save()
		}
	}

	const addNewWishForm = blurEvent => {
		const fieldIsFilled = Boolean(blurEvent.target.value)

		if (fieldIsFilled) {
			wishForms = [...wishForms, WishForm]
		}

	}
</script>


<svelte:head>
	<title>Create a new wish list - Wishlist</title>
</svelte:head>


<h1>Create a wish list</h1>

<ul>
	{#each wishForms as wishForm}
		<li>
			<svelte:component this={wishForm} {saveWish} {addNewWishForm}/>
		</li>
	{/each}
</ul>
