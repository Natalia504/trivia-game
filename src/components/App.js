import React, { Component } from 'react';
import './App.css';
import { getData, recordAnswers, recordCurrentTurn, selectAnswer, checkForCorrectAnswer, saveAnswers, disableBtn, showAnswer } from '../../reducer';
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
        const correct = {
            'answer': currentData.correct_answer,
            'isCorrect': true,
            'selected': false
        };
        const incorrect = currentData.incorrect_answers.map(e => {
            return {
                'answer': e,
                'isCorrect': false,
                'selected': false
            };
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
        this.props.selectAnswer(clickedAnswer);
        let selectedStatus = this.props.answers.filter(ans => ans.answer == clickedAnswer);
        this.props.answers.forEach(obj => obj.selected ? obj.selected = !obj.selected : !obj.selected);
        return selectedStatus[0].selected = !selectedStatus[0].selected;
    }

    checkForCorrectAnswer() {       
        let isCorrect = false;
        this.props.answers.forEach(obj => obj.isCorrect && obj.selected ? isCorrect = true : false);
        console.log(isCorrect, 'isCorrect?')
        this.props.recordAnswers(isCorrect);
        console.log(this.props.recordedAnswers, 'recorded answers');
        this.props.showAnswer(!this.props.showCurrentAnswer);
        this.props.disableBtn(true);
    }

    nextQuestion() {
        const nextTurn = this.props.currentTurn + 1;
        this.displayAnswers(nextTurn);
        this.props.recordCurrentTurn(nextTurn);
        this.props.showAnswer(!this.props.showCurrentAnswer);
        this.props.disableBtn(false);
    }

    render() {
        // console.log(this.props.showCurrentAnswer, 'props.showCurrentNAswer')
        console.log(this.props.selectedAnswer, 'SelectedAnswer')
        console.log(this.props.answers, 'AllAnswers')
        let eachQuestion = this.displayQuestion();
        

        return (
            <div className='App'>
                <h4>Welcome to App</h4>
                <ComponentOne
                    question={eachQuestion[this.props.currentTurn]}
                    answers={this.props.answers}
                    onClick={() => this.nextQuestion()}
                    checking={() => this.checkForCorrectAnswer()}
                    selected={(selectedAnswer) => this.assignSelectedColor(selectedAnswer)}
                    isBtnActive={this.props.isDisabled}
                    showCurrentAnswer={this.props.showCurrentAnswer}
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
        selected: state.selected, 
        isDisabled: state.isDisabled,
        showCurrentAnswer: state.showCurrentAnswer,
    }
}
export default connect(mapStateToProps, { getData, recordAnswers, recordCurrentTurn, selectAnswer, checkForCorrectAnswer, saveAnswers, disableBtn, showAnswer })(App);
