<script>
    import StoryCard from "./storyCard.svelte"
</script>

<ul class="storys">
    <li>
        <StoryCard />
    </li>
    <li>
        <StoryCard />
    </li>
    <li>
        <StoryCard />
    </li>
    <li>
        <StoryCard />
    </li>
    <li>
        <StoryCard />
    </li>
    <li>
        <StoryCard />
    </li>
    <li>
        <StoryCard />
    </li>
    <li>
        <StoryCard />
    </li>
    <li>
        <StoryCard />
    </li>
    <li>
        <StoryCard />
    </li>
    <li>
        <StoryCard />
    </li>
    <li>
        <StoryCard />
    </li>
    <li>
        <StoryCard />
    </li>
    <li>
        <StoryCard />
    </li>
    <li>
        <StoryCard />
    </li>
</ul>

<style>
    .storys {
        display: flex;
        justify-content: flex-start;
        max-width: 100vw;
        padding-left: 20px;
        margin: 0 10px;
        border-bottom: 1px solid #DBDBDB;
        overflow-y: auto;
    }

    .storys li {
        list-style: none;
    }
</style>