<script>
    import { createEventDispatcher } from "svelte"
    import { deletePublication } from "../../firebase/publication"

    export let uid
    export let data

    const dispatch = createEventDispatcher()
    const isUser = data.user.uid === uid ? true : false

    const handleClickCancel = () => {
        dispatch("options")
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(`${window.location.origin}/publication/${data.publication.id}`)        
        alert("Copy !")
    }

    const handleShare = () => {
        navigator.share({
            title: "Instagram clone publication",
            text: `Publication of ${data.user.username}`,
            url: `${window.location.origin}/publication/${data.publication.id}`
        })
    }

    const handleDelete = async () => {
        if (isUser) {
            const result = await deletePublication(data)

            if (!result) alert("Error from server...")
            location.reload()
        }
    }
</script>

<div class="overlay" on:click={handleClickCancel}></div>
<div class="options">
    <ul>
        <li>
            {#if isUser}
                <button on:click={handleDelete} class="btn-line error-txt">Delete</button>
            {/if}
            <button on:click={handleShare} class="btn-line">Share</button>
            <button on:click={handleCopy} class="btn-line">Copy url</button>
            <button on:click={handleClickCancel}>Cancel</button>
        </li>
    </ul>
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

    .options {
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

    ul {
        width: 100%;
    }

    li {
        width: 100%;
        list-style: none;
    }

    button {
        width: 100%;
        padding: 20px 0;
        text-align: center;
        font-size: 1.4rem;
        border: none;
        background: none;
        outline: none;
        cursor: pointer;
    }

    .btn-line {
        border-bottom: 1px solid #A8A8A8;
    }
</style>