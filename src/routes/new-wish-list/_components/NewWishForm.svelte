<script>
	import { Wish } from '../_entities/Wish'

	export let saveWish
	export let addNewWishForm

	let { comment, name, price, url } = new Wish()
</script>

<form action='' method='post'>
	<label>
		Name
		<input type='text' bind:value={name} on:blur={event => saveWish(event, name)} on:blur={addNewWishForm} />
	</label>
	<label>
		Price
		<input type='number' bind:value={price} on:blur={event => saveWish(event, price)} />
	</label>
	<label>
		Comment
		<input type='text' bind:value={comment} on:blur={event => saveWish(event, comment)} />
	</label>
	<label>
		URL
		<input type='url' bind:value={url} on:blur={event => saveWish(event, url)} />
	</label>
</form>
