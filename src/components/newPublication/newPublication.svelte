<script>
    import { createEventDispatcher } from "svelte"
    import { addNewPublication } from "../../firebase/publication";
    import imageCompression from "browser-image-compression"
    import Slider from "./slider.svelte"
    import NewPStep2 from "./newPStep2.svelte"
    import Loader from "../loader/loader.svelte"

    export let uid

    let step = 1
    let error = ""
    let files = null
    let arrFiles = []
    let titleNext = "Next"
    let options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1200,
        useWebWorker: true
    }
    let data = {
        text: ""
    }

    $: if (files && files[0]) handleFile()

    const dispatch = createEventDispatcher();

    const closePublication = () => {
		dispatch("new-publication")
	}

    const handleFile = async () => {
        let isImage = files[0].type.includes("image/")
        let isVideo = files[0].type.includes("video/")
        error = ""

        if (files && files[0]) {
            if (arrFiles.length < 3) {
                let file = files[0]

                if (isImage || isVideo) {
                    if (file.type.includes("/jpg") || file.type.includes("/jpeg") || file.type.includes("/png") || file.type.includes("/gif") || file.type.includes("/mp4") || file.type.includes("/mov") || file.type.includes("/avi")) {
                        if ((isImage && file.size <= 1000000) || (isVideo && file.size <= 5000000)) { // 1mb image | 5mb video
                            imageCompression(file, options)
                                .then(compressedFile => {
                                    arrFiles = [...arrFiles, compressedFile]
                                    files = null
                                })
                               .catch(() => error = "Error with your file... Try later.")
                        } else error = "Your image is too heavy. It must be less of 1Mb."
                    } else error = "Bad format. Use only jpg, jpeg, png or gif."
                } else error = "It is not a image or video."
            } else alert("Maximum 3 files.")
        }
    }

    const changeStep = (action) => {
        if (action === 0) {
            if (step === 1) closePublication()
            else step--
        }
        else if (action === 1 && arrFiles.length > 0) {
            titleNext = "Publish"
            step++
        }
    }

    const handleChange = () => {
        document.querySelector("#input-file").click()
    }

    const handleDelete = (e) => {
        arrFiles = arrFiles.filter((file, index) => index !== e.detail)
    }

    const handleSubmit = async () => {
        if (step === 3) {
            let response = await addNewPublication(data.text, uid, arrFiles)

            if (!response) error = "Error server..."
            location.reload()
        }
    }

    const textChange = (e) => {
        data.text = e.detail
    }

</script>

{#if step === 3}
    <Loader overlay={true} />
{/if}
<div on:click={closePublication} class="overlay"></div>
<form on:submit|preventDefault={handleSubmit} class="newPublication">
   <div class="newPublication-head">
        <button class="previous" on:click={() => changeStep(0)}>
            <svg aria-label="previus" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
        </button>
        <h1>Create a new publication</h1>
        <button class="next" type="submit" on:click={() => changeStep(1)}>{titleNext}</button>
        {#if step === 3 && error !== ""}
            <p class="error-txt">{error}</p>
        {/if}
   </div>
    <div class={step === 1 ? "newP-content" : "newP-content step2"}>
        {#if arrFiles.length > 0} 
            <Slider on:delete-img={handleDelete} on:new-img={handleChange} {step} {arrFiles} />
        {:else if step === 1}
            {#if error !== ""}
                <svg color="#262626" fill="#262626" height="96" role="img" viewBox="0 0 96 96" width="96"><path d="M48 0c26.5 0 48 21.5 48 48S74.5 96 48 96 0 74.5 0 48 21.5 0 48 0zm0 2C22.6 2 2 22.6 2 48s20.6 46 46 46 46-20.6 46-46S73.4 2 48 2zm0 57.8c3.4 0 6.1 2.7 6.1 6.1 0 3.4-2.7 6.1-6.1 6.1s-6.1-2.7-6.1-6.1c0-3.3 2.7-6.1 6.1-6.1zm0 2c-2.3 0-4.1 1.8-4.1 4.1S45.7 70 48 70s4.1-1.8 4.1-4.1c0-2.2-1.8-4.1-4.1-4.1zM48 23c3.5 0 6.4 2.8 6.1 6.2l-1.6 22.5c-.2 2.3-2.2 4-4.5 4-2.4 0-4.4-1.7-4.5-4l-1.6-22.5c-.3-3.4 2.6-6.2 6.1-6.2zm0 2c-2.4 0-4.3 1.9-4.1 4l1.6 22.5c.1 1.2 1.2 2.1 2.5 2.1s2.4-.9 2.5-2.1L52.1 29c.2-2.1-1.7-4-4.1-4z"></path></svg>
                <p>{error}</p>
            {:else}
                <svg color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                <p>Drag and drop photos and videos here</p>
            {/if}
            <button>Select on the computer</button>
        {/if}
        {#if step === 1}
            <input id="input-file" type="file" bind:files accept="image/png, image/jpeg, image/jpg, image/gif, video/mp4, video/avi, video/mov">
        {:else}
            <NewPStep2 on:text-change={textChange} />
       {/if}
    </div>
</form>

<style>
    .overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 20;
    }

    .newPublication {
        display: inline-block;
        position: fixed;
        left: 50%;
        top: 50%;
        max-width: 550px;
		width: 95%;
        height: 75vh;
        border-radius: 20px;
        background-color: #fff;
        transform: translate(-50%, -50%);
        overflow: hidden;
        z-index: 21;
    }

    .newPublication-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #A8A8A8;
    }

    .newPublication-head button {
        margin: 0 20px;
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
    }

    .next {
        font-size: 1.7rem;
        color: #0095f6;
    }

    .newPublication-head h1 {
        text-align: center;
        font-size: 2rem;
        color: #262626;
    }

    .newP-content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: calc(75vh - 50px);
    }

    .step2 {
        flex-direction: row!important;;
    }

    .newP-content p {
        text-align: center;
        margin: 20px 0;
        font-size: 2.5rem;
        font-weight: 300;
        color: #262626;
    }

    .newP-content button {
        padding: 10px;
        width: 250px;
        font-size: 1.6rem;
        color: #fff;
        background-color: #0095f6;
        border: none;
        border-radius: 5px;
        font-weight: bold;
    }

    .newP-content input {
        position: absolute;
        width: 100%;
        height: calc(75vh - 50px);
        opacity: 0;
        z-index: 2;
    }
</style>