<script>
    import { onMount } from "svelte"
    import UserCard from "../../components/message/userCard.svelte"
    import { getInbox } from "../../firebase/message"
    
    export let minWidth
    export let uid

    let data = []

    onMount(async () => {
        data = await getInbox(uid)
        console.log(data);
    })

</script>

<section class={minWidth ? "inbox" : "inbox minWidth"}>
    <div class="inbox-header">
        <p>kevin.monsieur</p>
    </div>
    <div class="inbox-title">
        <h1>Messages</h1>
    </div>
    <div class="inbox-fill">
        <ul>
            <li><UserCard /></li>
            <li><UserCard /></li>
            <li><UserCard /></li>
            <li><UserCard /></li>
            <li><UserCard /></li>
            <li><UserCard /></li>
            <li><UserCard /></li>
            <li><UserCard /></li>
            <li><UserCard /></li>
            <li><UserCard /></li>
            <li><UserCard /></li>
            <li><UserCard /></li>
            <li><UserCard /></li>
            <li><UserCard /></li>
            <li><UserCard /></li>
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
        justify-content: center;
        align-items: center;
        height: 60px;
        border-bottom: 1px solid #DBDBDB;
    }

    .inbox-header p {
        font-size: 1.4rem;
        font-weight: bold;
    }

    .inbox-title {
        width: 100%;
        padding: 20px 20px 10px 20px;
    }

    .inbox-fill {
        overflow-y: auto;
        height: 100%;
    }

    h1 {
        font-size: 1.4rem;
        font-weight: bold;
    }
</style>