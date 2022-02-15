<script>
    import Comment from "./comment.svelte"
    import CommentForm from "./commentForm.svelte"

    export let comment = false
    export let data

    let descriptionComplet = false

    console.log(data);

    const seeMore = () => {
        descriptionComplet = !descriptionComplet
    }
</script>

<article class="publication">
    {#if comment}
        <CommentForm />
    {/if}
    <div class="publication-top">
        <a href={`/account/${data.user.uid}`}>
            <div>
                <img src={data.user.imgPath === "" ? "images/default-user.jpg" : data.user.imgPath} alt="Profile user">
            </div>
            <p>{data.user.username}</p>
        </a>
    </div>
    <div class="publication-slide">
        <a href={`publication/${data.publication.id}`} class="publication-img">
          {#each data.publication.files[0].items as item}
            <div>
                {#if item.filePath.includes("/o/images%")}
                    <img src={item.filePath} alt="publication">
                {:else}
                    <video muted controls>
                        <source src={item.filePath}>
                    </video>
                {/if}
            </div>
          {/each}
        </a>
        <div class="publication-btn">
            <div class="publication-bubble active"></div>
            <div class="publication-bubble"></div>
            <div class="publication-bubble"></div>
        </div>
    </div>
    <div class="publication-content">
        <div class="publication-action">
            <button name="like">
                <svg color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
            </button>
            <button name="comment">
                <svg color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>            </button>
            <button name="share">
                <svg color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
            </button>
        </div>
        <div class="publication-likes">
            <p>{data.publication.likes} Likes</p>
        </div>
        <div class={comment ? "publication-desc publication-desc-comment" : "publication-desc"}>
            {#if descriptionComplet || comment}
                <p class={comment ? "desc-margin" : ""}>{data.publication.text}</p>    
            {:else}
                <p>{data.publication.text.substring(0, 35)}</p>
            {/if}
            {#if comment}
                <small>2 days ago</small>
            {:else if data.publication.text.length > 30}
                <button on:click={seeMore}>{descriptionComplet ? "Less" : "More"}</button>
            {/if}
        </div>
        <div class={comment ? "publication-comment publi-com-margin" : "publication-comment"}>
            {#if comment}
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            {:else if data.publication.comments > 0}
                <a href="/publication/id">Show the {data.publication.comments > 1 ? data.publication.comments + " comments" : data.publication.comments + " comment"}</a>
            {/if}
        </div>
        {#if !comment}
            <small>2 days ago</small>
        {/if}
    </div>
</article>

<style>
    .publication {
        padding: 20px 0;
        width: 100%;
    }

    .publication button {
        border: none;
        background: none;
        outline: none;
        cursor: pointer;
    }

    /* Top */
    .publication-top {
        padding: 0 20px 20px 20px;
    }

    .publication-top a {
        display: flex;
        align-items: center;
    }

    .publication-top a p {
        margin-left: 14px;
        font-size: 1.4rem;
        color: #262626;
        font-weight: bold;
    }
    
    .publication-top div {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
    }

    .publication-top img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* Image */
    
    .publication-img {
        display: flex;  
        overflow-x: scroll;
    }

    .publication-img div {
        min-width: 100%;
        max-height: 90vh;
        min-height: 250px;
    }

    .publication-img div img, .publication-img div video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .publication-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
    }

    .publication-bubble {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: #A8A8A8;
        margin: 0 3.5px;
    }

    .publication-bubble.active {
        background-color: #0095F6;
    }

    /* content */

    .publication-content {
        padding: 0 20px;
    }

    .publication-action button {
        margin-right: 20px;
    }

    .publication-likes {
        margin: 10px 0;
    }

    .publication-desc-comment {
        border-bottom: 1px solid #A8A8A8;
        padding: 20px;
        margin: 0 -20px;
    }

    .publication-likes p, .publication-desc p {
        color: #262626;
        font-size: 1.4rem;
    }

    .publication-desc button, .publication-comment a  {
        color: #A8A8A8;
        font-size: 1.4rem;
        cursor: pointer;
    }

    .publication-comment {
        margin-bottom: 10px;
    }

    .publi-com-margin {
        margin-bottom: 62px;
    }

    .publication small {
        color: #8e8e8e;
        font-size: 1rem;
        text-transform: uppercase;
    }

    .desc-margin {
        margin-bottom: 20px;
    }

</style>