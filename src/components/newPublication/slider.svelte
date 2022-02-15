<script>
    import { createEventDispatcher } from "svelte"
    import MultipleImages from "./multipleImages.svelte"

    export let arrFiles
    export let step
    
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
                srcs = [...srcs, {
                    src: reader.result,
                    type: arrFiles[i].type.includes("image/") ? true : false
                }]
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
        if (slideIndex === srcs.length) slideIndex--
        dispatch("delete-img", e.detail)
    }

</script>

<div class={step === 1 ? "slider" : "slider slider-step2"}>
    {#if srcs.length > 1 && slideIndex > 0 && step === 1} 
        <button name="imageLeft" class="btn-left" on:click={() => slideIndex--}>
            <svg aria-label="previus image" color="#ffffff" fill="#ffffff" height="16" role="img" viewBox="0 0 24 24" width="16"><polyline fill="none" points="16.502 3 7.498 12 16.502 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
        </button>
    {/if}
    <div class="image-box">
        {#if srcs.length > 0}
            {#if srcs[slideIndex].type}
                <img src={srcs[slideIndex].src} alt="Future publication">
            {:else}
                <video autoplay muted loop>
                    <track kind="captions">
                    <source src={srcs[slideIndex].src}>
                </video>
            {/if}
        {/if}
    </div>
    {#if srcs.length > 1 && slideIndex < srcs.length - 1 && step === 1} 
        <button name="imageRight" class="btn-right" on:click={() => slideIndex++}>
            <svg aria-label="next image" color="#ffffff" fill="#ffffff" height="16" role="img" viewBox="0 0 24 24" width="16"><polyline fill="none" points="8 3 17.004 12 8 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
        </button>
    {/if}
</div>
{#if step === 1}
    <MultipleImages on:delete-img={handleDelete} on:new-img={handleChange} on:slide-index={slideIndexEvent} srcs={srcs} />
{/if}

<style>
    .slider {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        min-width: 100%;
        max-width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .slider-step2 {
        min-width: 40%;
        max-width: 40%;
    }

    .image-box {
        display: flex;
        align-items: center;
        min-width: 100%;
        max-width: 100%;
        height: 100%;
        overflow: hidden;
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

    video {
        width: 100%;
    }
</style>