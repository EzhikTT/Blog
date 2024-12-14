import React, { useRef, useState } from "react";
import "./Messanger.css"
import Utils from "../../utils/Utils";

export type User = {
    id: number
    username: string
}
export type Message = {
    id: number
    author: User
    text: string
    recipient: User
    date: Date
    quote?: Message 
}

const Messanger = () => {

    const user1: User = {
        id: 1,
        username: "user1"
    }
    const user2: User = {
        id: 2,
        username: "user2"
    }

    const [messages, setMessages] = useState<Message[]>([])

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const addMessage = () => {
        const newId = Utils.getMaxId(messages) + 1
        const randomNum = Math.round(Math.random() * 100)
        const newMessage: Message = {
            id: newId,
            author: randomNum % 2 === 0 ? user1 : user2,
            recipient: randomNum % 2 === 0 ? user2 : user1,
            text: textareaRef.current?.value ?? "",
            date: new Date()
        }
        setMessages([newMessage, ...messages ])
    }

    const dateFormat = (date: Date) => {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    return (
        <main>
            <section className="messages">
                {
                    messages.map(message => (
                        <div className={`message ${message.author.id === 1 ? 'left' : 'right'}`}>
                            <div>{message.text} ({dateFormat(message.date)})</div>
                        </div>
                    ))
                }
            </section>
            <section className="form">
                <textarea ref={textareaRef}></textarea>
                <button onClick={addMessage}>send</button>
            </section>
        </main>
    )
}

export default Messanger