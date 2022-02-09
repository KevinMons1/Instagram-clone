<script>
    import { createEventDispatcher } from "svelte"
    import RegisterStep1 from "./registerStep1.svelte";
    import RegisterStep2 from "./registerStep2.svelte";
    import RegisterStep3 from "./registerStep3.svelte";

    const dispatch = createEventDispatcher()
    let step = 1
    let data = {
        usernameOrEmail: "",
        name: "",
        password: "",
        birthday: ""
    }

    const handleSubmit = () => {
        if (step === 4) {
            // Firebase
        }
    }

    const redirect = () => {
        dispatch("change-login-page")
    }

    const nextStep = (e) => {
        if (step === 1) {
            data[Object.keys(data)[0]] = e.detail.usernameOrEmail
        } else if (step === 2) {
            data[Object.keys(data)[1]] = e.detail.name
            data[Object.keys(data)[2]] = e.detail.password
        } else if (step === 3) {
            data[Object.keys(data)[3]] = e.detail.birthday
            handleSubmit()
        }
        step++
    }
</script>

<div class="connexion connexion-flex">
    <div class="connexion-box connexion-form">
        <h1>Inscription</h1>
        <form on:submit|preventDefault={handleSubmit} class="connexion-flex">
            {#if step === 1}
                <RegisterStep1 on:next-step={nextStep} />
            {:else if step === 2}
                <RegisterStep2 on:next-step={nextStep} />
            {:else if step === 3}
                <RegisterStep3 on:next-step={nextStep} />
            {:else if step === 4}
                <div class="connexion-last">
                    <p class="welcome">Welcome {data.usernameOrEmail} ! </p>
                    <button class="redirect-btn" on:click={redirect}>Now login you</button>
                </div>
            {/if}
        </form>
    </div>
    <div class="connexion-redirect connexion-box">
        <p>You do not have an account</p>
        <button class="redirect-btn" on:click={redirect}>Register at</button>
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
        text-align: center;
    }

    h1 {
        font-size: 2.5rem;
        margin-bottom: 50px;
    }

    .connexion-redirect {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .connexion-redirect p, .connexion-redirect button {
        font-size: 1.4rem;
    }


    .connexion-last button {
        font-size: 2rem;
    }

    .redirect-btn {
        margin-left: 5px;
        background: none;
        border: none;
        color: #0095f6;
        cursor: pointer;
    }

    .welcome {
        font-size: 2rem;
    }

    @media screen and (min-width: 426px) {
        .connexion-box {
            background-color: #fff;
            border: 1px solid #DBDBDB;
        }
    }
</style>