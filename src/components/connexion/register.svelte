<script>
    import { createEventDispatcher } from "svelte"
    import { db } from "../../firebase/firebase-config"
    import { doc, setDoc } from "firebase/firestore"
    import storeAuth from "../../store/auth"
    import Loader from "../loader/loader.svelte"
    import RegisterStep1 from "./registerStep1.svelte";
    import RegisterStep2 from "./registerStep2.svelte";
    import RegisterStep3 from "./registerStep3.svelte";

    const dispatch = createEventDispatcher()
    let loading = false
    let error = ""
    let errorNbr = 0
    let step = 1
    let data = {
        email: "",
        username: "",
        name: "",
        password: "",
        birthday: ""
    }

    const handleSubmit = () => {
        const { email, password, username, name, birthday } = data
        loading = true

        if (step === 3) {
            storeAuth.signUp(email, password)
                .then(res => {
                    setDoc(doc(db, "users", res.user.uid), {
                        email: email,
                        username: username,
                        name: name,
                        birthday: birthday,
                        description: "",
                        imgPath: "",
                        imgName: ""
                    })
                        .then(() => {
                            step = 4
                            loading = false    
                        })
                        .catch(() => {
                            alert("Error from server... Try later.")
                            step = 1
                            loading = false    
                        })
                })
                .catch(err => {
                    if (err.code === "auth/email-already-in-use") {
                        step = 1
                        error = "Your e-mail is already used"
                        errorNbr = 1
                    } else if (err.code === "auth/invalid-email") {
                        step = 1
                        error = "Your e-mail is invalid"
                        errorNbr = 1
                    }
                    loading = false    
                })
        }    
    }

    const redirect = () => {
        dispatch("change-login-page")
    }

    const nextStep = (e) => {
        if (step === 1) {
            data[Object.keys(data)[0]] = e.detail.data.email
            data[Object.keys(data)[1]] = e.detail.data.username
            step = 2
        } else if (step === 2) {
            data[Object.keys(data)[2]] = e.detail.name
            data[Object.keys(data)[3]] = e.detail.password
            step = 3
        } else if (step === 3) {
            data[Object.keys(data)[4]] = e.detail.birthday
        }

        error = ""
        errorNbr = 0
    }
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

{#if loading}
    <Loader />
{/if}
<div class="connexion connexion-flex">
    <div class="connexion-box connexion-form">
        <div class="connexion-title">
            {#if step >= 2 && step < 4}
                <button on:click={() => step = step - 1}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
            {/if}
            <h1>Inscription</h1>
        </div>
        <form on:submit|preventDefault={handleSubmit} class="connexion-flex">
            {#if step === 1}
                <RegisterStep1 on:next-step={nextStep} error={error} errorNbr={errorNbr} email={data.email} username={data.username} />
            {:else if step === 2}
                <RegisterStep2 on:next-step={nextStep} name={data.name} password={data.password} />
            {:else if step === 3}
                <RegisterStep3 on:next-step={nextStep} birthday={data.birthday} />
            {:else if step === 4}
                <div class="connexion-last">
                    <p class="welcome">Welcome {data.username} ! </p>
                    <button class="redirect-btn" on:click={redirect}>Now login you</button>
                </div>
            {/if}
        </form>
    </div>
    <div class="connexion-redirect connexion-box">
        <p>Do you have already an account ?</p>
        <button class="redirect-btn" on:click={redirect}>Login at</button>
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

    .connexion-title {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 50px;
    }

    .connexion-title button {
        font-size: 3rem;
        background: none;
        border: none;
        font-weight: bold;
        outline: none;
        cursor: pointer;
    }

    h1 {
        font-size: 2.5rem;
        width: 100%;

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