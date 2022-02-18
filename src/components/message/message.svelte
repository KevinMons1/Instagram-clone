<script>
    export let isUser
</script>

<li class={isUser ? "message message-right" : "message message-left"}>
    <small>2 hours ago</small>
    <p class={isUser ? "text-user" : "text-notuser"}>loremlorem loremlorem loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem </p>
</li>

<style>
    .message {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        margin: 10px 0;
        list-style: none;
    }

    .message-left {
        align-items: flex-start;
    }

    .message-right {
        align-items: flex-end;
    }

    small {
        font-size: 1.2rem;
        opacity: 0.6;
        margin-bottom: 5px;
    }
    
    p {
        max-width: 75%;
        min-width: auto;
        padding: 10px;
        font-size: 1.4rem;
        border-radius: 25px;
        word-break: break-all;
    }

    .text-notuser {
        border: 1px solid #EFEFEF;
    }

    .text-user {
        background-color: #EFEFEF;
    }
</style>