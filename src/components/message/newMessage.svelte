<script>
    import { createEventDispatcher } from "svelte"
    import { goto } from "@sapper/app"
    import { getNewMessage, addRoom } from "../../firebase/message"

    export let uid

    const dispatch = createEventDispatcher();
    let value = ""
    let lastValue
    let data = []

    $: if (value !== lastValue) handleSearch()

    const handleSearch = async () => {
        lastValue = value
        data = await getNewMessage(value, uid)
    }

    const handleClick = async (friendId) => {
        const roomId = await addRoom(uid, friendId)
        goto(`message/${roomId}`)
        dispatch("close")
    }

    const handleClose = () => {
        dispatch("close")
    }

</script>

<div class="overlay" on:click={handleClose}></div>
<div class="modal">
    <div class="modal-top box">
        <button class="noDefault" on:click={handleClose}>
            <svg aria-label="Close" color="#262626" fill="#262626" height="18" role="img" viewBox="0 0 24 24" width="18"><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
        </button>
        <h3>New message</h3>
    </div>
    <form class="box">
        <label for="user">User:</label>
        <input bind:value={value} id="user" class="noDefault" type="text" placeholder="Search...">
    </form>
    <div class="result">
        <h4>Result</h4>
        <ul>
            {#if data.length > 0}
                {#each data as user (user.uid)}
                    <li>
                        <button class="userCard noDefault" on:click={() => handleClick(user.uid)}>
                            <div>
                                <img src={user.imgPath === "" ? "images/default-user.jpg" : user.imgPath} alt="Profile user">
                            </div>
                            <p>{user.username}</p>
                        </button>
                    </li>
                {/each}
            {/if}
        </ul>
    </div>
</div>

<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 60;
    }

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        max-width: 400px;
        width: 80%;
        background-color: #fff;
        border-radius: 10px;
        transform: translate(-50%, -50%);
        z-index: 61;
    }

    .noDefault {
        background: none;
        border: none;
        outline: none;
    }

    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #A8A8A8;
    }

    .modal-top {
        padding: 10px 0;
    }

    .modal-top h3 {
        width: 100%;
        text-align: center;
        font-size: 2rem;
        font-weight: bold;
    }

    .modal-top button {
        position: absolute;
        left: 20px;
        cursor: pointer;
    }

    form {
        padding: 20px 0;
    }

    form label, form input {
        font-size: 1.4rem;
        margin-right: 20px;
    }

    form label {
        margin: 0 20px;
        font-weight: bold;
    }

    form input {
        width: 100%;
    }

    .result {
        padding: 20px;
        max-height: 60vh;
        min-height: auto;
        overflow-y: auto;
    }

    .result h4 {
        font-size: 1.4rem;
        opacity: 0.8;
        margin-bottom: 10px;
    }

    .result li {
        list-style: none;
    }

    .userCard {
        display: flex;
        align-items: center;
        padding: 10px 20px 0 10px;
        cursor: pointer;
    }

    .userCard p {
        margin-left: 14px;
        font-size: 1.4rem;
        color: #262626;
        font-weight: bold;
    }
    
    .userCard div {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
    }

    .userCard img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>