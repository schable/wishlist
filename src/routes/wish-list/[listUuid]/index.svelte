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
	import { translatedText } from '../../../stores/translatedText'

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
	<title>{$translatedText.viewListPage.pageTitle}</title>
</svelte:head>

<main class='bg-gray-50 text-gray-900 h-screen'>
	<h1 class='text-xl font-mono text-center bg-gray-900 text-green-100 rounded-b-2xl p-4 truncate'>{wishList ? wishList.name : toEncryptedText(encryptedWishList.name.ciphertext)}</h1>

	<ul class='grid grid-cols-2 auto-rows-min gap-2 overflow-y-auto p-2'>
		{#each encryptedWishes as encryptedWish}
			<li class='p-2 bg-green-400 rounded-lg shadow-md'  class:opacity-50={!encryptedWish.available}>
				<svelte:component this={EncryptedWishComponent} {encryptedWish} />
			</li>
		{/each}
		{#each wishes as wish}
			<li class='p-2 bg-green-400 rounded-lg shadow-md' class:opacity-50={!wish.available}>
				<svelte:component this={WishComponent} {wish} {saveWishAvailability} />
			</li>
		{/each}
	</ul>
</main>
