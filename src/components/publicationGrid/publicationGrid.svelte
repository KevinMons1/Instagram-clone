<script>
    export let data
</script>

<div class="publicationGrid">
    {#each data as item (item.id)}
        <a href={`publication/${item.id}`}>
            {#if item.files[0].items[0].filePath.includes("/o/images%")}
                <img src={item.files[0].items[0].filePath} alt="publication">
            {:else}
                <video muted>
                    <source src={item.files[0].items[0].filePath}>
                </video>
            {/if}
        </a>
    {/each}
</div>

<style>
    .publicationGrid {
        display: grid;
        grid-template-columns: repeat(3, minmax(50px, 1fr));
        grid-gap: 5px;
    }

    .publicationGrid a {
        aspect-ratio: 1;
    }

    .publicationGrid img, .publicationGrid video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>