import React from "react"
import './Topic.css'
import Comment, { CommentType } from "../Comment/Comment"

export type TopicType = {
    author: string
    text: string
    date?: string // Если даты нет, то выводится текущая дата
    comments: CommentType[]
}

const Topic = (props: TopicType) => {
    return (
        <div className="topic">
            <div className="body">
                <div className="author">{props.author}</div>
                <div className="text">{props.text}</div>
                <div className="date">{props.date}</div>
            </div>
            <div className="comments">
                {
                    props.comments.map(comment => <Comment {...comment}/>)
                }
            </div>
        </div>
    )
}

export default Topic