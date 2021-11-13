<script context='module' lang='ts'>
	import type { LoadOutput } from '@sveltejs/kit'

	import { UuidGenerator } from '../../../helpers/UuidGenerator'
	import { WishListService } from '../../../services/WishListService'
	import { WishService } from '../../../services/WishService'

	export async function load({ page, fetch }): Promise<LoadOutput> {
		const uuidGenerator = new UuidGenerator()
		const encryptedWishList = await WishListService.getEncrypted(page.params.listUuid, fetch)
		const encryptedWishes = await WishService.getAllEncryptedForList(page.params.listUuid, fetch)

		return {
			props: {
				uuidGenerator,
				encryptedWishList,
				encryptedWishes,
			},
		}
	}
</script>

<script lang='ts'>
	import WishComponent from './_components/Wish.svelte'
	import { Wish } from '../../../models/Wish'
	import { onMount } from 'svelte'
	import { WishList } from '../../../models/WishList'
	import { Encryptor } from '../../../helpers/Encryptor'
	import { EncryptedWishList } from '../../../services/entities/EncryptedWishList'
	import { EncryptedWish } from '../../../services/entities/EncryptedWish'
	import EncryptedWishComponent from './_components/EncryptedWish.svelte'
	import { toEncryptedText } from '../../../helpers/utils/toEncryptedText'

	export let encryptedWishList: EncryptedWishList
	export let encryptedWishes: EncryptedWish[]

	let wishList: WishList
	let wishes: Wish[] = []
	let wishService: WishService

	onMount(async () => {
		const encryptionKey = window.location.hash.slice(1)
		const encryptor = await Encryptor.new(encryptionKey)
		wishService = new WishService(encryptor)

		encryptor.toWishList(encryptedWishList).then((decryptedWishList) => {
			wishList = decryptedWishList
		})

		encryptedWishes.map((encryptedWish, index) => {
			return encryptor.toWish(encryptedWish)
				.then(decryptedWish => {
					encryptedWishes.splice(index)
					encryptedWishes = encryptedWishes
					wishes = [decryptedWish, ...wishes]
				})
		})
	})

	const saveWishAvailability = (wish: Wish) => {
		wishService.saveAvailability(wish)
	}
</script>


<svelte:head>
	<title>View wish list - Wishlist</title>
</svelte:head>


<h1>View wish list</h1>

<h2>{wishList ? wishList.name : toEncryptedText(encryptedWishList.name.ciphertext)}</h2>
<p>This wish list will be deleted on {encryptedWishList.deletionDate.toLocaleDateString()} </p>

<ul>
	{#each encryptedWishes as encryptedWish}
		<li>
			<svelte:component this={EncryptedWishComponent} {encryptedWish} />
		</li>
	{/each}
	{#each wishes as wish}
		<li>
			<svelte:component this={WishComponent} {wish} {saveWishAvailability} />
		</li>
	{/each}
</ul>
