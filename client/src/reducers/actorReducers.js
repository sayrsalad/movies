import {
    ALL_ACTORS_REQUEST,
    ALL_ACTORS_SUCCESS,
    ALL_ACTORS_FAIL,
    ACTOR_DETAILS_REQUEST,
    ACTOR_DETAILS_SUCCESS,
    ACTOR_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/actorConstants';

export const actorsReducer = (state = { actors: [] }, action) => {
    switch (action.type) {
        case ALL_ACTORS_REQUEST:
            return {
                loading: true,
                actors: []
            }

        case ALL_ACTORS_SUCCESS:
            return {
                loading: false,
                actors: action.payload.actors,
                actorsCount: action.payload.actorsCount,
                resPerPage: action.payload.resPerPage
            }

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