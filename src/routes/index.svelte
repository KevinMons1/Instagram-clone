<script>
	import { onMount } from "svelte";
	import { getFillAll } from "../firebase/publication";
	import authStore from "../store/auth"
	import Storys from "../components/storys/storys.svelte"
	import Fill from "../components/fill/fill.svelte"
	import Loader from "../components/loader/loader.svelte"

	let uid
	let data = []
	let limit = 10
	let offset = 10
	let noSpam = false
	let maximum = false
	let loading = false

	onMount(async () => {
		data = await fetchData(Date.now(), limit)

		authStore.subscribe(value => {
			uid = value.uid
		})

		window.addEventListener("scroll", handleScroll)
	})

	const fetchData = async (date, limit) => {
		const fetchData = await getFillAll(date, limit)
		return fetchData
	}

	const getMore = async () => {
		if (!noSpam && !maximum) {
			limit += offset
			const moreData = await fetchData(data[data.length - 1].publication.date, limit)
			if (moreData.length > 0) {
				data = [...data, ...moreData]
			} else maximum = true
			noSpam = false
		}
	}
	
	const handleScroll = () => {
		if ((window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) && !noSpam && !maximum) {
			getMore()
            noSpam = true
        }
    }

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

<!-- <Storys /> -->
{#if data.length > 0}
	<Fill on:get-more={getMore} data={data} uid={uid} />
	{#if maximum}
		<p class="alert">You've looked at everything! Coming back later.</p>
	{/if}
{:else if loading}
	<Loader />
{/if}

<style>
	.alert {
		width: 100%;
		text-align: center;
		font-size: 1.4rem;
		margin: 20px;
	}
</style>