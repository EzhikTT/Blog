import React, { useEffect, useState } from "react"
import './Topic.css'
import Comment, { CommentType } from "../Comment/Comment"
import Popup from "../Popup/Popup"
import Utils from "../../utils/Utils"
import { Comment as TComment } from "../../pages/Topics/Topics"

export type TopicType = {
    author: string
    text: string
    date?: string // Если даты нет, то выводится текущая дата
    comments: TComment[]
    currentAuthor?: string

    id: number
    delete: (id: number) => void
    change: (id: number, text: string) => void

    addComment: (comment: TComment) => void
    deleteComment: (id: number) => void
    changeComment: (id: number, text: string) => void 
}

const Topic = (props: TopicType) => {
    const [isShowPopup, setIsShowPopup] = useState(false)

    const [isEdit, setIsEdit] = useState(false)
    const [commentText, setCommentText] = useState('')

    const [author, setAuthor] = useState("")
    const [text, setText] = useState("")
    const [date, setDate] = useState("")

    useEffect(
        () => {
            setCommentText(props.text)
        },
        [props.text]
    )

    const onSubmit = () => {
        const newComment = {
            author: props.currentAuthor ?? "",
            text: text,
            date: date,
            comments: [],

            id: -1,
            topic: props.id
        }
        props.addComment(newComment)
        setIsShowPopup(false)
        setAuthor("")
        setText("")
        setDate("")
    }

    const onChangeTopic = () => {
        props.change(props.id, commentText)
        setIsEdit(false)
    }

    return (
        <div className="topic">
            <div className="body">
                <div className="author">
                    {props.author} 
                    <button onClick={() => props.delete(props.id)}>delete</button>
                    {props.author === props.currentAuthor && <button onClick={() => setIsEdit(true)}>edit</button>}
                </div>
                <div className="text">
                    {
                        isEdit ?
                        <React.Fragment>
                            <input value={commentText} onChange={event => setCommentText(event.target.value)}/>
                            <button onClick={onChangeTopic}>save</button>
                        </React.Fragment> :
                        commentText
                    }
                    
                </div>
                <div className="date">{props.date}</div>
            </div>
            <div className="comments">
                <button onClick={() => setIsShowPopup(true)}>Add comment</button>
                <Popup isShow={isShowPopup}
                       title={"Add comment"}
                       content={(
                        <div>
                            <label>
                                <div>Author</div>
                                <input value={props.currentAuthor ?? ""}/>
                            </label>
                            <label>
                                <div>Text</div>
                                <input value={text} 
                                       onChange={event => setText(event.target.value)}/>
                            </label>
                            <label>
                                <div>Date</div>
                                <input value={date} 
                                       onChange={event => setDate(event.target.value)}
                                       type="date"/>
                            </label>
                        </div>
                       )}
                       onCancel={() => setIsShowPopup(false)}
                       onSubmit={onSubmit}/>
                {
                    props.comments.map((comment, index) => <Comment {...comment} 
                                                                    key={`comment_${index}`} 
                                                                    delete={props.deleteComment}
                                                                    change={props.changeComment}
                                                                    add={props.addComment}
                                                                    currentAuthor={props.currentAuthor}/>)
                }
            </div>
        </div>
    )
}

export default Topic