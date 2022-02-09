<script>
    import { createEventDispatcher } from "svelte"
    
    const dispatch = createEventDispatcher()
    let error = ""
    let disabled = true
    let data = {
        usernameOrEmail: ""
    }

    $: data.usernameOrEmail.length >= 6 ? disabled = false : disabled = true

    const nextStep = () => {
        let txt = data.usernameOrEmail
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
        let regexName = /^[a-zA-Zéè)\(+=._-]+$/

        if (txt.length >= 6) {
            if (txt.includes("@")) {
                if (regexEmail.test(txt)) {
                    txt = txt.split("@")[0]

                    if (txt.length <= 6) {
                        for (let i = 0; i < 7 - txt.length; i++) {
                            txt += i.toString()
                        }
                    }

                    dispatch("next-step", {usernameOrEmail: txt})
                } else error = "Your e-mail is invalid."
            } else if (regexName.test(txt)) {
                dispatch("next-step", {usernameOrEmail: txt})
            } else error = "Your username is invalid."
        } else error = "Your username or e-mail must contain at least 6 characters."
    }

</script>

<input class={error !== "" ? "error-input" : ""} type="text" bind:value={data.usernameOrEmail} placeholder="Username or e-mail">
{#if error !== ""}
    <small class="error-txt">{error}</small>
{/if}
<button disabled={disabled} class={disabled ? "disabled" : ""} on:click={nextStep}>Next</button>

<style>
    input {
        width: 100%;
        padding: 10px;
        font-size: 1.4rem;
        background: none;
        border: 1px solid #DBDBDB;
        border-radius: 3px;
        margin: 5px 0;
    }

    small {
        width: 100%;
        padding-left: 10px;
        text-align: start;
    }

    .disabled {
        opacity: 0.5;
    }

    button {
        width: 100%;
        padding: 10px;
        margin-top: 10px;
        font-size: 1.4rem;
        background-color: #0095f6;
        border: none;
        border-radius: 3px;
        color: #fff;
        /* opacity: 0.5; */
        cursor: pointer;
    }
</style>