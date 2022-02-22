<script>
    import { createEventDispatcher } from "svelte"
    
    export let srcs
    
    const dispatch = createEventDispatcher()
    let open = false

    const slideIndex = (index) => {
        dispatch("slide-index", index)
    }

    const handleChange = () => {
        dispatch("new-img")
    }

    const handleDelete = (index) => {
        dispatch("delete-img", index)
    }

</script>

{#if open}
    <div class="multiple-content">
        <div class="multiple-bg"></div>
        <div class="multiple-box">
            {#each srcs as src, index}
                <div class="image-box">
                    <button class="close" on:click={() => handleDelete(index)}>
                        <svg aria-label="delete image" color="#ffffff" fill="#ffffff" height="12" role="img" viewBox="0 0 24 24" width="12"><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="21" y2="3"></line></svg>
                    </button>
                    {#if src.type}
                        <img on:click={() => slideIndex(index)} src={src.src} alt="Future publication">
                    {:else}
                        <video on:click={() => slideIndex(index)}>
                            <track kind="captions">
                            <source src={src.src}>
                        </video>
                    {/if}
                </div>
            {/each}
            <button class="add-image" on:click={() => handleChange()}>
                <svg aria-label="add new image" color="#8e8e8e" fill="#8e8e8e" height="22" role="img" viewBox="0 0 24 24" width="22"><path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path></svg>
            </button>
       </div>
    </div>
{/if}
<div class="multiple" on:click={() => open = !open}>
    <svg aria-label="open gallery" color="#ffffff" fill="#ffffff" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M19 15V5a4.004 4.004 0 00-4-4H5a4.004 4.004 0 00-4 4v10a4.004 4.004 0 004 4h10a4.004 4.004 0 004-4zM3 15V5a2.002 2.002 0 012-2h10a2.002 2.002 0 012 2v10a2.002 2.002 0 01-2 2H5a2.002 2.002 0 01-2-2zm18.862-8.773A.501.501 0 0021 6.57v8.431a6 6 0 01-6 6H6.58a.504.504 0 00-.35.863A3.944 3.944 0 009 23h6a8 8 0 008-8V9a3.95 3.95 0 00-1.138-2.773z" fill-rule="evenodd"></path></svg>
</div>

<style>
    .multiple {
        position: absolute;
        bottom: 20px;
        right: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #474747;
        transition: 0.2s;
        cursor: pointer;
        z-index: 50;
    }

    .multiple:hover {
        background-color: #7E7E7E;
    }
    
    .multiple-content {
        position: absolute;
        right: 20px;
        bottom: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        z-index: 50;
    }

    .multiple-bg {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #212121ec;
        border-radius: 5px;
        filter: blur(2px);
    }

    .multiple-box {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
        z-index: 2;
    }

    .image-box {
        position: relative;
        margin: 0 10px;
        width: 75px;
        height: 75px;
        background-color: #000;
        cursor: pointer;
        overflow: hidden;
    }

    .image-box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .image-box video {
        min-height: 100%;
        min-width: 100%;
        max-width: 100%;
    }

    .add-image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 46px;
        height: 46px;
        margin-right: 10px;
        background: none;
        border: 1px solid #fff;
        border-radius: 50%;
        outline: none;
        cursor: pointer;
    }

    .close {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 5px;
        right: 5px;
        width: 20px;
        height: 20px;
        background-color: #212121ec;
        border: none;
        border-radius: 50%;
        outline: none;
        cursor: pointer;
        z-index: 30;
    }
</style>