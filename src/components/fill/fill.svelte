<script>
    import Publication from "../publication/publication.svelte"

    export let data
</script>

<div class="fill">
    {#each data as item (item.id)}
        <Publication data={item} />
    {/each}
</div>

<style>
    .fill {
        width: 100%;
        overflow-x: hidden;
    }
</style>