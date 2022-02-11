<script>
	import { onMount } from "svelte"
	import Loader from "../components/loader/loader.svelte"
	import storeAuth from "../store/auth"
	import Login from "../components/connexion/login.svelte"
	import Register from "../components/connexion/register.svelte"
	import Nav from '../components/nav/nav.svelte';
	import NewPublication from "../components/newPublication/newPublication.svelte"

	let newPublication = true
	let isAuth = null
	let isLogin = true
	let loading = false

	const changeNewPublication = () => {
		newPublication = !newPublication
	}
	
	const changeLoginPage = () => {
		isLogin = !isLogin
	}

	const interval = setInterval(() => {
		// If server get too latence for response, show the loader
		if (isAuth === null) {
			loading = true
		}
		clearInterval(interval)
	}, 500)

	onMount(() => {
		// Check if user is connected
		storeAuth.subscribe(value => {
			isAuth = value
			loading = false
		})
		storeAuth.currentUser()
	})
</script>

<svelte:head>
	<title>Instagram clone</title>
</svelte:head>

{#if isAuth}
	{#if newPublication}
		<NewPublication on:new-publication={changeNewPublication} />
	{/if}
	<Nav on:new-publication={changeNewPublication} />
	<main class="main-app">
		<div class="wrapper">
			<slot></slot>
		</div>
	</main>
{:else if isAuth === false}
	<main class="main-connexion">
		{#if isLogin}
			<Login on:change-login-page={changeLoginPage} />
		{:else}
			<Register on:change-login-page={changeLoginPage} />
		{/if}
	</main>
{:else if loading}
    <Loader overlay={false} />
{/if}

<style>
	.main-app {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 60px;
	}

	.wrapper {
		max-width: 900px;
		width: 100%;
	}

	.main-connexion {
		background-color: #FAFAFA;
	}
</style>