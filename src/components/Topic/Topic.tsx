import React, { useEffect, useState } from "react"
import './Topic.css'
import Comment, { CommentType } from "../Comment/Comment"
import Popup from "../Popup/Popup"

export type TopicType = {
    author: string
    text: string
    date?: string // Если даты нет, то выводится текущая дата
    comments: CommentType[]
    currentAuthor?: string
}

const Topic = (props: TopicType) => {
    const [isShowPopup, setIsShowPopup] = useState(false)

    const [comments, setComments] = useState<CommentType[]>([])

    const [author, setAuthor] = useState("")
    const [text, setText] = useState("")
    const [date, setDate] = useState("")

    useEffect(
        () => {
            setComments(props.comments)
        },
        [props.comments]
    )

    const onSubmit = () => {
        const newComment = {
            author: props.currentAuthor ?? "",
            text: text,
            date: date,
            comments: []
        }
        setComments([...comments, newComment])
        setIsShowPopup(false)
        setAuthor("")
        setText("")
        setDate("")
    }

    return (
        <div className="topic">
            <div className="body">
                <div className="author">{props.author}</div>
                <div className="text">{props.text}</div>
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
                    comments.map((comment, index) => <Comment {...comment} key={`comment_${index}`}/>)
                }
            </div>
        </div>
    )
}

export default Topic