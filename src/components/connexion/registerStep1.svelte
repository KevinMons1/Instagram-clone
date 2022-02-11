<script>
    import { createEventDispatcher } from "svelte"
    export let username
    export let email
    export let error
    export let errorNbr
    
    const dispatch = createEventDispatcher()
    let disabled = true
    let data = {
        email: email,
        username: username
    }

    $: data.email.length >= 6 ? disabled = false : disabled = true

    const nextStep = () => {
        let check = false
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
        let regexName = /^[a-zA-Z0-9éè\(+=._-]+$/

        if (data.email.length >= 6) {
           if (regexEmail.test(data.email)) {
                if (data.username !== "") {
                    if (data.username.length >= 6) {
                        if (regexName.test(data.username)) {
                            check = true
                        } else createError(2, "Your username is invalid.")
                    } else createError(2, "Your username must contain at least 6 characters.")
                } else {
                    // Create a username with email
                    data.username = data.email.split("@")[0]

                    if (data.username.length <= 6) {
                        for (let i = 0; i < 8 - data.username.length; i++) {
                            data.username += i.toString()
                        }
                    }
                    check = true
                }
           } else createError(1, "Your e-mail is invalid.")
        } else createError(2, "Your e-mail must contain at least 6 characters.")

        if (check) dispatch("next-step", {data})
    }

    const createError = (nbr, sentence) => {
        errorNbr = nbr
        error = sentence
    }

</script>

<input class={errorNbr === 1 ? "error-input" : ""} type="email" name="email" bind:value={data.email} placeholder="E-mail *">
<input class={errorNbr === 2 ? "error-input" : ""} type="text" name="username" bind:value={data.username} placeholder="Username">
<small class="required">* Required fields</small>
{#if error !== ""}
    <small class="error-txt">{error}</small>
{/if}
<button disabled={disabled} class={disabled ? "disabled" : ""} type="button" on:click={nextStep}>Next</button>

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

    .required {
        font-size: 1.2rem;
        opacity: 0.6;
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