<script>
    import { onMount } from "svelte"
    import Room from "../../components/message/room.svelte"
    import Inbox from "../../components/message/inbox.svelte"

    export let friendId
    export let inboxPage
    export let uid
    

    let minWidth = window.matchMedia("(min-width: 768px)").matches
    
    onMount(async () => {
        window.addEventListener("resize", handleResize)
    })

    const handleResize = () => {
        minWidth = window.matchMedia("(min-width: 768px)").matches
    }

</script>

<div class={minWidth ? "message minWidth" : "message maxWidth"}>
    {#if inboxPage}
        <Inbox uid={uid} minWidth={minWidth} />
        {#if minWidth}
            <Room inboxPage={inboxPage} />
        {/if}
    {:else}
        {#if minWidth}
            <Inbox uid={uid} minWidth={minWidth} />
        {/if}
        <Room friendId={friendId} inboxPage={inboxPage} />
    {/if}
</div>

<style>
    .message {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        overflow: hidden;
    }

    .maxWidth {
        height: calc(100vh - 60px); /*  100vh - 60px (navbar) */
    }
    
    .minWidth {
        height: calc(100vh - 100px);  /*  100vh - 60px (navbar) - 20 - 20 for margin */
        margin-top: 20px;
        border: 1px solid #DBDBDB;
    }
</style>
