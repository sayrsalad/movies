import {
    ADMIN_ACTORS_REQUEST,
    ADMIN_ACTORS_SUCCESS,
    ADMIN_ACTORS_FAIL,
    ALL_ACTORS_REQUEST,
    ALL_ACTORS_SUCCESS,
    ALL_ACTORS_FAIL,
    NEW_ACTOR_REQUEST,
    NEW_ACTOR_RESET,
    NEW_ACTOR_SUCCESS,
    NEW_ACTOR_FAIL,
    ACTOR_DETAILS_REQUEST,
    ACTOR_DETAILS_SUCCESS,
    ACTOR_DETAILS_FAIL,
    NEW_ACTOR_REVIEW_REQUEST,
    NEW_ACTOR_REVIEW_SUCCESS,
    NEW_ACTOR_REVIEW_FAIL,
    DELETE_ACTOR_REQUEST,
    DELETE_ACTOR_RESET,
    DELETE_ACTOR_SUCCESS,
    DELETE_ACTOR_FAIL,
    UPDATE_ACTOR_REQUEST,
    UPDATE_ACTOR_RESET,
    UPDATE_ACTOR_SUCCESS,
    UPDATE_ACTOR_FAIL,
    NEW_ACTOR_REVIEW_RESET,
    CLEAR_ERRORS

} from '../constants/actorConstants';

export const actorsReducer = (state = { actors: [] }, action) => {
    switch (action.type) {
        case ADMIN_ACTORS_REQUEST:
        case ALL_ACTORS_REQUEST:
            return {
                loading: true,
                actors: []
            }

        case ADMIN_ACTORS_SUCCESS:
            return {
                loading: false,
                actors: action.payload
            }

        case ALL_ACTORS_SUCCESS:
            return {
                loading: false,
                actors: action.payload.actors,
                actorsCount: action.payload.actorsCount,
                resPerPage: action.payload.resPerPage
            }

        case ADMIN_ACTORS_FAIL:
        case ALL_ACTORS_FAIL:
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

export const newActorReducer = (state = { actor: {} }, action) => {
    switch (action.type) {

        case NEW_ACTOR_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_ACTOR_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                actor: action.payload.actor
            }

        case NEW_ACTOR_FAIL:
            return {
                ...state,
                error: action.payload
            }
        
        case NEW_ACTOR_RESET:
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

export const actorDetailsReducer = (state = { actor: {} }, action) => {
    switch (action.type) {
        case ACTOR_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }

        case ACTOR_DETAILS_SUCCESS:
            return {
                loading: false,
                actor: action.payload
            }

        case ACTOR_DETAILS_FAIL:
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

export const actorReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_ACTOR_REQUEST:
        case UPDATE_ACTOR_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_ACTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_ACTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_ACTOR_FAIL:
        case UPDATE_ACTOR_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_ACTOR_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_ACTOR_RESET:
            return {
                ...state,
                isUpdated: false
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

export const newActorReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_ACTOR_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_ACTOR_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_ACTOR_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_ACTOR_REVIEW_RESET:
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