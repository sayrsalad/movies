import {
    ALL_MOVIES_REQUEST,
    ALL_MOVIES_SUCCESS,
    ALL_MOVIES_FAIL,
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
                moviesCount: action.payload.moviesCount
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