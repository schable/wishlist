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
	import WishForm from './_components/NewWishForm.svelte'
	import { Wish } from '../../../models/Wish'
	import { onMount } from 'svelte'
	import { WishList } from '../../../models/WishList'
	import { Encryptor } from '../../../helpers/Encryptor'
	import { EncryptedWishList } from '../../../services/entities/EncryptedWishList'
	import { EncryptedWish } from '../../../services/entities/EncryptedWish'
	import EncryptedWishForm from './_components/EncryptedWishForm.svelte'
	import { toEncryptedText } from '../../../helpers/utils/toEncryptedText'
	import { getEncryptedEmoji } from '../../../helpers/utils/getEncryptedEmoji'
	import { getWishListSharingLink } from '../../../helpers/utils/getWishListSharingLink'
	import { translatedText } from '../../../stores/translatedText'

	export let uuidGenerator: UuidGenerator
	export let encryptedWishList: EncryptedWishList
	export let encryptedWishes: EncryptedWish[]

	let wishes: Wish[] = [new Wish(uuidGenerator.generate(), encryptedWishList.uuid)]
	let wishService: WishService
	let wishList: WishList
	let sharingLink: string

	onMount(async () => {
		const encryptionKey = window.location.hash.slice(1)
		sharingLink = getWishListSharingLink()
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

	const copySharingLinkToClipboard = () => {
		navigator.clipboard.writeText(sharingLink)
	}
</script>


<svelte:head>
	<title>{$translatedText.newWishPage.pageTitle}</title>
</svelte:head>

<main class='h-screen grid grid-cols-1 grid-rows-new-wishes bg-gray-50 text-gray-900'>
	<div class='bg-green-400 text-gray-900 rounded-b-2xl p-4 shadow-md grid grid-cols-1 auto-rows-min gap-4'>
		<div class='flex justify-between items-baseline'>
			<h1
				class='text-xl font-mono'>{wishList ? wishList.name : toEncryptedText(encryptedWishList.name.ciphertext)}</h1>
			<p
				class='text-xs italic'>{$translatedText.newWishPage.listDeletionDateDetails} {encryptedWishList.deletionDate.toLocaleDateString()}</p>
		</div>
		<div>
			<div class='flex justify-between items-baseline pb-2'>
				<p>{$translatedText.newWishPage.sharingLink}</p>
				<button title={$translatedText.newWishPage.sharingLinkCopy} on:click={copySharingLinkToClipboard}>📋</button>
			</div>
			<p class='text-sm bg-gray-900 text-green-100 rounded p-1'>
				{#if sharingLink}
					{sharingLink}
				{:else}
					{getEncryptedEmoji()}
				{/if}
			</p>
		</div>
	</div>
	<ul class='grid grid-cols-2 auto-rows-min gap-2 overflow-y-auto p-2'>
		{#each encryptedWishes as encryptedWish}
			<li class='p-2 bg-green-400 rounded-lg shadow-md'>
				<svelte:component this={EncryptedWishForm} {encryptedWish} />
			</li>
		{/each}
		{#each wishes as wish}
			<li class='p-2 bg-green-400 rounded-lg shadow-md'>
				<svelte:component this={WishForm} {wish} {saveWish} {addNewWish} />
			</li>
		{/each}
	</ul>
</main>
