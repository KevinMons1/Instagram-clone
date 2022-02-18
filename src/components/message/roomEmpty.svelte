<div class="room-content">
    <div class="room-img">
        <svg color="#262626" fill="#262626" role="img" viewBox="0 0 24 24" >
            <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="1"></polygon>
        </svg>
    </div>
    <h2>Your messages</h2>
    <h3>Talk with your friends to have a good time.</h3>
</div>

<style>
    .room-content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: calc(100% - 60px);
    }

    .room-img {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        border: 1px solid black;
        border-radius: 50%;
    }

    .room-img svg {
        width: 50px;
        height: 50px;
    }

    .room-content h2 {
        margin: 10px 0;
        font-size: 2rem;
        font-weight: 300;
    }

    .room-content h3 {
        font-size: 1.4rem;
        opacity: 0.6;
    }
</style>