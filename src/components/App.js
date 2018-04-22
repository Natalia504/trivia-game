import React, { Component } from 'react';
import './App.css';
import { getAllData } from '../../reducer';
import { connect } from 'react-redux';
import ComponentOne from './ComponentOne';
import axios from 'axios';

const Winner = () => {
    return <div>That is CORRECT!!!</div>
}
const Loser = () => {
    return <div>That's INCORRECT, stupid!</div>
}

class App extends Component {


    componentWillMount() {
        this.props.getAllData();
    }

    renderQuestion() {
        return this.props.data.map((e, questionIndex) => {
            //1.merge all answers in one array
            let answers = [] //output:[1000, [10, 100, 200]]
            answers.push(e.correct_answer)
            answers.push(e.incorrect_answers)
            let flattened = answers.reduce((a, b) => a.concat(b), []) //[1000, 10, 100, 200]
            //2.shuffle the answers
            var counter = flattened.length, temp, index;
            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                index = (Math.random() * counter--) | 0;
                // And swap the last element with it
                temp = flattened[counter];
                flattened[counter] = flattened[index];
                flattened[index] = temp;
            }
            return (
                <div className='question-container' key={questionIndex}>
                    <h4 className='question'>{e.question}</h4>
                    {flattened.map(el => 
                            <p onClick={this.checkForCorrectAnswer.bind(this, questionIndex, el)} key={el}>{el}</p>
                    )}
                </div>
            )
        })
    };

    checkForCorrectAnswer(questionIndex, clickedAnswer) {
        let currentQuestion = this.props.data.filter((item, i) => i === questionIndex)
        let isCorrect = currentQuestion[0].correct_answer === clickedAnswer ? true : false
        console.log(isCorrect, 'isCorrect?')




        // Add isCorrect: true/false to question object on data array
        // let newData = this.props.data[currentQuestion].isCorrect = isCorrect;
        
        // this.props.updateData(newData)
    }

    render() {
        console.log(this.props.data, 'DATA')
        return (
            <div className='App'>
                Welcome to App
                <ul>
                    <li>
                        {this.renderQuestion()}
                    </li>
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.data
    }
}
export default connect(mapStateToProps, { getAllData })(App);
