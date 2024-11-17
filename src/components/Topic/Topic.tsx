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

    const comments = [
        {
            author: "какой-то автор",
            text: "какой-то текст",
            date: "сегодня",
            comments: []
        },
        {
            author: "какой-то автор",
            text: "какой-то текст",
            date: "сегодня",
            comments: [
                {
                    author: "какой-то автор",
                    text: "какой-то текст",
                    date: "сегодня",
                    comments: [
                        {
                            author: "какой-то автор",
                            text: "какой-то текст",
                            date: "сегодня",
                            comments: []
                        },
                    ]
                },
                {
                    author: "какой-то автор",
                    text: "какой-то текст",
                    date: "сегодня",
                    comments: []
                },
            ]
        },
        {
            author: "какой-то автор",
            text: "какой-то текст",
            date: "сегодня",
            comments: []
        },
    ]

    return (
        <div className="topic">
            <div className="body">
                <div className="author">Какой-то автор</div>
                <div className="text">Какой-то текст</div>
                <div className="date">Сегодня</div>
            </div>
            <div className="comments">
                {
                    comments.map(comment => <Comment {...comment}/>)
                }
                {/* <Comment author={"какой-то автор"} text={"какой-то текст"} date={"сегодня"}/>
                <Comment author={"какой-то автор"} text={"какой-то текст"} date={"сегодня"}/>
                <Comment author={"какой-то автор"} text={"какой-то текст"} date={"сегодня"}/> */}
            </div>
        </div>
    )
}

export default Topic