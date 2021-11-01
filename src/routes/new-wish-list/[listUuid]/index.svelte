<script context='module' lang='ts'>
	import type { LoadOutput } from '@sveltejs/kit'

	import { UuidGenerator } from '../../../helpers/UuidGenerator'

	export async function load({ page }): Promise<LoadOutput> {
		const uuidGenerator = new UuidGenerator()

		return {
			props: {
				uuidGenerator,
				listUuid: page.params.listUuid,
			},
		}
	}
</script>

<script lang='ts'>
	import WishForm from '../_components/NewWishForm.svelte'
	import { Wish } from '../../../models/Wish'
	import { onMount } from 'svelte'
	import { WishService } from '../../../services/WishService'
	import { WishList } from '../../../models/WishList'
	import { Encryptor } from '../../../helpers/Encryptor'

	export let uuidGenerator: UuidGenerator
	export let listUuid: string

	let wishList: WishList = new WishList(listUuid)
	let wishes: Wish[] = [new Wish(uuidGenerator.generate(), wishList.uuid)]
	let wishService: WishService

	onMount(async () => {
		const hashWithoutHashtag = window.location.hash.slice(1)
		const encryptor = await Encryptor.new(hashWithoutHashtag)
		wishService = new WishService(encryptor)
	})

	const saveWish = (wish: Wish) => {
		wishService.save(wish)
	}

	const addNewWish = () => {
		const lastWish = wishes[wishes.length - 1]

		if (lastWish.isEmpty()) {
			return
		}

		wishes = [...wishes, new Wish(uuidGenerator.generate(), wishList.uuid)]
	}
</script>


<svelte:head>
	<title>Add wishes to a new wish list - Wishlist</title>
</svelte:head>


<h1>Create a wish list</h1>

<ul>
	{#each wishes as wish}
		<li>
			<svelte:component this={WishForm} {wish} {saveWish} {addNewWish} />
		</li>
	{/each}
</ul>
