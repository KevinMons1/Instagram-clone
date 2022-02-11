<script>
    import MultipleImages from "./multipleImages.svelte"
    export let arrFiles
    export let src
</script>

<img src={src} alt="Future publication">
<MultipleImages arrFiles={arrFiles} />

<style>
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>