import React, { useState } from 'react';
import logo from '../../logo.svg';
import './App.css';
import Card from '../Card/Card'
import Topic, { TopicType } from '../Topic/Topic';
import Popup from '../Popup/Popup';

function App() {

  const [isShow, setIsShow] = useState(false) // === Array

  const [topics, setTopics] = useState<TopicType[]>([])

  const addTopic = () => {}

  const onClick = () => {
    setIsShow(true)
  }

  const onClosePopup = () => {
    setIsShow(false)
  }

  const onToggleShowingPopup = () => {
    setIsShow(!isShow)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Card/>
        <br/>
        
        <Topic/> {/* .map() */}
        <Popup title={<span>'Какой-то заголовок'</span>}
               content={<Topic/>}
               isShow={isShow}
               onCancel={onClosePopup} // onCancel={() => {setIsShow(false)}}
               onSubmit={onClosePopup} // onToggleShowingPopup
               />

        <br/><br/>
        <button onClick={onClick} // onToggleShowingPopup
                >
                  show popup
        </button> 
        <br/><br/>

      </header>
    </div>
  );
}

export default App;
