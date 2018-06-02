import * as types from '../actions/types';

const initialState = {
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isFetching: false,
    error: '',
    created: false,
    attendee: {},
    attendees: [],
}

export default function attendee(state = initialState, action) {
    switch (action.type) {
        case types.CREATE_ATTENDEE.REQUEST:
            return {
                ...state,
                isCreating: true,
                created: false,
                error: '',
            }
        case types.CREATE_ATTENDEE.SUCCESS:
            return {
                ...state,
                isCreating: false,
                created: true,
            }
        case types.CREATE_ATTENDEE.FAILURE:
            return {
                ...state,
                isCreating: false,
                error: action.err,
            }
        case types.UPDATE_ATTENDEE.REQUEST:
            return {
                ...state,
                isUpdating: true,
                error: '',
            }
        case types.UPDATE_ATTENDEE.SUCCESS:
            return {
                ...state,
                isUpdating: false,
            }
        case types.UPDATE_ATTENDEE.FAILURE:
            return {
                ...state,
                isUpdating: false,
                error: action.err,
            }
        case types.DELETE_ATTENDEE.REQUEST:
            return {
                ...state,
                isDeleting: true,
                error: '',
            }
        case types.DELETE_ATTENDEE.SUCCESS:
            return {
                ...state,
                isDeleting: false,
            }
        case types.DELETE_ATTENDEE.FAILURE:
            return {
                ...state,
                isDeleting: false,
                error: action.err,
            }
        case types.GET_ATTENDEE.REQUEST:
            return {
                ...state,
                isFetching: true,
                error: '',
            }
        case types.GET_ATTENDEE.SUCCESS:
            return {
                ...state,
                isFetching: false,
                attendee: action.response,
            }
        case types.GET_ATTENDEE.FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.err,
            }
        case types.GET_ATTENDEES.REQUEST:
            return {
                ...state,
                isFetching: true,
                error: '',
            }
        case types.GET_ATTENDEES.SUCCESS:
            return {
                ...state,
                isFetching: false,
                attendees: action.response,
            }
        case types.GET_ATTENDEES.FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.err,
            }
        default:
            return state;
    }
}
