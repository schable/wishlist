<script lang='ts'>
	import { Wish } from '../../../../models/Wish'

	export let saveWishAvailability
	export let wish: Wish

	const toggleAvailability = () => {
		wish.available = !wish.available
		saveWishAvailability(wish)
	}
</script>

<div>
	Name : {wish.name}

	Price : {wish.price}

	Comment : {wish.comment}

	URL : {wish.url}

	<button disabled={!wish.available} on:click={toggleAvailability}>I'm offering it!</button>
</div>
