<script lang='ts'>
	import { Wish } from '../../../../models/Wish'
	import { translatedText } from '../../../../stores/translatedText'
	import TextInput from '../../../../design-system/TextInput.svelte'
	import NumberInput from '../../../../design-system/NumberInput.svelte'
	import TextArea from '../../../../design-system/TextArea.svelte'

	export let saveWish
	export let addNewWish
	export let wish: Wish

	let valuesBeforeUpdate = {} as Wish

	const setValueBeforeUpdate = (event) => {
		const previousFieldValue = event.target.value
		const fieldName = event.target.name
		valuesBeforeUpdate[fieldName] = previousFieldValue
	}

	const saveWishOnValueChange = event => {
		const fieldValue = event.target.value
		const fieldName = event.target.name
		const fieldValueHasNotChanged = fieldValue === valuesBeforeUpdate[fieldName]

		if (fieldValueHasNotChanged) {
			return
		}

		return saveWish(wish)
	}

	const saveWishAndAddNewOne = event => {
		saveWishOnValueChange(event)
		addNewWish()
	}
</script>

<form class='grid grid-cols-1 gap-4'>
	<TextInput label={$translatedText.newWishPage.wishName} name='name' bind:value={wish.name} handleFocus={setValueBeforeUpdate} handleBlur={saveWishAndAddNewOne} required/>
	<NumberInput label={$translatedText.newWishPage.wishPrice} name='price' bind:value={wish.price} handleFocus={setValueBeforeUpdate} handleBlur={saveWishOnValueChange}/>
	<TextArea label={$translatedText.newWishPage.wishComment} name='comment' bind:value={wish.comment} handleFocus={setValueBeforeUpdate} handleBlur={saveWishOnValueChange}/>
	<TextInput label={$translatedText.newWishPage.wishUrl} name='url' bind:value={wish.url} handleFocus={setValueBeforeUpdate} handleBlur={saveWishOnValueChange}/>
</form>
