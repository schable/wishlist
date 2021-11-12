<script context='module' lang='ts'>
	import type { LoadOutput } from '@sveltejs/kit'

	import { UuidGenerator } from '../../../helpers/UuidGenerator'
	import { WishListService } from '../../../services/WishListService'

	export async function load({ page, fetch }): Promise<LoadOutput> {
		const uuidGenerator = new UuidGenerator()
		const encryptedWishList = await WishListService.getEncrypted(page.params.listUuid, fetch)

		return {
			props: {
				uuidGenerator,
				encryptedWishList,
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
	import { EncryptedWishList } from '../../../services/entities/EncryptedWishList'

	export let uuidGenerator: UuidGenerator
	export let encryptedWishList: EncryptedWishList

	let wishes: Wish[] = [new Wish(uuidGenerator.generate(), encryptedWishList.uuid)]
	let wishService: WishService
	let wishList: WishList

	onMount(async () => {
		const encryptionKey = window.location.hash.slice(1)
		const encryptor = await Encryptor.new(encryptionKey)
		wishService = new WishService(encryptor)

		wishList = await encryptor.toWishList(encryptedWishList)
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

<h2>{wishList ? wishList.name : `${encryptedWishList.name.ciphertext} 🔒`}</h2>

<ul>
	{#each wishes as wish}
		<li>
			<svelte:component this={WishForm} {wish} {saveWish} {addNewWish} />
		</li>
	{/each}
</ul>
