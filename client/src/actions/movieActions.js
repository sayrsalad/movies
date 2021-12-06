import axios from 'axios';

import {
    ALL_MOVIES_REQUEST,
    ALL_MOVIES_SUCCESS,
    ALL_MOVIES_FAIL,
    MOVIE_DETAILS_REQUEST,
    MOVIE_DETAILS_SUCCESS,
    MOVIE_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/movieConstants';

export const getMovies = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {

        dispatch({ type: ALL_MOVIES_REQUEST });

        const { data } = await axios.get(`/api/movie?keyword=${keyword}&page=${currentPage}`);

        dispatch({
            type: ALL_MOVIES_SUCCESS,
            payload: data
        })
  
    } catch (error) {
        dispatch({
            type: ALL_MOVIES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getMovieDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: MOVIE_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/movie/${id}`);

        dispatch({
            type: MOVIE_DETAILS_SUCCESS,
            payload: data.movie
        })
  
    } catch (error) {
        dispatch({
            type: MOVIE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
