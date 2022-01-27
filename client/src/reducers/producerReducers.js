import {
    ADMIN_PRODUCERS_REQUEST,
    ADMIN_PRODUCERS_SUCCESS,
    ADMIN_PRODUCERS_FAIL,
    ALL_PRODUCERS_REQUEST,
    ALL_PRODUCERS_SUCCESS,
    ALL_PRODUCERS_FAIL,
    NEW_PRODUCER_REQUEST,
    NEW_PRODUCER_RESET,
    NEW_PRODUCER_SUCCESS,
    NEW_PRODUCER_FAIL,
    DELETE_PRODUCER_REQUEST,
    DELETE_PRODUCER_RESET,
    DELETE_PRODUCER_SUCCESS,
    DELETE_PRODUCER_FAIL,
    UPDATE_PRODUCER_REQUEST,
    UPDATE_PRODUCER_RESET,
    UPDATE_PRODUCER_SUCCESS,
    UPDATE_PRODUCER_FAIL,
    PRODUCER_DETAILS_REQUEST,
    PRODUCER_DETAILS_SUCCESS,
    PRODUCER_DETAILS_FAIL,
    NEW_PRODUCER_REVIEW_REQUEST,
    NEW_PRODUCER_REVIEW_RESET,
    NEW_PRODUCER_REVIEW_SUCCESS,
    NEW_PRODUCER_REVIEW_FAIL,
    CLEAR_ERRORS

} from '../constants/producerConstants';

export const producersReducer = (state = { producers: [] }, action) => {
    switch (action.type) {
        case ADMIN_PRODUCERS_REQUEST:
        case ALL_PRODUCERS_REQUEST:
            return {
                loading: true,
                producers: []
            }

        case ADMIN_PRODUCERS_SUCCESS:
            return {
                loading: false,
                producers: action.payload
            }

        case ALL_PRODUCERS_SUCCESS:
            return {
                loading: false,
                producers: action.payload.producers,
                producersCount: action.payload.producersCount,
                filteredProducersCount: action.payload.filteredProducersCount,
                resPerPage: action.payload.resPerPage
            }
        
        case ADMIN_PRODUCERS_FAIL:
        case ALL_PRODUCERS_FAIL:
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

export const newProducerReducer = (state = { producer: {} }, action) => {
    switch (action.type) {

        case NEW_PRODUCER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_PRODUCER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                producer: action.payload.producer
            }

        case NEW_PRODUCER_FAIL:
            return {
                ...state,
                error: action.payload
            }
        
        case NEW_PRODUCER_RESET:
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

export const producerDetailsReducer = (state = { producer: {} }, action) => {
    switch (action.type) {

        case PRODUCER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PRODUCER_DETAILS_SUCCESS:
            return {
                loading: false,
                producer: action.payload
            }

        case PRODUCER_DETAILS_FAIL:
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

export const producerReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_PRODUCER_REQUEST:
        case UPDATE_PRODUCER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_PRODUCER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_PRODUCER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_PRODUCER_FAIL:
        case UPDATE_PRODUCER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_PRODUCER_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_PRODUCER_RESET:
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

export const newProducerReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_PRODUCER_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_PRODUCER_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_PRODUCER_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }
        
        case NEW_PRODUCER_REVIEW_RESET:
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

