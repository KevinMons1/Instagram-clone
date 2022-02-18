<script>
    import RoomEmpty from "./roomEmpty.svelte"
    import RoomFilled from "./roomFilled.svelte"

    export let data
    export let inboxPage = false
</script>

<section class="room">
    {#if inboxPage}
        <RoomEmpty />
    {:else}
        <RoomFilled data={data} />
    {/if}
</section>

<style>
    .room {
        width: 100%;
        height: 100%;
    }
</style>