<script>
    import { createEventDispatcher } from "svelte"
    export let name
    export let password
    
    const dispatch = createEventDispatcher()
    let error = ""
    let errorNbr = 0
    let data = {
        name: name,
        password: password
    }
    let disabled = true

    $: data.name.length >= 6 && data.password.length >= 6 ? disabled = false : disabled = true

    const nextStep = () => {
        let regexName = /^[a-zA-Zéè)\(+=._-]+$/

        if (data.name.length >= 6) {
            if (data.password.length >= 6) {
                if (regexName.test(data.name.replace(/ /g, ""))) {
                    dispatch("next-step", data)
                } else createError(1, "Your name is invalid.")
            } else createError(2, "Your password must contain at least 6 characters.")
        } else createError(1, "Your name must contain at least 6 characters.")
    }

    const createError = (nbr, sentence) => {
        errorNbr = nbr
        error = sentence
    }

</script>

<input class={errorNbr === 1 ? "error-input" : ""} type="text" name="name" bind:value={data.name} placeholder="Name complet">
<input class={errorNbr === 2 ? "error-input" : ""} type="password" name="password" bind:value={data.password} placeholder="Password">
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