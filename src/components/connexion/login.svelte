<script>
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()

    const redirect = () => {
        dispatch("change-login-page")
    }
</script>

<div class="connexion-flex connexion">
    <div class="connexion-flex connexion-box">
        <img src="images/logo.png" alt="Logo">
        <form class="connexion-flex connexion-form">
            <input type="text" placeholder="Username or e-mail">
            <input type="password" placeholder="Password">
            <button disabled>Connexion</button>
        </form>
    </div>
    <div class="connexion-redirect connexion-box">
        <p>You do not have an account</p>
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
        color: #fff;
        opacity: 0.5;
    }

    .connexion-redirect {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .connexion-redirect p button {
        font-size: 1.4rem;
    }

    @media screen and (min-width: 426px) {
        .connexion-box {
            background-color: #fff;
            border: 1px solid #DBDBDB;
        }
    }
</style>