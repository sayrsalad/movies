import axios from 'axios';

import {
    ADMIN_MOVIES_REQUEST,
    ADMIN_MOVIES_SUCCESS,
    ADMIN_MOVIES_FAIL,
    ALL_MOVIES_REQUEST,
    ALL_MOVIES_SUCCESS,
    ALL_MOVIES_FAIL,
    NEW_MOVIE_REQUEST,
    // NEW_MOVIE_RESET,
    NEW_MOVIE_SUCCESS,
    NEW_MOVIE_FAIL,
    MOVIE_DETAILS_REQUEST,
    MOVIE_DETAILS_SUCCESS,
    MOVIE_DETAILS_FAIL,
    NEW_MOVIE_REVIEW_REQUEST,
    // NEW_MOVIE_REVIEW_RESET,
    NEW_MOVIE_REVIEW_SUCCESS,
    NEW_MOVIE_REVIEW_FAIL,
    UPDATE_MOVIE_REQUEST,
    UPDATE_MOVIE_SUCCESS,
    UPDATE_MOVIE_FAIL,
    DELETE_MOVIE_REQUEST,
    DELETE_MOVIE_SUCCESS,
    DELETE_MOVIE_FAIL,
    CLEAR_ERRORS
} from '../constants/movieConstants';

export const getMovies = (keyword = '', currentPage = 1, gte, lt, ratings = 0) => async (dispatch) => {
    try {

        dispatch({ type: ALL_MOVIES_REQUEST });

        const { data } = await axios.get(`/api/movies?keyword=${keyword}&page=${currentPage}&releaseDate[gte]=${gte}&releaseDate[lt]=${lt}&ratings[gte]=${ratings}`);

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

export const newMovie = (movieData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_MOVIE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/movie/add`, movieData, config);

        dispatch({
            type: NEW_MOVIE_SUCCESS,
            payload: data
        });
  
    } catch (error) {
        dispatch({
            type: NEW_MOVIE_FAIL,
            payload: error.response.data.message
        });
    }
}

export const updateMovie = (id, movieData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_MOVIE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/movie/update/${id}`, movieData, config);

        dispatch({
            type: UPDATE_MOVIE_SUCCESS,
            payload: data.success
        });
  
    } catch (error) {
        dispatch({
            type: UPDATE_MOVIE_FAIL,
            payload: error.response.data.message
        });
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

        const { data } = await axios.get(`/api/admin/movies`)

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

export const deleteMovie = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_MOVIE_REQUEST });

        const { data } = await axios.delete(`/api/admin/movie/${id}`);

        dispatch({
            type: DELETE_MOVIE_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: DELETE_MOVIE_FAIL,
            payload: error.response.data.message
        });
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
