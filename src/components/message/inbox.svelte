<script>
    import { onMount } from "svelte"
    import UserCard from "../../components/message/userCard.svelte"
    import { getInbox } from "../../firebase/message"
    import NewMessage from "./newMessage.svelte"
    
    export let minWidth
    export let uid

    let data = []
    let openModal = false

    onMount(async () => {
        data = await getInbox(uid)
    })

    const handleNewMessage = () => {
        openModal = !openModal
    }

</script>

{#if openModal}
    <NewMessage on:close={handleNewMessage} uid={uid} />
{/if}
<section class={minWidth ? "inbox" : "inbox minWidth"}>
    <div class="inbox-header">
        <p>kevin.monsieur</p>
        <button on:click={handleNewMessage}>
            <svg aria-label="New message" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.202 3.203H5.25a3 3 0 00-3 3V18.75a3 3 0 003 3h12.547a3 3 0 003-3v-6.952" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 012.004 0l1.224 1.225a1.417 1.417 0 010 2.004z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line></svg>
        </button>
    </div>
    <div class="inbox-title">
        <h1>Messages</h1>
    </div>
    <div class="inbox-fill">
        <ul>
            {#if data.length > 0}
                {#each data as item}
                    <li><UserCard data={item} /></li>
                {/each}
            {:else}
            <p>You have no discussion.</p>
            <button name="New message" on:click={handleNewMessage}>Start talking now!</button>
            {/if}
        </ul>
    </div>
</section>

<style>
    .inbox {
        width: 50%;
        height: 100%;
        border-right: 1px solid #DBDBDB;
    }

    .minWidth {
        width: 100%!important;
        border: none;
    }

    .inbox-header {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 60px;
        border-bottom: 1px solid #DBDBDB;
    }

    .inbox-header p {
        font-size: 1.4rem;
        font-weight: bold;
    }

    .inbox-header button {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
    }

    .inbox-title {
        width: 100%;
        padding: 20px 20px 10px 20px;
    }

    .inbox-fill {
        overflow-y: auto;
        height: 100%;
    }

    .inbox-fill ul p {
        font-size: 1.4rem;
        margin: 10px 20px 5px 20px;
    }

    .inbox-fill ul button {
        margin: 5px 20px;
        padding: 5px;
        font-size: 1.4rem;
        background-color: #0095f6;
        color: #fff;
        border: none;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
    }

    h1 {
        font-size: 1.4rem;
        font-weight: bold;
    }
</style>