import * as types from '../actions/types';

const initialState = {
    isCreating: false,
    isFetching: false,
    error: '',
    created: false,
    events: [],
}

export default function event(state = initialState, action) {
    switch (action.type) {
        case types.REMOVE_EVENT:
            let newEvent = state.events.slice(0);
            newEvent.splice(action.payload.index, 1);
            return {
                ...state,
                events: newEvent,
            }
        case types.CREATE_EVENT.REQUEST:
            return {
                ...state,
                isCreating: true,
                created: false,
                error: '',
            }
        case types.CREATE_EVENT.SUCCESS:
            let events = state.events ? state.events.slice(0) : [];
            events.push(action.response)
            return {
                ...state,
                isCreating: false,
                created: true,
                events,
            }
        case types.CREATE_EVENT.FAILURE:
            return {
                ...state,
                isCreating: false,
                created: false,
                error: action.err,
            }
        case types.GET_EVENTS.REQUEST:
            return {
                ...state,
                isFetching: true,
                error: '',
            }
        case types.GET_EVENTS.SUCCESS:
            return {
                ...state,
                isFetching: false,
                events: action.response,
            }
        case types.GET_EVENTS.FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.err,
            }
        default:
            return state;
    }
}
