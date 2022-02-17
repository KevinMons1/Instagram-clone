<script>
    import { createEventDispatcher } from "svelte"
    import { addComment } from "../../firebase/function"

    export let uid
    export let cid
    export let dataPublication

    const dispatch = createEventDispatcher();
    let error = ""
    let data = ""

    const handleSubmit = async () => {
        error = ""

        if (data.length <= 250) {
            const newComment = {
                uid: uid,
                text: data,
                date: Date.now()
            }

            dataPublication = {
                ...dataPublication,
                comments: dataPublication.comments + 1
            }

            const result = await addComment(cid, newComment, dataPublication)

            data = ""
            
            if (result) {
                dispatch("new-comment", newComment)
            } else error = "Error from server... Try later."
        } else error = "Your message is too long. Maximum 250 characters"
    }
</script>

<aside class="comment-form">
    <form class="form-content" on:submit|preventDefault={handleSubmit}>
        <input bind:value={data} type="text" placeholder="Add a comment...">
        <button type="submit">Publier</button>
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
        min-height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 5px 20px;
        background-color: #EFEFEF;
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
    }

    .error-txt {
        margin-top: 5px;
    }
</style>