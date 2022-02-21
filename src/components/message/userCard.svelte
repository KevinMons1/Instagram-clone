<script>
    import { goto } from "@sapper/app"
    import moment from "moment"

    export let data

    const handleClick = () => {
        goto(`message/${data.roomId}`)
    }
</script>

<div class="userCard" on:click={handleClick}>
    <div class="userCard-left">
        <img src={data.imgPath === "" ? "images/default-user.jpg" : data.imgPath} alt="Profile user">
    </div>
    <div class="userCard-right">
        <p class="userCard-name">{data.username}</p>
        <div class="userCard-text">
            {#if data.messages}
                {#if data.messages.sender === data.uid}
                    <p>{data.messages.message.substring(0, 10)}...</p>
                {:else}
                    <p>You: {data.messages.message.substring(0, 5)}...</p>
                {/if}
                    <span>.</span>
                    <small>{moment(data.messages.date).fromNow()}</small>
            {/if}
        </div>
    </div>
</div>

<style>
    .userCard {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        padding: 10px 20px;
        cursor: pointer;
    }

    .userCard-left {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
    }

    .userCard-left img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .userCard-right {
        margin-left: 10px;
    }

    .userCard-text p, small, span {
        font-size: 1.2rem;
    }

    .userCard-text span {
        padding: 0 5px;
    }

    .userCard p, small {
        opacity: 0.6;
    }

    .userCard-name {
        font-size: 1.4rem;
    }

    .userCard-text {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
</style>