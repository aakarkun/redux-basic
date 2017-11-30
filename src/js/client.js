import { applyMiddleware, createStore } from 'redux';

import axios from 'axios';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_USERS_PENDING": {
            return {...state, fetching: true}
            break;
        }
        case "FETCH_USERS_FULFILLED": {
            return {...state, fetching: false, fetched: true, users: action.payload.data}
            break;
        }
        case "FETCH_USERS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
            break;
        }
    }
    
    return state;
}

const middleware = applyMiddleware(promise(), thunk, logger());

const store = createStore(reducer, middleware);

store.subscribe(() => {
    console.log("Store changed", store.getState());
})

// using redux promise middleware
store.dispatch({
    type: "FETCH_USERS",
    payload: axios.get("https://jsonplaceholder.typicode.com/users")
});

// without using redux promise middleware
// store.dispatch((dispatch) => {
//     dispatch({type: "FETCH_USERS_PENDING"})
//     axios.get("https://jsonplaceholder.typicode.com/users")
//         .then((response) => {
//             dispatch({type:"FETCH_USERS_FULFILLED", payload: response})
//         })
//         .catch((err) =>{
//             dispatch({type: "FETCH_USERS_REJECTED", payload: err})
//         })
// });
