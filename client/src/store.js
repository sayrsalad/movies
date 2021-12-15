import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { moviesReducer, movieDetailsReducer, newMovieReviewReducer } from './reducers/movieReducers';
import { actorsReducer, actorDetailsReducer, newActorReviewReducer } from './reducers/actorReducers';

import { authReducer, allUsersReducer } from './reducers/authReducers';

const reducer = combineReducers({
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
    newMovieReview: newMovieReviewReducer,

    actors: actorsReducer,
    actorDetails: actorDetailsReducer,
    newActorReview: newActorReviewReducer,

    auth: authReducer,
    allUsers: allUsersReducer
});

let initialState = {};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;