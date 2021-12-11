import {
    ADMIN_MOVIES_REQUEST,
    ADMIN_MOVIES_SUCCESS,
    ADMIN_MOVIES_FAIL,
    ALL_MOVIES_REQUEST,
    ALL_MOVIES_SUCCESS,
    ALL_MOVIES_FAIL,
    MOVIE_DETAILS_REQUEST,
    MOVIE_DETAILS_SUCCESS,
    MOVIE_DETAILS_FAIL,
    NEW_MOVIE_REVIEW_REQUEST,
    NEW_MOVIE_REVIEW_RESET,
    NEW_MOVIE_REVIEW_SUCCESS,
    NEW_MOVIE_REVIEW_FAIL,
    CLEAR_ERRORS

} from '../constants/movieConstants';

export const moviesReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case ADMIN_MOVIES_REQUEST:
        case ALL_MOVIES_REQUEST:
            return {
                loading: true,
                movies: []
            }

        case ADMIN_MOVIES_SUCCESS:
            return {
                loading: false,
                movies: action.payload
            }

        case ALL_MOVIES_SUCCESS:
            return {
                loading: false,
                movies: action.payload.movies,
                moviesCount: action.payload.moviesCount,
                filteredMoviesCount: action.payload.filteredMoviesCount,
                resPerPage: action.payload.resPerPage
            }
        
        case ADMIN_MOVIES_FAIL:
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
                ...state,
                loading: true
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
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const newMovieReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_MOVIE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_MOVIE_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_MOVIE_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }
        
        case NEW_MOVIE_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}