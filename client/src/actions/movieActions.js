import axios from 'axios';

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
    // NEW_MOVIE_REVIEW_RESET,
    NEW_MOVIE_REVIEW_SUCCESS,
    NEW_MOVIE_REVIEW_FAIL,
    CLEAR_ERRORS
} from '../constants/movieConstants';

export const getMovies = (keyword = '', currentPage = 1, gte, lt, ratings = 0) => async (dispatch) => {
    try {

        dispatch({ type: ALL_MOVIES_REQUEST });

        const { data } = await axios.get(`/api/movie?keyword=${keyword}&page=${currentPage}&releaseDate[gte]=${gte}&releaseDate[lt]=${lt}&ratings[gte]=${ratings}`);

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

export const newMovieReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_MOVIE_REVIEW_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/movie/review`, reviewData, config);

        dispatch({
            type: NEW_MOVIE_REVIEW_SUCCESS,
            payload: data.success
        })
  
    } catch (error) {
        dispatch({
            type: NEW_MOVIE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminMovies = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_MOVIES_REQUEST })

        const { data } = await axios.get(`/api/movie/admin`)

        dispatch({
            type: ADMIN_MOVIES_SUCCESS,
            payload: data.movies
        })

    } catch (error) {

        dispatch({
            type: ADMIN_MOVIES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
