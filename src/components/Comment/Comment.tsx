import React, { useEffect, useState } from "react";
import Popup from "../Popup/Popup";
import { Comment as TComment } from "../../pages/Topics/Topics";
import Utils from "../../utils/Utils";

export type CommentType = {
    id: number
    topic: number
    parent?: number

    author: string
    text: string
    date?: string
    comments?: TComment[]
    currentAuthor?: string
    
    delete: (id: number) => void
}

const Comment = (props: CommentType) => {

    const [isShowComments, setIsShowComments] = useState(false)
    const [isShowPopup, setIsShowPopup] = useState(false)

    const [comments, setComments] = useState<TComment[]>([])

    const [author, setAuthor] = useState("")
    const [text, setText] = useState("")
    const [date, setDate] = useState("")

    useEffect(
        () => {
            setComments(props?.comments ?? [])
        },
        [props.comments]
    )

    useEffect(
        () => {
            setAuthor(props.currentAuthor ?? "")
        },
        [props.currentAuthor]
    )

    const onSubmit = () => {
        const newId = Utils.getMaxId(comments) + 1
        const newComment = {
            author: author,
            text: text,
            date: date,
            comments: [],

            id: newId,
            topic: 1,
            parent: 1,
        }
        setComments([...comments, newComment])
        setIsShowPopup(false)
        // setAuthor("")
        setText("")
        setDate("")
    }

    const onDeleteComment = (id: number) => {
        const newComments = []
        for(const comment of comments){
            if(comment.id !== id){
                newComments.push({...comment})
            }
        }
        setComments(newComments)
    }

    return <div className="comment">
        <div className="body">
            <div className="author">
                {props.author} <button onClick={() => props.delete(props.id)}>delete</button>
            </div>
            <div className="text">{props.text}</div>
            <div className="date">{props.date}</div>
        </div>
        {comments?.length && comments?.length > 0 ? <h3>
            Комментарии
            <button onClick={() => { setIsShowComments(!isShowComments) }}>
                {isShowComments ? "скрыть" : "раскрыть"}
            </button>
        </h3> : null}
        <div>
            <button onClick={() => setIsShowPopup(true)}>Add comment</button>
            <Popup title={"Add comment"}
                content={(
                    <div>
                        <label>
                            <div>Author</div>
                            <input value={author}/>
                        </label>
                        <label>
                            <div>Text</div>
                            <input value={text}
                                onChange={event => setText(event.target.value)} />
                        </label>
                        <label>
                            <div>Date</div>
                            <input value={date}
                                onChange={event => setDate(event.target.value)}
                                type="date" />
                        </label>
                    </div>
                )}
                isShow={isShowPopup}
                onCancel={() => setIsShowPopup(false)}
                onSubmit={onSubmit} />
        </div>
        {(isShowComments && comments?.length && comments?.length > 0) ? (
            <div className="comments">
                {
                    comments.map((comment, index) => <Comment {...comment} 
                                                              key={`comment_${index}`}
                                                              delete={onDeleteComment}
                                                              currentAuthor={author}/>)
                }
            </div>
        ) :
            null}
    </div>
}

export default Comment