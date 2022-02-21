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
        overflow-x: auto;
    }

    .storys::-webkit-scrollbar {
        display: none;
    }

    .storys {
        -ms-overflow-style: none; 
        scrollbar-width: none; 
    }

    .storys li {
        list-style: none;
    }

    @media screen and (min-width: 768px) {
        .storys {        
            margin: 20px 0;
            border: 1px solid #DBDBDB;
        }
    }
</style>