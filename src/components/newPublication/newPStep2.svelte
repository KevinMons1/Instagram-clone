<script>
    import { onMount, createEventDispatcher } from "svelte"
    import storeAuth from "../../store/auth"

    const dispatch = createEventDispatcher()
    let data = {}
    let text = ""
    let nbrLetter = 0
    let error = ""

    $: if (nbrLetter <= 2200) {
            error = ""
            handleChange()
        }
        else {
            error = "Length maximum for your message." 
            text = text.substring(0, 2200)
            handleChange()
        }

    onMount(() => {
        storeAuth.subscribe(value => {
            data = value
        })
    })

    const handleChange = () => {
        nbrLetter = text.length
        dispatch("text-change", text)
    }

</script>

<div class="newP-informations">
    <div class="newP-top">
        <a href={`account/${data.uid}`}>
            <div>
                <img src={data.imgPath === "" ? "images/default-user.jpg" : data.imgPath} alt="Profile">
            </div>
            <p>{data.name}</p>
        </a>
    </div>
    <textarea name="Your message" placeholder="Write your message" bind:value={text}></textarea>
    <small class={error !== "" ? "error-txt" : ""}>{nbrLetter}/2 200</small>
    {#if error !== ""}
        <p class="error error-txt">{error}</p>
    {/if}
</div>

<style>
    .newP-informations {
        width: 60%;
        height: 100%;
        padding: 20px;
    }

    .newP-top a {
        display: flex;
        align-items: center;
    }

    .newP-top a p {
        margin-left: 14px;
        font-size: 1.4rem;
        color: #262626;
        font-weight: bold;
    }
    
    .newP-top div {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
    }

    .newP-top img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    textarea {
        width: 100%;
        height: 50%;
        margin: 20px 0;
        font-size: 1.4rem;
        background: none;
        border: none;
        resize: none;
        outline: none;
    }

    small {
        font-size: 1.4rem;
        opacity: 0.6;
    }

    .error {
        margin-top: 10px;
    }
</style>