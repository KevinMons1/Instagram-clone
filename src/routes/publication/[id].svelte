<script context="module">
    export async function preload({ params }) {
        const id = params.id;
        return { id };
    }
</script>


<script>
    import { onMount } from "svelte"
    import { goto } from "@sapper/app"
    import authStore from "../../store/auth"
    import { getPublicationOne, getComments } from "../../firebase/publication"
    import Publication from "../../components/publication/publication.svelte"
    import Loader from "../../components/loader/loader.svelte"
    import OptionsModal from "../../components/optionsModal/optionsModal.svelte"

    export let id

    let data = null
    let uid
    let loading = false
    let optionsOpen = false
    let dataForDelete = {}

    onMount(async () => {
        const publication = await getPublicationOne(id)
        if (publication.publication) {
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
        } else goto("/")
	})

    const interval = setInterval(() => {
		// If server get too latence for response, show the loader
		if (data === null) {
			loading = true
		}
		clearInterval(interval)
	}, 500)

    const handleOptions = (e) => {
        dataForDelete = e.detail
        optionsOpen = !optionsOpen
    }
</script>


{#if data !== null}
    {#if optionsOpen}
        <OptionsModal uid={uid} data={dataForDelete} on:options={() => optionsOpen = !optionsOpen} />
    {/if}
    <Publication on:options={handleOptions} data={data} uid={uid} comment={true} />
{:else if loading}
	<Loader />
{/if}

