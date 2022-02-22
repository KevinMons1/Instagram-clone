<script>
    import { createEventDispatcher } from "svelte"
    import { addComment } from "../../firebase/publication"

    export let uid
    export let cid
    export let dataPublication

    const dispatch = createEventDispatcher()
    let error = ""
    let value = ""

    const handleSubmit = async () => {
        let newComment = {}
        let newDataPublication = {}
        error = ""

        if (value.length <= 250) {
            newComment = {
                uid: uid,
                text: value,
                date: Date.now()
            }

            newDataPublication = {
                ...dataPublication,
                comments: dataPublication.comments + 1
            }

            const result = await addComment(cid, newComment, newDataPublication)

            value = ""
            
            if (result) {
                dispatch("new-comment", newComment)
            } else error = "Error from server... Try later."
        } else error = "Your message is too long. Maximum 250 characters."
    }
</script>

<aside class="comment-form">
    <form class="form-content" on:submit|preventDefault={handleSubmit}>
        <input bind:value={value} type="text" placeholder="Add a comment...">
        <button type="submit">Publish</button>
    </form>
    {#if error !== ""}
        <p class="error-txt">{error}</p>
    {/if}
</aside>

<style>
    .comment-form {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 60px;
        padding: 5px 20px;
        background-color: #EFEFEF;
        z-index: 10;
    }

    .form-content {
        display: flex;
        width: 100%;
        height: 44px;
        padding: 10px 20px;
        background-color: #fff;
        border-radius: 25px;
        font-size: 1.4rem;
    }

    .form-content input {
        width: 100%;
        border: none;
        background: none;
        font-size: 1.4rem;
        outline: none;
    }

    .form-content button {
        margin: 0 10px;
        border: none;
        background: none;
        color: #0095f6;
        font-size: 1.4rem;
        outline: none;
        cursor: pointer;
    }

    .error-txt {
        margin-top: 5px;
    }
</style>