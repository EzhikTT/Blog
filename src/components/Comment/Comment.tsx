import React, { useState } from "react";

export type CommentType = {
    author: string
    text: string
    date: string
    comments?: CommentType[]
}

const Comment = (props: CommentType) => {

    const [isShowComments, seiIsShowComments] = useState(false)

    return <div className="comment">
        <div className="body">
            <div className="author">{props.author}</div>
            <div className="text">{props.text}</div>
            <div className="date">{props.date}</div>
        </div>
        {props.comments?.length && props.comments?.length > 0 ? <h3>
            Комментарии 
            <button onClick={() => {seiIsShowComments(!isShowComments)}}>
                {isShowComments ? "скрыть" : "раскрыть"}
            </button>
        </h3> : null}
        {(isShowComments && props.comments?.length && props.comments?.length > 0) ? (
            <div className="comments">
                {
                    props.comments?.map(comment => <Comment {...comment}/>)
                }
            </div>
        ) : 
        null}
    </div>
}

export default Comment