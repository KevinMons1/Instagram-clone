<script>
    export let arrFiles

    let open = false
    let reader = new FileReader()
    let srcs = []
    
    $: displayFiles()

    const displayFiles = () => {
        arrFiles.forEach(file => {
            reader.readAsDataURL(file)
        })
    }

    reader.onload = () => {
        srcs.push(reader.result)
    }
</script>

{#if open}
    <div class="multiple-content">
        <div class="multiple-bg"></div>
        <div class="multiple-box">
            {#each srcs as src}
                <div>
                    <img src={src} alt="Future publication">
                </div>
            {/each}
            <button>
                <svg aria-label="Icône Plus" class="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="22" role="img" viewBox="0 0 24 24" width="22"><path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path></svg>
            </button>
       </div>
    </div>
{/if}
<div class="multiple" on:click={() => open = !open}>
    <svg aria-label="Ouvrir la galerie média" class="_8-yf5 " color="#ffffff" fill="#ffffff" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M19 15V5a4.004 4.004 0 00-4-4H5a4.004 4.004 0 00-4 4v10a4.004 4.004 0 004 4h10a4.004 4.004 0 004-4zM3 15V5a2.002 2.002 0 012-2h10a2.002 2.002 0 012 2v10a2.002 2.002 0 01-2 2H5a2.002 2.002 0 01-2-2zm18.862-8.773A.501.501 0 0021 6.57v8.431a6 6 0 01-6 6H6.58a.504.504 0 00-.35.863A3.944 3.944 0 009 23h6a8 8 0 008-8V9a3.95 3.95 0 00-1.138-2.773z" fill-rule="evenodd"></path></svg>
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
        z-index: 20;
        transition: 0.2s;
        cursor: pointer;
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

    .multiple-box div {
        margin: 0 10px;
        width: 75px;
        height: 75px;
        overflow: hidden;
    }

    .multiple-box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .multiple-box button {
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
</style>