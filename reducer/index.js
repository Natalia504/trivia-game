import axios from 'axios';

const initialState = {
    data: [],
    answers: [],
    recordedAnswers: [],
    currentTurn: 0,
    selectedAnswer: '',
    correctClass: '',
    wrongClass: '',
    selectedClass: '',
};

const GET_DATA = 'GET_DATA';
const GET_ANSWERS = 'GET_ANSWERS';
const RECORD_ANSWERS = 'RECORD_ANSWERS';
const CURRENT_TURN = 'CURRENT_TURN';
const SELECT_ANSWER = 'SELECT_ANSWER';
const SAVE_ANSWERS = 'SAVE_ANSWERS';


export function saveAnswers(answers){
    return {
        type: SAVE_ANSWERS, 
        payload: answers
    }
}

export function selectAnswer(selectedAnswer) {
    return {
        type: SELECT_ANSWER,
        payload: selectedAnswer,
        selected: "lightgrey",
        correct: "lightgreen",
        incorrect: "lightred",
    }
}

export function recordCurrentTurn(currentTurn) {
    return {
        type: CURRENT_TURN,
        payload: currentTurn
    }
}

export function recordAnswers(answer) {
    return {
        type: RECORD_ANSWERS,
        payload: answer
    }
}

export function getData(data) {
    return {
        type: GET_DATA,
        payload: data
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case SAVE_ANSWERS:
        return Object.assign({}, state, {answers: action.payload});

        case SELECT_ANSWER:
            return Object.assign({}, state, {
                selectedAnswer: action.payload,
                selectedClass: action.selected
            })

        case CURRENT_TURN:
            
            return Object.assign({}, state, { currentTurn: action.payload })

        case RECORD_ANSWERS:
            let answersArray = initialState.recordedAnswers;
            answersArray.push(action.payload);
            return Object.assign({}, state, { recordedAnswers: answersArray })

        case GET_DATA:
            return Object.assign({}, state, {
                data: action.payload
            });

        default:
            return state;
    }
}