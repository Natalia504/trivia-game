import React, { Component } from 'react';

const Winner = () => {
    return <div>That is CORRECT!!!</div>
}
const Loser = () => {
    return <div>That's INCORRECT, stupid!</div>
}

function ComponentOne(props) {
console.log(props.showCurrentAnswer, 'showAnswer')
    return (
        <div className='question-container'>
            <div>
                {props.question}
            </div>
            
                {props.answers.map((e, index) => {
                    let className = e.selected ? "clicked" : null;

                    if(e.isCorrect && props.showCurrentAnswer){
                        className = 'correct';
                    } else if (!e.isCorrect && props.showCurrentAnswer && e.selected){
                        className = 'incorrect';
                    } else {
                        className;
                    }
                    return (<p className={className} key={index} onClick={() => props.selected(e.answer)}>{e.answer}</p>)
                })}
            
            <div className='btn-div'>
                <button disabled={props.isBtnActive} onClick={props.checking}>Check!</button>
                <button onClick={props.onClick}>Next>>></button>
            </div>

        </div>
    )
}
export default ComponentOne;