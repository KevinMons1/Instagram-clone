<script>
    import { goto } from "@sapper/app"
    import { addFollow, deleteFollow } from "../../firebase/user"
    
    export let isUser
    export let data
    export let uid
    export let isFollow = ""
    let antiSpam = 0

    console.log(isFollow);

    const handleFollow = async () => {
        if (antiSpam <= 3) {
            antiSpam++
            let result
            
            if (isFollow) result = await deleteFollow(isFollow, uid, data.uid)
            else result = await addFollow(uid, data.uid)
            
            if (typeof result === "string") isFollow = result
            else alert("Error from server...")
        }
    }
</script>

<svelte:head>
	<title>{data.name}</title>
</svelte:head>

<header class="account-informations">
    <div class="ai-top">
        <div class="ai-img">
            <img src={data.imgPath === "" ? "images/default-user.jpg" : data.imgPath} alt="Profile">
        </div>
        <div class="ai-top-right">
            <h1>{data.username}</h1>
            {#if isUser === true}
                <div class="ai-action">
                    <button on:click={() => goto("/account/edit")}>Modify profile</button>
                </div>
            {:else if isUser === false}
                <div class="ai-action">
                    <button>Contact</button>
                    <button on:click={handleFollow}>{isFollow !== "" ? "✔ Followed" : "Follow"}</button>
                </div>
            {/if}
        </div>
    </div>
    <div class="ai-bio">
        <p>{data.name}</p>
        <h2>{data.description}</h2>
    </div>
    <div class="ai-social">
        <div>
            <span>{data.publications}</span>
            <p>publications</p>
        </div>
        <div>
            <span>{data.subscribers}</span>
            <p>subscribers</p>
        </div>
        <div>
            <span>{data.subscriptions}</span>
            <p>subscriptions</p>
        </div>
    </div>
</header>

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