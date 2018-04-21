import axios from 'axios';

const initialState = {
   data: []
};

const GET_ALL_DATA = 'GET_ALL_DATA';

export function getAllData() {
    console.log('Action fires!')
    return {
        type: GET_ALL_DATA,
        payload: axios.get('https://opentdb.com/api.php?amount=10')
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_ALL_DATA + '_FULFILLED':
        console.log('Reducer fires!')
        console.log(action.payload, 'payload')
            return Object.assign({}, state, { data: action.payload.data.results });

        default:
            return state;
    }
}