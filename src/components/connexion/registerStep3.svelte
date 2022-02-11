<script>
    import { createEventDispatcher } from "svelte"
    export let birthday
    
    const dispatch = createEventDispatcher()
    let error = ""
    let data = {
        birthday: birthday
    }
    let disabled = true

    $: data.birthday !== "" ? disabled = false : disabled = true

    const nextStep = () => {
        if (data.birthday !== "") {
            let birthday = new Date(data.birthday)
            // console.log(birthday);
            //calculate month difference from current date in time  
            var month_diff = Date.now() - birthday.getTime();  

            //convert the calculated difference in date format  
            var age_dt = new Date(month_diff);   
                
            //extract year from date      
            var year = age_dt.getUTCFullYear();  
                
            //now calculate the age of the user  
            var age = Math.abs(year - 1970);  

            if (age >= 13) {
                dispatch("next-step", data)
            } else error = "You must be over 13 years old."

        } else error = "Your birthday is invalid."
    }

</script>

<label for="birthday">Your birthday</label>
<input class={error !== "" ? "error-input" : ""} type="date" name="birthday" bind:value={data.birthday} id="birthday">
{#if error !== ""}
    <small class="error-txt">{error}</small>
{/if}
<button disabled={disabled} class={disabled ? "disabled" : ""} type="submit" on:click={nextStep}>Next</button>

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

    label {
        font-size: 1.4rem;
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