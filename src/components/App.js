import React, { Component } from 'react';
import './App.css';
import { getAllData, recordAnswers, recordCurrentTurn, selectAnswer, checkForCorrectAnswer } from '../../reducer';
import { connect } from 'react-redux';
import ComponentOne from './ComponentOne';
import axios from 'axios';



class App extends Component {
    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         isCorrect: '',
    //         questionsArray: [],
    //     }
    // }


    componentWillMount() {
        this.props.getAllData();
        
    }

    getAllQuestions() {
        return this.props.data.map((e, questionIndex) => {
            //1.merge all answers in one array
            let answers = [] //output:[correct, [incorrect, incorrect, incorrect]]
            answers.push(e.correct_answer)
            answers.push(e.incorrect_answers)
            let flattened = answers.reduce((a, b) => a.concat(b), []) //[correct, incorrect, incorrect, incorrect]
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
            //3.Remove encoded HTML symbols and replace it with ''
            let formattedQuestion = e.question.replace(/&(?:[a-z]+|#\d+);/g, '\'');
    
            return (
                <div className='question-container' key={questionIndex}>
                    <h4 className='question'>{formattedQuestion}</h4>
                    {flattened.map((el, i) =>
                        <p classaName='color' onClick={() => this.assignSelectedColor(el)} key={el}>
                            {el.replace(/&(?:[a-z]+|#\d+);/g, '\'')}
                        </p>
                    )}
                </div>
            )
        })
    };

    assignSelectedColor(clickedAnswer){
        console.log(clickedAnswer, "CLICKED")
        this.props.selectAnswer(clickedAnswer);
        console.log(this.props.selectedAnswer === clickedAnswer, 'COMPARE')
        this.props.selectedAnswer == clickedAnswer 
        ? (style={background: this.props.selectedClass}) 
        : null;
    }

    checkForCorrectAnswer(questionIndex, clickedAnswer) {
        let currentQuestion = this.props.data.filter((item, i) => i === questionIndex)
        let isCorrect = currentQuestion[0].correct_answer === clickedAnswer ? true : false

        this.props.recordAnswers(isCorrect);
        console.log(isCorrect, 'isCorrect?')
    }

    nextQuestion(){
        this.props.recordCurrentTurn();
    }

    render() {
        console.log(this.props.data, 'DATA app83')
        console.log(this.props.currentTurn, 'currentTurn')
        console.log(this.props.answers, 'answersArray')
        console.log(this.props.selectedAnswer, 'this.props.selected Answer')
        let eachQuestion = this.getAllQuestions();

        return (
            <div className='App'>
                <h4>Welcome to App</h4>
                <ComponentOne
                    question={eachQuestion[this.props.currentTurn]}
                    onClick={() => this.nextQuestion()}
                    checking={()=>this.checkForCorrectAnswer(this.props.currentTurn, this.props.selectedAnswer)}
                />

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        data: state.data,
        answers: state.answers,
        currentTurn: state.currentTurn, 
        selectedAnswer: state.selectedAnswer, 
        correctClass: state.correctClass, 
        wrongClass: state.wrongClass, 
        selectedClass: state.selectedClass
    }
}
export default connect(mapStateToProps, { getAllData, recordAnswers, recordCurrentTurn, selectAnswer, checkForCorrectAnswer })(App);
