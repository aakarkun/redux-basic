import { combineReducers, createStore } from 'redux';

const userReducer = (state={}, action) => {
    switch (action.type) {
        case "CHANGE_NAME": {
            state = {...state, name: action.payload}
            break;
        }
        case "CHANGE_AGE": {
            state = {...state, age: action.payload}
            break;
        }
    }
    return state;
};

const tweetsReducer = (state=[], action) => {
    return state;
}

const reducers = combineReducers({
    user: userReducer,
    tweets: tweetsReducer
})

const store = createStore(reducers);

store.subscribe(() => {
    console.log("Store changed", store.getState());
})

store.dispatch({type: "CHANGE_NAME", payload: "Kus"});
store.dispatch({type: "CHANGE_AGE", payload: 21});
store.dispatch({type: "CHANGE_AGE", payload: 22});