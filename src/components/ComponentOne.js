import React, { Component } from 'react';

const Winner = () => {
    return <div>That is CORRECT!!!</div>
}
const Loser = () => {
    return <div>That's INCORRECT, stupid!</div>
}

function ComponentOne(props) {
    // data.isCorrect ? <Winner /> : <Loser />          
    // console.log(props.answers, 'props answers')

    return (
        <div className='question-container'>
            {props.question}
            {props.answers.map((e, index) => <p key={index}>{e.answer}</p>)}
            <div className='btn-div'>
                <button onClick={props.checking}>Check!</button>
                <button onClick={props.onClick}>Next>>></button>
            </div>

        </div>
    )
}
export default ComponentOne;