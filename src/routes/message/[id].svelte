<script context="module">
    export async function preload({ params }) {
        const id = params.id;
        return { id };
    }
</script>

<script>
    import { onMount } from "svelte"
    import storeAuth from "../../store/auth"
    import Index from "../../components/message/index.svelte"

    export let id
    
    let uid
    let inboxPage = true
    let actualId = ""

    $: if (actualId !== id) handleLoad()

    onMount(() => {
        storeAuth.subscribe(value => {
            uid = value.uid
        })
        handleLoad()
    })
    
    const handleLoad = () => {
        if (id === "inbox") inboxPage = true
        else inboxPage = false
        
        actualId = id
    }
</script>

{#if uid}
    <Index roomId={id} uid={uid} inboxPage={inboxPage} />
{/if}
