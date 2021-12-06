import {
    ALL_MOVIES_REQUEST,
    ALL_MOVIES_SUCCESS,
    ALL_MOVIES_FAIL,
    MOVIE_DETAILS_REQUEST,
    MOVIE_DETAILS_SUCCESS,
    MOVIE_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/movieConstants';

export const moviesReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case ALL_MOVIES_REQUEST:
            return {
                loading: true,
                movies: []
            }

        case ALL_MOVIES_SUCCESS:
            return {
                loading: false,
                movies: action.payload.movies,
                moviesCount: action.payload.moviesCount,
                resPerPage: action.payload.resPerPage
            }

        case ALL_MOVIES_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const movieDetailsReducer = (state = { movie: {} }, action) => {
    switch (action.type) {
        case MOVIE_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }

        case MOVIE_DETAILS_SUCCESS:
            return {
                loading: false,
                movie: action.payload
            }

        case MOVIE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state
            }

        default:
            return state;
    }
}