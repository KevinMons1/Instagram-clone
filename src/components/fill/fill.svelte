<script>
    import Publication from "../publication/publication.svelte"

    export let data
    export let uid
</script>

<div class="fill">
    {#each data as item (item.publication.id)}
        <Publication data={item} uid={uid} />
    {/each}
</div>

<style>
    .fill {
        width: 100%;
        overflow-x: hidden;
    }
</style>