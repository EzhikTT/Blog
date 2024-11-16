import React from "react"
import './Topic.css'
import Comment from "../Comment/Comment"

const Topic = () => {
    return (
        <div className="topic">
            <div className="body">
                <div className="author">Какой-то автор</div>
                <div className="text">Какой-то текст</div>
                <div className="date">Сегодня</div>
            </div>
            <div className="comments">
                <Comment author={"какой-то автор"} text={"какой-то текст"} date={"сегодня"}/>
                <Comment author={"какой-то автор"} text={"какой-то текст"} date={"сегодня"}/>
                <Comment author={"какой-то автор"} text={"какой-то текст"} date={"сегодня"}/>
            </div>
        </div>
    )
}

export default Topic