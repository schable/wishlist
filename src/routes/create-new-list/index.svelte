<script lang='ts'>
	import ListItem from './_components/ListItem.svelte'

	const handleBlur = (blurEvent) => {
		items = [...items, ListItem]
	}
	let items: ListItem[] = [ListItem]

</script>


<svelte:head>
	<title>Créer une liste de souhaits - Wishlist</title>
</svelte:head>


<h1>Créer une liste de souhaits</h1>

<ul>
	{#each items as item}
		<svelte:component this={item} {handleBlur} />
	{/each}
</ul>
