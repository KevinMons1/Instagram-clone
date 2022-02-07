<script>
	import Nav from '../components/nav/nav.svelte';
</script>

<Nav />

<main>
	<slot></slot>
</main>

<style>
	main {
		margin-top: 60px;
	}
</style>