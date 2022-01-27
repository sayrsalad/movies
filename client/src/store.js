import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { moviesReducer, newMovieReducer, movieReducer, movieDetailsReducer, newMovieReviewReducer } from './reducers/movieReducers';
import { actorsReducer, newActorReducer, actorReducer, actorDetailsReducer, newActorReviewReducer } from './reducers/actorReducers';
import { producersReducer, newProducerReducer, producerReducer, producerDetailsReducer, newProducerReviewReducer } from './reducers/producerReducers';

import { authReducer, allUsersReducer } from './reducers/authReducers';

const reducer = combineReducers({
    movies: moviesReducer,
    newMovie: newMovieReducer,
    movie: movieReducer,
    movieDetails: movieDetailsReducer,
    newMovieReview: newMovieReviewReducer,

    actors: actorsReducer,
    newActor: newActorReducer,
    actor: actorReducer,
    actorDetails: actorDetailsReducer,
    newActorReview: newActorReviewReducer,

    producers: producersReducer,
    newProducer: newProducerReducer,
    producer: producerReducer,
    producerDetails: producerDetailsReducer,
    newProducerReview: newProducerReviewReducer,

    auth: authReducer,
    allUsers: allUsersReducer
});

let initialState = {};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;