<script>
    import { createEventDispatcher } from "svelte"
    import storeAuth from "../../store/auth" 
    import moment from "moment"
    import Comment from "./comment.svelte"
    import CommentForm from "./commentForm.svelte"
    import { updateLike } from "../../firebase/publication"

    export let comment = false
    export let data
    export let uid
    
    const dispatch = createEventDispatcher();
    let descriptionComplet = false
    let slide
    let bubbles = []
    let isLike = data.publication.peopleLike.find(like => like === uid) ? true : false

    const seeMore = () => {
        descriptionComplet = !descriptionComplet
    }

    const handleScrollSlide = () => {
        const divNbr = data.publication.files[0].items.length
        const width = slide.getBoundingClientRect().width

        if (Math.floor(slide.scrollLeft % width / divNbr) === 0) {
            const index = slide.scrollLeft / width
            bubbles.forEach((element, i) => {
                if (i === Math.floor(index)) element.classList.add("active")
                else element.classList.remove("active")
            })
        }
    }

    const handleLikes = () => {
        let peopleLike = data.publication.peopleLike ? data.publication.peopleLike : []
        let likes = data.publication.likes

        if (isLike) {
            peopleLike = peopleLike.filter(userId => userId !== uid)
            likes = data.publication.likes - 1
            isLike = false
        } else {
            peopleLike = [...peopleLike, uid]
            likes = data.publication.likes + 1
            isLike = true
        }

        let publication = {
            ...data.publication,
            peopleLike: peopleLike,
            likes: likes
        }

        const newData = {
            user: data.user,
            publication: publication
        }

        data = newData

        delete newData.publication.peopleLike

        updateLike(newData.publication, peopleLike)
    }

    const handleComment = (e) => {
        let userData = {}

        storeAuth.subscribe(value => {
            userData = value
        })

        data = {
            ...data,
            publication: {
                ...data.publication,
                peopleComment: {
                    id: data.publication.peopleComment.id,
                    comments:  [
                        ...data.publication.peopleComment.comments,
                        {
                            comment: e.detail,
                            user: {
                                username: userData.username,
                                uid: userData.uid,
                                imgPath: userData.imgPath
                            }
                        }
                    ]
                }
            }
        }
    }

    const handleClickOptions = () => {
        dispatch("options", data)
    }

    const handleShare = () => {
        navigator.share({
            title: "Instagram clone publication",
            text: `Publication of ${data.user.username}`,
            url: `${window.location.origin}/publication/${data.publication.id}`
        })
    }

</script>

<article class="publication">
    {#if comment}
        <CommentForm on:new-comment={handleComment} dataPublication={data.publication} cid={data.publication.peopleComment.id} uid={uid} />
    {/if}
    <div class="publication-top">
        <a href={`/account/${data.user.uid}`}>
            <div>
                <img src={data.user.imgPath === "" ? "images/default-user.jpg" : data.user.imgPath} alt="Profile user">
            </div>
            <p>{data.user.username}</p>
        </a>
        <div on:click={handleClickOptions}>
            <svg aria-label="Options" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
        </div>
    </div>
    <div class="publication-slide">
        <a href={`publication/${data.publication.id}`} class="publication-img" bind:this={slide} on:scroll={handleScrollSlide}>
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
            {#if data.publication.files[0].items.length > 1}
                {#each data.publication.files[0].items as item, index}
                    <div class={index === 0 ? "publication-bubble active" : "publication-bubble"} bind:this={bubbles[index]}></div>
                {/each}
            {/if}
        </div>
    </div>
    <div class="publication-content">
        <div class="publication-action">
            <button class="action" name="like" on:click={handleLikes}>
                {#if isLike}
                    <svg aria-label="To dislike" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                {:else}
                    <svg aria-label="To like" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
                {/if}
            </button>
            {#if !comment}
                <a class="action" href={`publication/${data.publication.id}`} name="comment">
                    <svg aria-label="To comment" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>            
                </a>
            {/if}
            <button class="action" name="share" on:click={handleShare}>
                <svg aria-label="To share" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
            </button>
        </div>
        <div class="publication-likes">
            <p>{data.publication.likes <= 1 ? data.publication.likes + " Like" : data.publication.likes + " Likes"}</p>
        </div>
        <div class={comment ? "publication-desc publication-desc-comment" : "publication-desc"}>
            {#if descriptionComplet || comment}
                <p class={comment ? "desc-margin" : ""}>{data.publication.text}</p>    
            {:else}
                <p>{data.publication.text.length > 35 ? `${data.publication.text.substring(0, 35)}...` : data.publication.text}</p>
            {/if}
            {#if comment}
                <small>{moment(data.publication.date).fromNow()}</small>
            {:else if data.publication.text.length > 30}
                <button on:click={seeMore}>{descriptionComplet ? "Less" : "More"}</button>
            {/if}
        </div>
        <div class={comment ? "publication-comment publi-com-margin" : "publication-comment"}>
            {#if comment}
                {#if data.publication.peopleComment.comments.length > 0}
                    {#each data.publication.peopleComment.comments as item}
                        <Comment data={item} />
                    {/each}
                {:else}
                    <p class="anyComment">Any comment...</p>
                {/if}
            {:else if data.publication.comments > 0}
                <a href="/publication/id">Show the {data.publication.comments > 1 ? data.publication.comments + " comments" : data.publication.comments + " comment"}</a>
            {/if}
        </div>
        {#if !comment}
            <small>{moment(data.publication.date).fromNow()}</small>
        {/if}
    </div>
</article>

<style>
    .publication {
        margin: 20px 0;
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
        display: flex;
        justify-content: space-between;
        align-items: center;
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

    .publication-top svg {
        cursor: pointer;
    }

    /* Image */
    
    .publication-slide {
        overflow-x: auto;
    }

    .publication::-webkit-scrollbar {
        display: none;
    }

    .publication {
        -ms-overflow-style: none; 
        scrollbar-width: none; 
    }

    .publication-img {
        display: flex;  
        scroll-snap-type: x mandatory;
        overflow-x: auto;
    }

    .publication-img::-webkit-scrollbar {
        display: none;
    }

    .publication-img {
        -ms-overflow-style: none; 
        scrollbar-width: none; 
    }

    .publication-img div {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 100%;
        max-height: 90vh;
        min-height: 250px;
        background-color: #000;
        scroll-snap-align: start;
    }

    .publication-img div img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .publication-img div video {
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

    .action {
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

    .anyComment {
        margin-top: 10px;
        font-size: 1.4rem;
    }

    @media screen and (min-width: 768px) {
        .publication {        
            border: 1px solid #DBDBDB;
        }
    }

</style>