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

    onMount(async () => {
        storeAuth.subscribe(value => {
            uid = value.uid
        })
    })
</script>

{#if uid !== ""}
    <Index friendId={id} uid={uid} inboxPage={true} />
{/if}