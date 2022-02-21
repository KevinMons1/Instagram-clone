<script>
    import { onMount } from "svelte"
    import storeAuth from "../../store/auth"
    import Index from "../../components/message/index.svelte"

    let uid = ""

    onMount(async () => {
        storeAuth.subscribe(value => {
            uid = value.uid
        })
    })
</script>

{#if uid !== ""}
    <Index uid={uid} inboxPage={true} />
{/if}