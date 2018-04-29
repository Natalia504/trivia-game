import axios from 'axios';
// import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';

const initialState = {
    data: [],
    answers: [],
    currentTurn: 0,
    selectedAnswer: '',
    isCorrect: null,
    questionIndex: '',
    correctClass: '',
    wrongClass: '',
    selectedClass: '',
};

const GET_ALL_DATA = 'GET_ALL_DATA';
const RECORD_ANSWERS = 'RECORD_ANSWERS';
const CURRENT_TURN = 'CURRENT_TURN';
const SELECT_ANSWER = 'SELECT_ANSWER';


export function selectAnswer(selectedAnswer) {
    return {
        type: SELECT_ANSWER,
        payload: selectedAnswer,
        selected: "lightgrey",
        correct: "lightgreen",
        incorrect: "lightred",
    }
}

export function recordCurrentTurn() {
    return {
        type: CURRENT_TURN,
        payload: initialState.currentTurn++
    }
}

export function recordAnswers(answer) {
    return {
        type: RECORD_ANSWERS,
        payload: answer
    }
}

export function getAllData() {
    return {
        type: GET_ALL_DATA,
        payload: axios.get('https://opentdb.com/api.php?amount=10')
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        // case CHECK_FOR_CORRECT_ANSWER:
        // console.log(initialState.data, 'data')
        // let currentQuestion = initialState.data.filter((item, i) => i === initialState.questionIndex)
        // let isCorrect = currentQuestion[0].correct_answer === initialState.selectedAnswer ? true : false
        // return Object.assign({}, state, {isCorrect: isCorrect})

        case SELECT_ANSWER:
            return Object.assign({}, state, {
                selectedAnswer: action.payload,
                selectedClass: action.selected
            })

        case CURRENT_TURN:
            return Object.assign({}, state, { currentTurn: action.payload })

        case RECORD_ANSWERS:
            let answersArray = initialState.answers;
            answersArray.push(action.payload);
            return Object.assign({}, state, { answers: answersArray })

        case GET_ALL_DATA + '_FULFILLED':
            // console.log(action.payload.data.results, 'payload results')
            return Object.assign({}, state, { data: action.payload.data.results });

        default:
            return state;
    }
}