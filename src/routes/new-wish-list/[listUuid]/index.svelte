<script context='module' lang='ts'>
	import type { LoadOutput } from '@sveltejs/kit'

	import { WishService } from '../../../services/wishService'
	import { UuidGenerator } from '../../../helpers/UuidGenerator'

	export function load(): LoadOutput {
		const wishService = new WishService()
		const uuidGenerator = new UuidGenerator()

		return {
			props: {
				wishService,
				uuidGenerator,
			},
		}
	}
</script>

<script lang='ts'>
	import WishForm from '../_components/NewWishForm.svelte'
	import { Wish } from '../_entities/Wish'

	export let wishService: WishService
	export let uuidGenerator: UuidGenerator

	let wishes: Wish[] = [new Wish(uuidGenerator.generate())]

	const saveWish = (wish: Wish) => {
		wishService.save(wish)
	}

	const addNewWish = () => {
		const lastWish = wishes[wishes.length - 1]

		if (lastWish.isEmpty()) {
			return
		}

		wishes = [...wishes, new Wish(uuidGenerator.generate())]
	}
</script>


<svelte:head>
	<title>Create a new wish list - Wishlist</title>
</svelte:head>


<h1>Create a wish list</h1>

<ul>
	{#each wishes as wish}
		<li>
			<svelte:component this={WishForm} {wish} {saveWish} {addNewWish} />
		</li>
	{/each}
</ul>
