import React, { createContext, FormEvent, useEffect, useRef, useState } from "react";
import TopicComponent, { TopicType } from "../../components/Topic/Topic";
import './Topics.css'
import Utils from "../../utils/Utils";
import TopicsList from "../../components/TopicsList/TopicsList";

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

type Context = {
    topics?: Topic[]
    addComment?: (comment: Comment) => void
    changeComment?: (id: number, text: string) => void
    deleteComment?: (id: number) => void
    deleteTopic?: (id: number) => void
    changeTopic?: (id: number, text: string) => void
    currentAuthor?: string
}

export const TopicContext = createContext<Context>({})

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

    const [comments, setComments] = useState<Comment[]>([
        {
            id: 1,
            topic: 1,
            text: "some comment",
            author: "some author",
            comments: [] 
        }
    ])

    const [author, setAutor] = useState('')
    const [text, setText] = useState('')
    const dateRef = useRef<HTMLInputElement>(null)

    useEffect(
        () => {
            console.log("comments", comments)
            const newTopics = [...topics]
            for(const topic of newTopics){
                topic.comments = getCommentsForTopic(topic.id)
            }
            setTopics(newTopics)
        },
        [comments]
    )

    const getCommentsForTopic = (id: number): Comment[] => {
        return comments.filter(comment => !comment.parent && comment.topic === id)
                       .map(comment => ({
                            ...comment,
                            comments: getCommentsForComment(comment.id)
                       }))
    }

    const getCommentsForComment = (id: number): Comment[] => {
        return comments.filter(comment => comment.parent && comment.parent === id)
                        .map(comment => ({
                            ...comment,
                            comments: getCommentsForComment(comment.id)
                        }))
    }

    const addTopic = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const maxId = Utils.getMaxId(topics)

        const newTopic = {
            id: maxId + 1,
            author: currentAuthor,
            text: text,
            date: dateRef?.current?.value ?? "",
            comments : []
        }
        const newTopics = [...topics, newTopic]
        setTopics(newTopics)
    }

    const deleteTopic = (id: number) => {
        const newTopics = [...topics]
        const index = newTopics.findIndex((topic) => topic.id === id)
        newTopics.splice(index, 1)
        setTopics(newTopics)
    }

    const changeTopic = (id: number, text: string) => {
        const newTopics = [...topics]
        const index = newTopics.findIndex((topic) => topic.id === id)
        newTopics[index].text = text
        setTopics(newTopics)
    }

    const addComment = (comment: Comment) => {
        comment.id = Utils.getMaxId(comments) + 1
        setComments([...comments, comment])
    }

    const changeComment = (id: number, text: string) => {
        const newComments = [...comments]
        const index = newComments.findIndex(comment => comment.id === id)
        newComments[index].text = text
        setComments(newComments)
    }

    const deleteComment = (id: number) => {
        const newComments = [...comments]
        const index = newComments.findIndex(comment => comment.id === id)
        newComments.splice(index, 1)
        setComments(newComments)
    }

    return (
        <TopicContext.Provider value={{
            topics,  // topics: topics
            addComment, 
            changeComment, 
            deleteComment, 
            deleteTopic, 
            changeTopic, 
            currentAuthor // currentAuthor: `${} ${} ${}`
        }}>
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
                <TopicsList/>
            </main>
        </TopicContext.Provider>
    )
}

export default Topics