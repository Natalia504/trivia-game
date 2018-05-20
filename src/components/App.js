import React, { Component } from 'react';
import './App.css';
import { getData, recordAnswers, recordCurrentTurn, selectAnswer, checkForCorrectAnswer, saveAnswers } from '../../reducer';
import { connect } from 'react-redux';
import ComponentOne from './ComponentOne';
import axios from 'axios';



class App extends Component {

    componentWillMount() {
        const currentTurn = 0;
        axios.get('https://opentdb.com/api.php?amount=10')
            .then(res => {
                this.props.getData(res.data.results);
                this.displayAnswers(currentTurn);
            });
    }


    displayQuestion() {
        return this.props.data.map((question, i) => {
            // Remove encoded HTML symbols and replace it with single quotes
            let formattedQuestion = question.question.replace(/&(?:[a-z]+|#\d+);/g, '\'');
            return <h4 className='question' key={i}>
                {formattedQuestion}
            </h4>
        })
    }

    displayAnswers(nextTurn) {
        console.log(this.props.data, 'PROPS DATA')
        const currentData = this.props.data[nextTurn]
        //1.create an array of objects from data
        const correct = { 'answer': currentData.correct_answer, 'isCorrect': true };
        const incorrect = currentData.incorrect_answers.map(e => {
            return { 'answer': e, 'isCorrect': false };
        });
        //2.merge all answers in one array
        let allAnswers = incorrect.concat(correct);

        //3.shuffle the answers
        let counter = allAnswers.length, temp, index;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = (Math.random() * counter--) | 0;
            // And swap the last element with it
            temp = allAnswers[counter];
            allAnswers[counter] = allAnswers[index];
            allAnswers[index] = temp;
        }
        //4.save answers on state
        this.props.saveAnswers(allAnswers);
    }

    // getAllQuestions() {
    //     return this.props.data.map((e, questionIndex) => {
    //         //1.merge all answers in one array
    //         let answers = [] //output:[correct, [incorrect, incorrect, incorrect]]
    //         answers.push(e.correct_answer)
    //         answers.push(e.incorrect_answers)
    //         let flattened = answers.reduce((a, b) => a.concat(b), []) //[correct, incorrect, incorrect, incorrect]
    //         //2.shuffle the answers
    //         var counter = flattened.length, temp, index;
    //         // While there are elements in the array
    //         while (counter > 0) {
    //             // Pick a random index
    //             index = (Math.random() * counter--) | 0;
    //             // And swap the last element with it
    //             temp = flattened[counter];
    //             flattened[counter] = flattened[index];
    //             flattened[index] = temp;
    //         }
    //         //3.Remove encoded HTML symbols and replace it with ''
    //         let formattedQuestion = e.question.replace(/&(?:[a-z]+|#\d+);/g, '\'');

    //         return (
    //             <div className='question-container' key={questionIndex}>
    //                 <h4 className='question'>{formattedQuestion}</h4>
    //                 {flattened.map((el, i) =>
    //                     <p style={{background: this.props.selectedAnswer}} onClick={() => this.assignSelectedColor(el)} key={el}>
    //                         {el.replace(/&(?:[a-z]+|#\d+);/g, '\'')}
    //                     </p>
    //                 )}
    //             </div>
    //         )
    //     })
    // };

    assignSelectedColor(clickedAnswer) {
        // console.log(clickedAnswer)
        this.props.selectAnswer(clickedAnswer);
        // console.log(this.props.selectedAnswer, "SELECTED ans prop");
        // console.log(this.props.selectedAnswer === clickedAnswer, 'COMPARE')

        clickedAnswer === this.props.selectedAnswer
            ? { background: this.props.selectedClass }
            : null;
    }

    checkForCorrectAnswer(questionIndex, clickedAnswer) {
        let currentQuestion = this.props.question.filter((item, i) => i === questionIndex)
        let isCorrect = currentQuestion.correct_answer === clickedAnswer ? true : false

        this.props.recordAnswers(isCorrect);
        console.log(isCorrect, 'isCorrect?')
    }

    nextQuestion() {
        const nextTurn = this.props.currentTurn + 1;
        this.displayAnswers(nextTurn);
        this.props.recordCurrentTurn(nextTurn);
    }


    render() {
        // console.log(this.props.data, 'DATA app83')
        // console.log(this.props.currentTurn, 'currentTurn in render')
        // console.log(this.props.answers, 'props.answers')
        console.log(this.props.selectedAnswer, 'selected Answer')
        let eachQuestion = this.displayQuestion();

        return (
            <div className='App'>
                <h4>Welcome to App</h4>
                <ComponentOne
                    question={eachQuestion[this.props.currentTurn]}
                    answers={this.props.answers}
                    onClick={() => this.nextQuestion()}
                    checking={() => this.checkForCorrectAnswer(this.props.currentTurn, this.props.selectedAnswer)}
                    selected={(selectedAnswer) => this.assignSelectedColor(selectedAnswer)}
                />

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        data: state.data,
        answers: state.answers,
        recordedAnswers: state.recordedAnswers,
        currentTurn: state.currentTurn,
        selectedAnswer: state.selectedAnswer,
        correctClass: state.correctClass,
        wrongClass: state.wrongClass,
        selectedClass: state.selectedClass
    }
}
export default connect(mapStateToProps, { getData, recordAnswers, recordCurrentTurn, selectAnswer, checkForCorrectAnswer, saveAnswers })(App);
