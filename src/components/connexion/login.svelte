<script>
    import { createEventDispatcher } from "svelte"
    import Loader from "../loader/loader.svelte"
    import storeAuth from "../../store/auth"

    const dispatch = createEventDispatcher()
    let loading = false
    let error = ""
    let errorNbr = 0
    let disabled = true
    let data = {
        email: "",
        password: ""
    }

    $: data.email.length !== "" && data.password.length >= 6 ? disabled = false : disabled = true

    const redirect = () => {
        dispatch("change-login-page")
    }

    const handleSubmit = () => {
        const { email, password } = data
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
        loading = true

        if (email.length !== "") {
            if (password.length !== "") {
                if (regexEmail.test(email)) {
                    storeAuth.signIn(email, password)
                    .then(() => loading = false)
                        .catch(err => {
                            if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
                                createError(3, "Your e-mail or password not match.")
                            } else {
                                createError(0, "Error from server... Try later")
                            }
                        })
                } else createError(1, "Your e-mail is invalid.")
            } else createError(2, "Your password is invalid.") 
        } else createError(1, "Your e-mail is invalid.")
    }

    const createError = (nbr, sentence) => {
        errorNbr = nbr
        error = sentence
        loading = false
    }
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

{#if loading}
    <Loader />
{/if}
<div class="connexion-flex connexion">
    <div class="connexion-flex connexion-box">
        <img src="images/logo.png" alt="Logo">
        <form on:submit|preventDefault={handleSubmit} class="connexion-flex connexion-form">
            <input class={errorNbr === 1 || errorNbr === 3 ? "error-input" : ""} type="email" name="email" bind:value={data.email} placeholder="E-mail">
            <input class={errorNbr === 2 || errorNbr === 3 ? "error-input" : ""} type="password" name="password" bind:value={data.password} placeholder="Password">
            {#if error !== ""}
                <small class="error-txt">{error}</small>
            {/if}
            <button disabled={disabled} class={disabled ? "disabled" : ""} type="submit">Connexion</button>
        </form>
    </div>
    <div class="connexion-redirect connexion-box">
        <p>Do you not have an account ?</p>
        <button on:click={redirect}>Register at</button>
    </div>
</div>

<style>
    .connexion {
        width: 100%;
        height: 100vh;
        padding: 20px;
    }
    .connexion-flex {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .connexion-box {
        padding: 40px;
        margin: 10px 0;
        width: 350px;
    }

    .connexion img {
        width: 50%;
        margin-bottom: 50px;
    }

    .connexion-form {
        width: 100%;
    }

    .connexion-form input {
        width: 100%;
        padding: 10px;
        font-size: 1.4rem;
        background: none;
        border: 1px solid #DBDBDB;
        border-radius: 3px;
        margin: 5px 0;
    }

    .connexion-form button {
        width: 100%;
        padding: 10px;
        margin-top: 10px;
        font-size: 1.4rem;
        background-color: #0095f6;
        border: none;
        border-radius: 3px;
        color: #fff;
        cursor: pointer;
    }

    .connexion-redirect {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .connexion-redirect p, .connexion-redirect button {
        font-size: 1.4rem;
    }

    .connexion-redirect button {
        margin-left: 5px;
        background: none;
        border: none;
        color: #0095f6;
        cursor: pointer;
    }

    .disabled {
        opacity: 0.5;
    }

    @media screen and (min-width: 426px) {
        .connexion-box {
            background-color: #fff;
            border: 1px solid #DBDBDB;
        }
    }
</style>