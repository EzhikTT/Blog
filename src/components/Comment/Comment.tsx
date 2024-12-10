import React, { useEffect, useRef, useState } from "react";
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
    change: (id: number, text: string) => void
    add: (comment: TComment) => void
}

const Comment = (props: CommentType) => {

    const [isShowComments, setIsShowComments] = useState(false)
    const [isShowPopup, setIsShowPopup] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const [author, setAuthor] = useState("")
    const [text, setText] = useState("")
    const [date, setDate] = useState("")

    const ref = useRef<HTMLInputElement>(null)

    useEffect(
        () => {
            console.log("props", props)
        },
        [props]
    )

    useEffect(
        () => {
            if(ref.current){
                ref.current.value = props.text
            }
        },
        [props.text, ref, isEdit]
    )

    useEffect(
        () => {
            setAuthor(props.currentAuthor ?? "")
        },
        [props.currentAuthor]
    )

    const onSubmit = () => {
        const newComment = {
            author: author,
            text: text,
            date: date,
            comments: [],

            id: -1,
            topic: props.topic,
            parent: props.id,
        }
        props.add(newComment)
        setIsShowPopup(false)
        setText("")
        setDate("")
    }

    const onSave = () => {
        props.change(props.id, ref.current?.value ?? "")
        setIsEdit(false)
    }

    return <div className="comment">
        <div className="body">
            <div className="author">
                {props.author} 
                <button onClick={() => props.delete(props.id)}>delete</button>
                {props.currentAuthor === props.author && 
                    <button onClick={() => setIsEdit(true)}>edit</button>
                }
            </div>
            <div className="text">
                {
                    isEdit ? 
                    <>
                        <input ref={ref}/> 
                        <button onClick={onSave}>save</button>
                    </>: 
                    props.text
                }
            </div>
            <div className="date">{props.date}</div>
        </div>
        {props?.comments?.length && props?.comments?.length > 0 ? <h3>
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
        {(isShowComments && props?.comments?.length && props?.comments?.length > 0) ? (
            <div className="comments">
                {
                    props?.comments.map((comment, index) => <Comment {...comment} 
                                                                    key={`comment_${index}`}
                                                                    delete={props.delete}
                                                                    change={props.change}
                                                                    add={props.add}
                                                                    currentAuthor={author}/>)
                }
            </div>
        ) :
            null}
    </div>
}

export default Comment