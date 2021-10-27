import React from 'react'

const HeaderComponent = (props) => {
    return (
        <header className = 'header'>
            <h1>{props.title}</h1>
        </header>
    )
}

export default HeaderComponent