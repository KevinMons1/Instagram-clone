<script>
	import { onMount } from "svelte"
	import storeAuth from "../store/auth"
	import Login from "../components/connexion/login.svelte"
	import Register from "../components/connexion/register.svelte"
	import Nav from '../components/nav/nav.svelte';
	import NewPublication from "../components/newPublication/newPublication.svelte"

	let newPublication = false
	let isAuth = false
	let isLogin = true

	const changeNewPublication = () => {
		newPublication = !newPublication
	}

	const changeLoginPage = () => {
		isLogin = !isLogin
	}

	onMount(() => {
		// Check if user is connected
		storeAuth.subscribe(value => {
			isAuth = value
		})
	})
</script>

{#if isAuth}
	{#if newPublication}
		<NewPublication on:new-publication={changeNewPublication} />
	{/if}
	<Nav on:new-publication={changeNewPublication} />
	<main class="main-app">
		<slot></slot>
	</main>
{:else}
	<main class="main-connexion">
		{#if isLogin}
			<Login on:change-login-page={changeLoginPage} />
		{:else}
			<Register on:change-login-page={changeLoginPage} />
		{/if}
	</main>
{/if}
<style>
	.main-app {
		margin-top: 60px;
	}

	.main-connexion {
		background-color: #FAFAFA;
	}
</style>