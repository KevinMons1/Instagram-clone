<script>
    import MultipleImages from "./multipleImages.svelte"
    import { v4 as uuid } from "uuid"

    export let arrFiles
    
    let srcs = []
    let slideIndex = 0

    $: if (arrFiles.length > 0) displayFiles()

    const displayFiles = () => {
        console.log(arrFiles);
        // For multiple reader listen blob, we must created reader in the loop
        for (let i = srcs.length; i < arrFiles.length; i++) {
            let reader = new FileReader()
            reader.readAsDataURL(arrFiles[i])
            reader.onload = () => {
                srcs = [...srcs, reader.result]
            }
        }
    }


</script>

<div class="slider">
    {#if srcs.length > 1 && slideIndex > 1} 
        <button name="imageLeft" class="btn-left" on:click={slideIndex = slideIndex + 1}>
            <svg color="#ffffff" fill="#ffffff" height="16" role="img" viewBox="0 0 24 24" width="16"><polyline fill="none" points="16.502 3 7.498 12 16.502 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
        </button>
        {/if}
        {#each srcs as src (uuid())}
        <div>
            <img src={src} alt="Future publication">
        </div>
        {/each}
        {#if srcs.length > 1 && slideIndex < srcs.length - 1} 
        <button name="imageRight" class="btn-right" on:click={slideIndex = slideIndex - 1}>
            <svg color="#ffffff" fill="#ffffff" height="16" role="img" viewBox="0 0 24 24" width="16"><polyline fill="none" points="8 3 17.004 12 8 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
        </button>
    {/if}
</div>
<MultipleImages {srcs} />

<style>

    .slider {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    div {
        width: 100%;
        height: 100%;
    }

    .slider button {
        position: absolute;
        top: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background-color: #474747;
        border: none;
        border-radius: 50%;
        transform: translateY(-50%);
        transition: 0.2s;
        outline: none;
        cursor: pointer;
        z-index: 50;
    }

    .slider button:hover {
        background-color: #7E7E7E;
    }

    .btn-left {
        left: 20px;
    }

    .btn-right {
        right: 20px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>