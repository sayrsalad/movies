import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { moviesReducer, movieDetailsReducer } from './reducers/movieReducers';
import { authReducer } from './reducers/authReducers';

const reducer = combineReducers({
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
    auth: authReducer
});

let initialState = {};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;