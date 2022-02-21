<script>
    import { onMount } from "svelte"
    import { goto } from "@sapper/app"
    import storeAuth from "../../store/auth"
    import { getRoom, addMessage } from "../../firebase/message"
    import Message from "./message.svelte"

    export let roomId

    let actualId = ""
    let value = ""
    let data = []
    let uid
    let antiSpam = false
    let error = ""
    let userData = {}

    $: if (actualId !== roomId) handleLoad()
    
    onMount(async () => {
        storeAuth.subscribe(value => {
            uid = value.uid
        })
        handleLoad()
    })
    
    const handleLoad = async () => {
        userData = await getRoom(uid, roomId, (newData) => addData(newData))
        actualId = roomId
    }

    const addData = (newData) => {
        data = newData
    }

    const handleBack = () => {
        goto("/message/inbox")
    }

    const handleSubmit = async () => {
        if (!antiSpam) {
            antiSpam = true

            await addMessage(roomId, value, uid)
            value = ""

            const intervalAntiSpam = setInterval(() => {
                antiSpam = false
                clearInterval(intervalAntiSpam)
                error = ""
            }, 100)
        } else error = "Please do not spam 😉"
    }
</script>

<svelte:head>
	<title>Discusion with {userData.username}</title>
</svelte:head>

<div class="room-header">
    <button on:click={handleBack}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
    </button>
    <a href={`account/${userData.uid}`}>
        <div class="room-user-img">
            <img src={userData.imgPath === "" ? "images/default-user.jpg" : userData.imgPath} alt="Profile user">
        </div>
        <p>{userData.username}</p>
    </a>
</div>
<div class="room-content">
    <ul class="room-messages">
        {#each data as item}
            <Message isUser={item.sender === uid} data={item} />
        {/each}
    </ul>
    <div class="form-content">
        {#if error !== ""}
            <p class="error-txt">{error}</p>
        {/if}
        <form on:submit|preventDefault={handleSubmit}>
            <input bind:value={value} type="text" placeholder="Your message...">
            <button type="submit" class="message-send">Send</button>
        </form>
    </div>
</div>

<style>
    .room-header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 60px;
        border-bottom: 1px solid #DBDBDB;
    }

    .room-header a {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .room-header button {
        margin-left: 20px;
        font-size: 3rem;
        background: none;
        border: none;
        font-weight: bold;
        outline: none;
        cursor: pointer;
    }

    .room-user-img {
        width: 30px;
        height: 30px;
        margin: 0 10px 0 20px;
        border-radius: 50%;
        overflow: hidden;
    }

    .room-user-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .room-header p {
        font-size: 1.4rem;
        color: #000;
    }

    .room-content {
        height: calc(100% - 120px);
    }

    .room-messages {
        width: 100%;
        height: 100%;
        padding: 0 20px 20px 20px;
        overflow-y: auto;
    }

    .form-content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 60px;
        width: 100%;
    }

    form {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: calc(100% - 40px);
        padding: 10px;
        margin: 0 20px;
        border: 1px solid #DBDBDB;
        border-radius: 25px;
    }

    input {
        width: 100%;
        font-size: 1.4rem;
        background: none;
        border: none;
        outline: none;
    }

    .message-send {
        font-size: 1.7rem;
        color: #0095f6;
        border: none;
        background: none;
        outline: none;
        cursor: pointer;
        margin-left: 10px;
    }
</style>