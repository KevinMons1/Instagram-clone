<div class="story">
    <div class="story-img">
        <img src="https://random.imagecdn.app/500/150" alt="">
    </div>
    <p>Kevinmons</p>
</div>

<style>
    .story {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 20px 20px 20px 0;
    }

    .story-img {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
    }

    .story-img img {
        width: 92%;
        height: 92%;
        border-radius: 50%;
        border: 2px solid #fff;
        object-fit: cover;
    }
    
    .story-img::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgb(255,204,85);
        background: linear-gradient(90deg, rgba(255,204,85,1) 0%, rgba(245,147,19,1) 35%, rgba(239,61,149,1) 55%, rgba(74,55,216,1) 100%);
        z-index: -1;
    }

    .story p {
        margin-top: 5px;
        font-size: 1.2rem;
    }
</style>