<script context="module">
    export async function preload({ params }) {
        const id = params.id;
        return { id };
    }
</script>


<script>
    import { onMount } from "svelte"
    import authStore from "../../store/auth"
    import { getPublicationOne, getComments } from "../../firebase/function"
    import Publication from "../../components/publication/publication.svelte"
    import Loader from "../../components/loader/loader.svelte"

    export let id
    
    let data = null
    let uid
    let loading = false

    onMount(async () => {
        const publication = await getPublicationOne(id)
        const comments = await getComments(id)

        data = {
            user: publication.user,
            publication: {
                ...publication.publication,
                peopleComment: comments
            }
        }
        
		authStore.subscribe(value => {
			uid = value.uid
		})
	})

    const interval = setInterval(() => {
		// If server get too latence for response, show the loader
		if (data === null) {
			loading = true
		}
		clearInterval(interval)
	}, 500)
</script>


{#if data !== null}
    <Publication data={data} uid={uid} comment={true} />
{:else if loading}
	<Loader />
{/if}

