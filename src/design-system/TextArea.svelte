<script lang='ts'>
	export let label: string
	export let name: string
	export let value: string
	export let handleFocus: string | undefined
	export let handleBlur: string | undefined
	export let disabled = false
	export let required = false
</script>

<label class='grid grid-cols-1 font-medium text-sm'>
	{label}
	<textarea class='focus:outline-none focus:ring focus:ring-gray-900 rounded p-1 bg-green-100 text-sm' rows='2' {name}
						bind:value={value} on:focus={handleFocus} on:blur={handleBlur}
						{disabled} {required}></textarea>
</label>