
const initialState = {
   data: ''
};

const GET_ALL_DATA = 'GET_ALL_DATA';

export function getAllData() {
    return {
        type: GET_ALL_DATA,
        payload: 'Welcome to React'
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_ALL_DATA:
            return Object.assign({}, state, { data: action.payload });

        default:
            return state;
    }
}