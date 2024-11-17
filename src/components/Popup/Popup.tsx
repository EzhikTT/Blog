import React, {FC, ReactNode} from "react";
import './Popup.css'

type Props = {
    title: string | ReactNode
    content: string | ReactNode
    onCancel: (event: React.MouseEvent<HTMLElement>) => void
    onSubmit: (event: React.MouseEvent<HTMLElement>) => void
    isShow: boolean
}

const Popup = (props: Props) => {
    return (
        <div className={"popup" + (props.isShow ? "" : " hide")}>
            <div className="body">
                <h3>{props.title}</h3>
                <div className="content">{props.content}</div>
                <footer>
                    <button onClick={props.onCancel}>Отмена</button>
                    <button onClick={props.onSubmit}>ОК</button>
                </footer>
            </div>
        </div>
    )
}

export default Popup