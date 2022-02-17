<script context="module">
    export async function preload({ params }) {
        const accountUid = params.uid;
        return { accountUid };
    }
</script>

<script>
    import { onMount } from "svelte"
    import { goto } from "@sapper/app"
    import AccountInformations from "../../components/accountInformations/accountInformations.svelte"
    import PublicationGrid from "../../components/publicationGrid/publicationGrid.svelte"
    import Loader from "../../components/loader/loader.svelte"
    import storeAuth from "../../store/auth"
    import { getCurrentUser, getFillAccount } from "../../firebase/function"

    export let accountUid;
    let actualAccountuid = accountUid
    let loading = true
    let isUser = null
    let data = {
        user: {},
        fill: {}
    }

    $: if (actualAccountuid !== accountUid) handleLoad()

    onMount(async () => {
       await handleLoad()
    })

    const handleLoad = async () => {
        const user = await getCurrentUser(accountUid)
        const fill = await getFillAccount(accountUid)
        data = {
            user: user,
            fill: fill
        }
        
        if (user.name === undefined) {
            goto("/error")
        } else {
            storeAuth.subscribe(value => {
                if (value.uid === accountUid) isUser = true
                else isUser = false
                loading = false
            })
        }

        return
    }
</script>

{#if loading}
    <Loader overlay={false} />
{:else}
    <AccountInformations data={data.user} isUser={isUser} />
    <PublicationGrid data={data.fill} />
{/if}

