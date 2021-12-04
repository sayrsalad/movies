import axios from 'axios';

import {
    ALL_MOVIES_REQUEST,
    ALL_MOVIES_SUCCESS,
    ALL_MOVIES_FAIL,
    CLEAR_ERRORS
} from '../constants/movieConstants';

export const getMovies = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_MOVIES_REQUEST });

        const { data } = await axios.get('/api/movie');

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

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}