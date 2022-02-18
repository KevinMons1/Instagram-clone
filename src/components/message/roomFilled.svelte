<script>
    import { goto } from "@sapper/app"
    import Message from "./message.svelte"

    const handleBack = () => {
        goto("/message/inbox")
    }
</script>

<div class="room-header">
    <button on:click={handleBack}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
    </button>
    <div class="room-user-img">
        <img src="images/default-user.jpg" alt="">
    </div>
    <p>Jonathan Zablot</p>
</div>
<div class="room-content">
    <ul class="room-messages">
        <Message isUser={true} data={null} />
        <Message isUser={false} data={null} />
        <Message isUser={true} data={null} />
        <Message isUser={false} data={null} />
        <Message isUser={false} data={null} />
        <Message isUser={false} data={null} />
        <Message isUser={true} data={null} />
        <Message isUser={true} data={null} />
        <Message isUser={false} data={null} />
        <Message isUser={false} data={null} />
        <Message isUser={true} data={null} />
        <Message isUser={false} data={null} />
        <Message isUser={false} data={null} />
        <Message isUser={false} data={null} />
        <Message isUser={true} data={null} />
    </ul>
    <div class="form-content">
        <form>
            <input type="text" placeholder="Your message...">
            <button class="message-send">Send</button>
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