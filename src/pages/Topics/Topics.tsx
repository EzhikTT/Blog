import React, { FormEvent, useRef, useState } from "react";
import TopicComponent, { TopicType } from "../../components/Topic/Topic";
import './Topics.css'
import Utils from "../../utils/Utils";

export type Comment = {
    id: number
    topic: number
    parent?: number

    author: string
    text: string
    date?: string
    comments: Comment[]
}

export type Topic = {
    id: number

    author: string
    text: string
    date?: string
    comments: Comment[]
}

const Topics = () => {

    const currentAuthor = "Current author"

    const [topics, setTopics] = useState<Topic[]>([
        {
            id: 1,
            author: "Some author 1",
            text: "Some text 1",
            date: "",
            comments : []
        },
        {
            id: 2,
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

        const maxId = Utils.getMaxId(topics)
        // const newId = Utils.getMaxId(topics) + 1

        const newTopic = {
            id: maxId + 1, // newId
            author: currentAuthor,
            text: text,
            date: dateRef?.current?.value ?? "",
            comments : []
        }
        const newTopics = [...topics, newTopic]
        // newTopics.push(newTopic)
        setTopics(newTopics)
    }

    const deleteTopic = (id: number) => {
        // findIndex, splice
        const newTopics = [...topics]
        const index = newTopics.findIndex((topic) => topic.id === id)
        newTopics.splice(index, 1)
        setTopics(newTopics)

        // for..of
        // const newTopics = []
        // for(const topic of topics){
        //     if(topic.id !== id){
        //         newTopics.push({...topic})
        //     }
        // }
        // setTopics(newTopics)
    }

    const changeTopic = (id: number, text: string) => {
        const newTopics = [...topics]
        const index = newTopics.findIndex((topic) => topic.id === id)
        newTopics[index].text = text
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
            <aside>
                {/* Информация о текущем пользователе */}
            </aside>
            <section>
                {topics.map((topic, index) => <TopicComponent {...topic} 
                                                              key={`topic_${index}`} 
                                                              currentAuthor={currentAuthor}
                                                              change={changeTopic}
                                                              delete={deleteTopic}/>)}
            </section>
        </main>
    )
}

export default Topics