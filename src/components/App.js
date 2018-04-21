import React, { Component } from 'react';
import './App.css';
import { getAllData } from '../../reducer';
import { connect } from 'react-redux';
import ComponentOne from './ComponentOne';
import axios from 'axios';


class App extends Component {


    componentWillMount() {
        this.props.getAllData();
    }

    renderQuestion() {
        return this.props.data.map((e, i) => {
            //1.merge all answers in one array
            let answers = [] //output:[1000, [10, 100, 200]]
            answers.push(e.correct_answer)
            answers.push(e.incorrect_answers)
            let flattened = answers.reduce((a, b) => a.concat(b), []) //[1000, 10, 100, 200]
            console.log(flattened, 'answers')
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
                <div className='question-container' key={i}>
                    <h4 className='question'>{e.question}</h4>
                    {flattened.map(e =>
                        typeof (e) === 'number' 
                        ? 
                        flattened.reduce((a, b) => b - a) 
                        : 
                        <p key={e}>{e}</p>
                    )}
                </div>
            )
        })
    };

    checkForCorrectAnswer() {

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
                <ComponentOne
                />
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
