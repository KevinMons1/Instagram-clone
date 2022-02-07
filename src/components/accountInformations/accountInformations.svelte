<div class="account-informations">
    <div class="ai-top">
        <div class="ai-img">
            <img src="https://random.imagecdn.app/500/500" alt="Profile">
        </div>
        <div class="ai-top-right">
            <h1>kevin.monsieur</h1>
            <div class="ai-action">
                <button>Contact</button>
                <button>Add friend</button>
            </div>
        </div>
    </div>
    <div class="ai-bio">
        <p>Kevin Monsieu</p>
        <h2>I have a dream</h2>
    </div>
    <div class="ai-social">
        <div>
            <span>53</span>
            <p>publications</p>
        </div>
        <div>
            <span>211</span>
            <p>subscribers</p>
        </div>
        <div>
            <span>739</span>
            <p>subscriptions</p>
        </div>
    </div>
</div>

<style>
    .account-informations {
        padding: 20px;
    }

    .ai-top {
        display: flex;
    }

    .ai-img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 77px;
        height: 77px;
        border-radius: 50%;
        border: 1px solid #DBDBDB;
        overflow: hidden;
    }

    .ai-img img {
        width: 95%;
        height: 95%;
        border-radius: 50%;
        object-fit: cover;
    }

    .ai-top-right {
        margin-left: 20px;
    }

    h1 {
        font-size: 2.8rem;
        font-weight: 300;
    }

    .ai-action {
        margin-top: 20px;
    }

    .ai-action button {
        font-size: 1.4rem;
        border: 1px solid #DBDBDB;
        background: none;
        outline: none;
        cursor: pointer;
    }

    .ai-action button:nth-child(1) {
        padding: 5px 0;
        width: 150px;
        text-align: center;
        margin-right: 10px;
    }

    .ai-action button:nth-child(2) {
        padding: 5px;
        text-align: center;
    }

    .ai-bio {
        margin-top: 20px;
    }

    .ai-bio p, .ai-bio h2 {
        font-size: 1.4rem;
    }

    .ai-bio p {
        font-weight: bold;
    }

    .ai-bio h2 {
        font-weight: normal;
    }

    .ai-social {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 20px 0;
        margin: 20px 0;
        border-top: 1px solid #DBDBDB;
        border-bottom: 1px solid #DBDBDB;
    }

    .ai-social div {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    .ai-social p {
        font-size: 1.4rem;
    }
    
    .ai-social span {
        font-weight: bold;
        font-size: 1.4rem;
    }
</style>