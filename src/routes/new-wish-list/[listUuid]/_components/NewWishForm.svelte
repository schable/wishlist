<script lang='ts'>
	import { Wish } from '../../../../models/Wish'

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
</script>

<form action='' method='post'>
	<label>
		Name
		<input type='text' name='name' bind:value={wish.name} on:focus={setValueBeforeUpdate} on:blur={saveWishOnValueChange} on:blur={addNewWish} />
	</label>
	<label>
		Price
		<input type='number' name='price' bind:value={wish.price} on:focus={setValueBeforeUpdate} on:blur={saveWishOnValueChange} />
	</label>
	<label>
		Comment
		<input type='text' name='comment' bind:value={wish.comment} on:focus={setValueBeforeUpdate} on:blur={saveWishOnValueChange} />
	</label>
	<label>
		URL
		<input type='url' name='url' bind:value={wish.url} on:focus={setValueBeforeUpdate} on:blur={saveWishOnValueChange} />
	</label>
</form>
