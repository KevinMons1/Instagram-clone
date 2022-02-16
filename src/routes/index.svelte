<script>
	import { onMount } from "svelte";
	import { getFillAll } from "../firebase/function";
	import authStore from "../store/auth"
	import Storys from "../components/storys/storys.svelte"
	import Fill from "../components/fill/fill.svelte"
	import Loader from "../components/loader/loader.svelte"

	let uid = {}
	let data = []
	let limit = 10
	let loading = false

	onMount(async () => {
		data = await getFillAll(limit)

		authStore.subscribe(value => {
			uid = value.uid
		})
	})

	const interval = setInterval(() => {
		// If server get too latence for response, show the loader
		if (data.length === 0) {
			loading = true
		}
		clearInterval(interval)
	}, 500)
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Storys />
{#if data.length > 0}
	<Fill data={data} uid={uid} />
{:else if loading}
	<Loader />
{/if}
