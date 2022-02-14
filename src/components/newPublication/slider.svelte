<script>
    import { createEventDispatcher } from "svelte"
    import MultipleImages from "./multipleImages.svelte"

    export let arrFiles
    
    const dispatch = createEventDispatcher()
    let srcs = []
    let slideIndex = 0
    
    $: if (arrFiles.length > 0) displayFiles()
    
    const displayFiles = () => {
        // For multiple reader listen blob, we must created reader in the loop
        for (let i = srcs.length; i < arrFiles.length; i++) {
            let reader = new FileReader()
            reader.readAsDataURL(arrFiles[i])
            reader.onload = () => {
                srcs = [...srcs, reader.result]
            }
        }
    }

    const slideIndexEvent = (e) => {
        slideIndex = e.detail
    }

    const handleChange = () => {
        dispatch("new-img")
    }

    const handleDelete = (e) => {
        srcs = srcs.filter((src, index) => index !== e.detail)
        dispatch("delete-img", e.detail)
    }

</script>

<div class="slider">
    {#if srcs.length > 1 && slideIndex > 0} 
        <button name="imageLeft" class="btn-left" on:click={() => slideIndex--}>
            <svg aria-label="previus image" color="#ffffff" fill="#ffffff" height="16" role="img" viewBox="0 0 24 24" width="16"><polyline fill="none" points="16.502 3 7.498 12 16.502 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
        </button>
    {/if}
    <div>
        <img src={srcs[slideIndex]} alt="Future publication">
    </div>
    {#if srcs.length > 1 && slideIndex < srcs.length - 1} 
        <button name="imageRight" class="btn-right" on:click={() => slideIndex++}>
            <svg aria-label="next image" color="#ffffff" fill="#ffffff" height="16" role="img" viewBox="0 0 24 24" width="16"><polyline fill="none" points="8 3 17.004 12 8 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
        </button>
    {/if}
</div>
<MultipleImages on:delete-img={handleDelete} on:new-img={handleChange} on:slide-index={slideIndexEvent} srcs={srcs} />

<style>

    .slider {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    div {
        min-width: 100%;
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