import React from "react";

const Comment = (props: any) => {
    return <div className="comment">
        <div className="body">
            <div className="author">{props.author}</div>
            <div className="text">{props.text}</div>
            <div className="date">{props.date}</div>
        </div>
        <div className="comments">
            {/* <Comment author="Some author" text="some text" date="now"/>
            <Comment author="Some author" text="some text" date="now"/>
            <Comment author="Some author" text="some text" date="now"/> */}
        </div>
    </div>
}

export default Comment