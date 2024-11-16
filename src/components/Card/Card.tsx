import React from 'react'
import logo from '../../logo.svg'
import './Card.css'

const Card = () => {
    return <div className='card'>
        <div className='img'>
            <img src={logo}/>
        </div>
        <div className='body'>
            <h2>это карточка</h2>
            <section>Наш первый компонент</section>
        </div>
    </div>
}

export default Card