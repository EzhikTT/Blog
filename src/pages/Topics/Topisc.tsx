import React, { FormEvent, useRef, useState } from "react";
import Topic, { TopicType } from "../../components/Topic/Topic";
import './Topics.css'

const Topics = () => {

    const [topics, setTopics] = useState<TopicType[]>([
        {
            author: "Some author 1",
            text: "Some text 1",
            date: "",
            comments : []
        },
        {
            author: "Some author 2",
            text: "Some text 2",
            date: "",
            comments : []
        },
    ])

    const [author, setAutor] = useState('')
    const [text, setText] = useState('')
    const dateRef = useRef<HTMLInputElement>(null)

    const addTopic = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newTopic = {
            author: author,
            text: text,
            date: dateRef?.current?.value ?? "",
            comments : []
        }
        const newTopics = [...topics, newTopic]
        // newTopics.push(newTopic)
        setTopics(newTopics)
    }

    return (
        <main>
            <header>
                {/* <button onClick={addTopic}>Add topic</button> */}
                <form onSubmit={addTopic}>
                    <label>
                        <span>автор</span>
                        <input onChange={event => setAutor(event.target.value)}
                               value={author}/>
                    </label>
                    <label>
                        <span>текст</span>
                        <input onChange={event => setText(event.target.value)}
                               value={text}/>
                    </label>
                    <label>
                        <span>дата</span>
                        <input ref={dateRef} type="date"/>
                    </label>
                    <button type="submit">Добавить</button>
                </form>
            </header>
            <section>
                {topics.map(topic => <Topic {...topic}/>)}
            </section>
        </main>
    )
}

export default Topics