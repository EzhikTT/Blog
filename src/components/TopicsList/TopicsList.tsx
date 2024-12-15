import React, { useContext } from "react";
import { TopicContext } from "../../pages/Topics/Topics";
import Topic from "../Topic/Topic"

const TopicsList = () => {
    const {topics} = useContext(TopicContext) // {topics, addComment}

    return (
        <section>
            {topics?.map((topic, index) => <Topic {...topic} key={`topic_${index}`}/>)}
        </section>
    )
}

export default TopicsList