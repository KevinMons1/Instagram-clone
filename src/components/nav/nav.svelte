<script>
	import { createEventDispatcher, onMount } from "svelte"
	import storeAuth from "../../store/auth"

	let active
	let uid
	let src
	const dispatch = createEventDispatcher();

	const newPublication = () => {
		dispatch("new-publication")
	}

	const changePathname = (url) => {
		active = url
	}

	onMount(() => {
		storeAuth.subscribe(value => {
			uid = value.uid
			src = value.imgPath
		})
		
		changePathname(window.location.pathname)
	})

</script>

<nav class="navbar">
	<div class="navbar-content">
		<img src="images/logo.png" alt="Logo">
		<ul class="navbar-list">
			<li>
				<a href="/" on:click={() => changePathname("/")}>
					<svg aria-label="Home" color="#262626" fill="#262626" role="img" viewBox="0 0 24 24" >
						{#if active === "/"}
							<path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path>
						{:else}					
							<path d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
						{/if}
					</svg>
				</a>
			</li>
			<li>
				<a href="/message/inbox" on:click={() => changePathname("/message")}>
					<svg aria-label="Message" color="#262626" fill="#262626" role="img" viewBox="0 0 24 24" >
						{#if active === "/message"}
							<path d="M22.91 2.388a.69.69 0 00-.597-.347l-20.625.002a.687.687 0 00-.482 1.178L7.26 9.16a.686.686 0 00.778.128l7.612-3.657a.723.723 0 01.937.248.688.688 0 01-.225.932l-7.144 4.52a.69.69 0 00-.3.743l2.102 8.692a.687.687 0 00.566.518.655.655 0 00.103.008.686.686 0 00.59-.337L22.903 3.08a.688.688 0 00.007-.692" fill-rule="evenodd"></path>
						{:else}					
							<line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
						{/if}
					</svg>
				</a>
			</li>
			<li>
				<button name="New publication" on:click={() => {newPublication()}}>
					<svg aria-label="New publication" color="#262626" fill="#262626" role="img" viewBox="0 0 24 24" ><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
				</button>
			</li>
			<li>
				<button name="Notifications" on:click={() => changePathname("/notifications")}>
					<svg aria-label="Notification" color="#262626" fill="#262626" role="img" viewBox="0 0 24 24" > <!-- viewBox="0 0 48 48" -->
						{#if active === "/notifications"}
							<path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
						{:else}					
							<path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
						{/if}
					</svg>
				</button>
			</li>
			<li>
				<a href={`/account/${uid}`} on:click={() => changePathname("/account")} class="navbar-img">
					<img src={src !== "" ? src : "images/default-user.jpg"} alt="My Account">
				</a>
			</li>
		</ul>
	</div>
</nav>

<style>
	.navbar {
		position: fixed;
		top: 0;
		width: 100%;
		height: 60px;
		border-bottom: 1px solid #DBDBDB;
		background-color: #fff;
		z-index: 10;
	}

	.navbar-content {
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
	}

	.navbar-list {
		width: 150px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.navbar-list li {
		list-style: none;
		margin-right: 20px;
	}

	.navbar li a {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.navbar-list button {
		border: none;
		outline: none;
		background: none;
		cursor: pointer;
	}

	.navbar-img {
		border-radius: 50%;
		overflow: hidden;
	}

	.navbar-img, svg {
		width: 24px;
		height: 24px;
	}

	.navbar-img img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	@media screen and (max-width: 380px) {
		.navbar-content img {
			width: 70px;
		}
		.navbar-img, svg {
			width: 18px!important;
			height: 18px!important;
		}

		.navbar-list li {
			margin-right: 15px;
		}
	}
</style>

