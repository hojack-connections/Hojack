import * as types from '../actions/types';
import _ from 'lodash';

const initialState = {
    isCreating: false,
    isFetching: false,
    error: '',
    created: false,
    attendees: [],
    eventAttendees: {},
}

export default function attendee(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_ATTENDEES:
            return {
                ...state,
                eventAttendees: {
                  ...state.eventAttendees,
                  ...action.payload,
                }
            }
        case types.REMOVE_ATTENDEE:
            let tempAttendees = state.attendees.splice(0);
            tempAttendees.splice(action.payload.attendeeIndex, 1);
            let tempAttendee = {};
            let cloneEventAttendees = state.eventAttendees[action.payload.event] ? state.eventAttendees[action.payload.event].slice(0) : [];
            cloneEventAttendees.splice(action.payload.attendee, 1);
            tempAttendee[action.payload.event] = cloneEventAttendees;
            return {
                ...state,
                attendees: tempAttendees,
                eventAttendees: {
                  ...state.eventAttendees,
                  ...tempAttendee,
                }
            }
        case types.REMOVE_EVENT:
            let updated = state.attendees.splice(0);
            _.remove(updated, obj => obj.event._id === action.payload.id);
            return {
              ...state,
              attendees: updated,
            }
        case types.CREATE_ATTENDEE.REQUEST:
            return {
                ...state,
                isCreating: true,
                created: false,
                error: '',
            }
        case types.CREATE_ATTENDEE.SUCCESS:
            let attendees = state.attendees.slice(0);
            attendees.push(action.response);
            let newAttendee = {};
            let eventAttendees = state.eventAttendees[action.id] ? state.eventAttendees[action.id].slice(0) : [];
            eventAttendees.push(action.response);
            newAttendee[action.id] = eventAttendees;
            return {
                ...state,
                isCreating: false,
                created: true,
                attendees,
                eventAttendees: {
                  ...state.eventAttendees,
                  ...newAttendee,
                }
            }
        case types.CREATE_ATTENDEE.FAILURE:
            return {
                ...state,
                isCreating: false,
                created: false,
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
