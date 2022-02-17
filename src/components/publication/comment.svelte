<script>
    import moment from "moment"

    export let data
</script>

<div class="comment">
    <a href={`account/${data.user.uid}`} class="comment-img">
        <div>
            <img src={data.user.imgPath === "" ? "images/default-user.jpg" : data.user.imgPath} alt="Profile user">
        </div>
    </a>
    <div class="comment-right">
        <a class="comment-name" href={`account/${data.user.uid}`}>{data.user.username}</a>
        <p>{data.comment.text}</p>
        <small>{moment(data.comment.date).fromNow()}</small>
    </div>
</div>

<style>
    .comment {
        display: flex;
        padding: 10px;
    }

    .comment-img div {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
    }

    .comment-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .comment-right {
        margin-left: 10px;
        word-break: break-word;
    }

    .comment-name {
        font-size: 1.4rem;
        color: #262626;
        font-weight: bold;
    }

    .comment-right p {
        margin: 5px 0 20px 0;
        font-size: 1.4rem;
        color: #262626;
    }

    .comment-right small {
        color: #8e8e8e;
        font-size: 1.2rem;
    }
</style>