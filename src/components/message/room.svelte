<script>
    import RoomEmpty from "./roomEmpty.svelte"
    import RoomFilled from "./roomFilled.svelte"

    export let inboxPage
    export let roomId
    export let friendId
</script>

<section class="room">
    {#if inboxPage}
        <RoomEmpty />
    {:else}
        <RoomFilled roomId={roomId} />
    {/if}
</section>

<style>
    .room {
        width: 100%;
        height: 100%;
    }
</style>