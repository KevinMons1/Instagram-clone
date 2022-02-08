<script>
    const handleSubmit = () => {

    }
</script>

<aside class="comment-form">
    <form class="form-content" on:submit|preventDefault={handleSubmit}>
        <input type="text" placeholder="Add a comment...">
        <button type="submit">Publier</button>
    </form>
</aside>

<style>
    .comment-form {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 62px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
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
    }

    .form-content button {
        margin-right: 10px;
        border: none;
        background: none;
        color: #0095f6;
        font-size: 1.4rem;
        outline: none;
    }
</style>