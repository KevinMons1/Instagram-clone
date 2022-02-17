<script>
    import Publication from "../publication/publication.svelte"
    import OptionsModal from "../optionsModal/optionsModal.svelte"

    export let data
    export let uid

    let optionsOpen = false
    let dataForDelete = {}

    const handleOptions = (e) => {
        dataForDelete = e.detail
        optionsOpen = !optionsOpen
    }
</script>

{#if optionsOpen}
    <OptionsModal uid={uid} data={dataForDelete} on:options={() => optionsOpen = !optionsOpen} />
{/if}
<div class="fill">
    {#each data as item (item.publication.id)}
        <Publication on:options={handleOptions} data={item} uid={uid} />
    {/each}
</div>

<style>
    .fill {
        width: 100%;
        overflow-x: hidden;
    }
</style>