<script>
    import { goto } from "@sapper/app"

    const handleClick = () => {
        goto(`message/qsddqs`)
    }

</script>

<div class="userCard" on:click={handleClick}>
    <div class="userCard-left">
        <img src="images/default-user.jpg" alt="">
    </div>
    <div class="userCard-right">
        <p class="userCard-name">Jonathan Zablot</p>
        <div class="userCard-text">
            <p>You: Salut comment...</p>
            <span>.</span>
            <small>2 hours ago</small>
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
        margin-right: 10px;
        border-radius: 50%;
        overflow: hidden;
    }

    .userCard-left img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .userCard-right {
        width: 100%;
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