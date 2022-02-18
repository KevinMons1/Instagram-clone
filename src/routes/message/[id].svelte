<script context="module">
    export async function preload({ params }) {
        const id = params.id;
        return { id };
    }
</script>

<script>
    import Index from "../../components/message/index.svelte"

    export let id

    let data = {}
</script>

<Index data={data} />
