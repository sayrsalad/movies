import axios from 'axios';

import {
    ALL_ACTORS_REQUEST,
    ALL_ACTORS_SUCCESS,
    ALL_ACTORS_FAIL,
    ACTOR_DETAILS_REQUEST,
    ACTOR_DETAILS_SUCCESS,
    ACTOR_DETAILS_FAIL,
    NEW_ACTOR_REVIEW_REQUEST,
    NEW_ACTOR_REVIEW_SUCCESS,
    NEW_ACTOR_REVIEW_FAIL,
    CLEAR_ERRORS
} from '../constants/actorConstants';

export const getActors = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {

        dispatch({ type: ALL_ACTORS_REQUEST });

        const { data } = await axios.get(`/api/actor?keyword=${keyword}&page=${currentPage}`);
        
        dispatch({
            type: ALL_ACTORS_SUCCESS,
            payload: data
        })
  
    } catch (error) {
        dispatch({
            type: ALL_ACTORS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getActorDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ACTOR_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/actor/${id}`);

        dispatch({
            type: ACTOR_DETAILS_SUCCESS,
            payload: data.actor
        })
  
    } catch (error) {
        dispatch({
            type: ACTOR_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newActorReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_ACTOR_REVIEW_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/actor/review`, reviewData, config);

        dispatch({
            type: NEW_ACTOR_REVIEW_SUCCESS,
            payload: data.success
        })
  
    } catch (error) {
        dispatch({
            type: NEW_ACTOR_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
