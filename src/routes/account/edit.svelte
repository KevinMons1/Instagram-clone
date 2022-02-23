<script>
    import { onMount } from "svelte"
    import Loader from "../../components/loader/loader.svelte"
    import { goto } from "@sapper/app"
    import storeAuth from "../../store/auth"
    import { addStorageProfile, updateUser } from "../../firebase/user"
    import imageCompression from "browser-image-compression"

    let loading = false
    let error = ""
    let errorNbr = 0
    let src
    let files = null
    let reader = new FileReader()
    let uploadFile = false
    let dataCopy = {}
    let data = {}
    let options = {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 300,
    }

    $: files !== null ? handleFile() : null

    
    const handleSubmit = async () => {
        const { name, username, description } = data
        const { nameCopy, usernameCopy, descriptionCopy } = dataCopy
        let regexName = /^[a-zA-Z0-9éè\(+=._-]+$/
        
        loading = true
        
        if (uploadFile || name !== nameCopy || username !== usernameCopy || description !== descriptionCopy) {
            if (name.length >= 6) {
                if (username.length >= 6) {
                    if (description.length <= 200) {
                        if (regexName.test(name.replace(/ /g, ""))) {
                            if (regexName.test(username)) {
                                if (uploadFile && files && files[0]) {
                                    // Files
                                    let file = files[0]
                                    imageCompression(file, options)
                                        .then(async compressedFile => {
                                            const upload = await addStorageProfile("/images/profiles/", compressedFile, data.imgName, data) 
                                            if (upload) dataCopy.uid ? goto(`account/${dataCopy.uid}`) : goto(`/`)
                                            else createError(2, "Error from server... Try later.")
                                        })
                                } else {
                                    // Informations user
                                    await updateUser(data)
                                    dataCopy.uid ? goto(`account/${dataCopy.uid}`) : goto(`/`)
                                }
                            } else createError(3, "Your username is invalid")
                        } else createError(2, "Your name is invalid")
                    } else createError(2, "Your description must contain less than 200 characters.")
                } else createError(2, "Your username must contain at least 6 characters.")
            } else createError(2, "Your name must contain at least 6 characters.")
        } else createError(0, "You have not changed anything.")  
    }

    const handleFile = async () => {
        if (files && files[0]) {
            let file = files[0]

            if (file.type.includes("image/")) {
                if (file.type.includes("/jpg") || file.type.includes("/jpeg") || file.type.includes("/png") || file.type.includes("/gif")) {
                    if (file.size <= 10000000) {
                        reader.readAsDataURL(file)
                        return uploadFile = true
                    } createError(1, "Your image is too heavy. It must be less of 10Mb.")  
                } createError(1, "Bad format. Use only jpg, jpeg, png or gif.")
            } createError(1, "It is not a image.")  
        }
        return uploadFile = false
    }


    reader.onload = () => {
        src = reader.result
    }

    const createError = (nbr, sentence) => {
        errorNbr = nbr
        error = sentence
        loading = false
    }

    onMount(() => {
        storeAuth.subscribe(value => {
            data = value
            dataCopy = value
            src = value.imgPath !== "" ? value.imgPath : "images/default-user.jpg"
        })
    })

</script>

{#if loading}
    <Loader overlay={true} />
{/if}
<form on:submit|preventDefault={handleSubmit}>
    <div class="edit-first">
        <div class="edit-img">
            <img src={src} alt="Profile">
        </div>
        <div>
            <h1>{data.username}</h1>
            <label class={errorNbr === 1 ? "error-txt" : ""}  for="file">Modify profile image</label>
            <input type="file" name="file" id="file" bind:files/>
        </div>
    </div>
    <div class="edit-box">
        <label for="name">Name</label>
        <input class={errorNbr === 1 ? "error-input" : ""} type="text" name="name" id="name" bind:value={data.name} />
    </div>
    <div class="edit-box">
        <label for="username">Username</label>
        <input class={errorNbr === 1 ? "error-input" : ""} type="text" name="username" id="username" bind:value={data.username} />
    </div>
    <div class="edit-box">
        <label for="description">Description</label>
        <textarea class={errorNbr === 1 ? "error-input" : ""} name="description" id="description" bind:value={data.description}></textarea>
    </div>
    {#if error !== ""}
        <small class="error-txt">{error}</small>
    {/if}
    <div class="edit-btn">
        <button class="edit-send" type="submit">Send</button>
    </div>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 20px;
        margin: 20px 0;
    }

    form > div {
        margin: 20px 0;
    }

    input, label, textarea, button {
        font-size: 1.4rem;
    }

    h1 {
        font-size: 2rem;
        font-weight: normal;
    }

    label {
        font-weight: bold;
    }

    input, textarea {
        width: 100%;
        margin-top: 5px;
        padding: 7px;
        border: 1px solid #DBDBDB;
        border-radius: 5px;
        background: none;
    }

    textarea {
        resize: vertical;
    }

    .edit-box {
        width: 100%;
    }

    .edit-first {
        display: flex;
        align-items: flex-start;
        width: 100%;
    }

    .edit-first label {
        margin-top: 5px;
        background: none;
        border: none;
        color: #0095f6;
        font-weight: bold;
        outline: none;
        cursor: pointer;
    }

    .edit-first input {
        display: none;
    }

    .edit-img {
        width: 50px;
        height: 50px;
        margin-right: 20px;
        border-radius: 50%;
        overflow: hidden;
    }

    .edit-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .edit-send {
        padding: 10px 20px;
        background-color: #0095f6;
        border: none;
        border-radius: 5px;
        color: #fff;
        outline: none;
        font-weight: bold;
        cursor: pointer;
    }

    @media screen and (min-width: 426px) {
        form {
            background-color: #fff;
            border: 1px solid #DBDBDB;
        }

        .edit-box, .edit-btn, .edit-first {
            width: 50%;
        }

        .edit-btn {
            width: 50%;
        }
    }
</style>