<script>
	import { Item } from '../_entities/Item'

	export let handleBlur
	let { description, price, reserved, url } = new Item()
</script>

<li>
	<label>
		Réservé
		<input type='checkbox' bind:checked={reserved}>
	</label>
	<label>
		Description
		<input type='text' bind:value={description} on:blur={handleBlur} />
	</label>
	<label>
		Prix
		<input type='number' bind:value={price} />
	</label>
	<label>
		Lien
		<input type='url' bind:value={url} />
	</label>
</li>
