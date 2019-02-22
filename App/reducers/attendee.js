import * as types from '../actions/types';
import _ from 'lodash';

const initialState = {
  isCreating: false,
  isFetching: false,
  error: '',
  created: false,
  attendees: [],
  eventAttendees: {},
};

export default function attendee(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_ATTENDEES:
      return {
        ...state,
        eventAttendees: {
          ...state.eventAttendees,
          ...action.payload,
        },
      };
    case types.UPDATE_ATTENDEE:
      const globalAttendees = state.attendees.slice(0);
      globalAttendees[action.payload.attendeeIndex] = action.payload.response;
      const tempLocalAttendee = {};
      const eventLocalAttendees = state.eventAttendees[action.payload.event]
        ? state.eventAttendees[action.payload.event].slice(0)
        : [];
      eventLocalAttendees[action.payload.attendee] = action.payload.response;
      tempLocalAttendee[action.payload.event] = eventLocalAttendees;
      return {
        ...state,
        attendees: globalAttendees,
        eventAttendees: {
          ...state.eventAttendees,
          ...tempLocalAttendee,
        },
      };
    case types.REMOVE_ATTENDEE:
      const tempAttendees = state.attendees.slice(0);
      tempAttendees.splice(action.payload.attendeeIndex, 1);
      const tempAttendee = {};
      const cloneEventAttendees = state.eventAttendees[action.payload.event]
        ? state.eventAttendees[action.payload.event].slice(0)
        : [];
      cloneEventAttendees.splice(action.payload.attendee, 1);
      tempAttendee[action.payload.event] = cloneEventAttendees;
      return {
        ...state,
        attendees: tempAttendees,
        eventAttendees: {
          ...state.eventAttendees,
          ...tempAttendee,
        },
      };
    case types.REMOVE_EVENT:
      const updated = state.attendees.slice(0);
      _.remove(updated, (obj) => obj.event._id === action.payload.id);
      return {
        ...state,
        attendees: updated,
      };
    case types.CREATE_ATTENDEE.REQUEST:
      return {
        ...state,
        isCreating: true,
        created: false,
        error: '',
      };
    case types.CREATE_ATTENDEE.SUCCESS:
      const attendees = state.attendees.slice(0);
      attendees.push(action.response);
      const newAttendee = {};
      const eventAttendees = state.eventAttendees[action.id]
        ? state.eventAttendees[action.id].slice(0)
        : [];
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
        },
      };
    case types.CREATE_ATTENDEE.FAILURE:
      return {
        ...state,
        isCreating: false,
        created: false,
        error: action.err,
      };
    case types.GET_ATTENDEE.REQUEST:
      return {
        ...state,
        isFetching: true,
        error: '',
      };
    case types.GET_ATTENDEE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        attendee: action.response,
      };
    case types.GET_ATTENDEE.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.err,
      };
    case types.GET_ATTENDEES.REQUEST:
      return {
        ...state,
        isFetching: true,
        error: '',
      };
    case types.GET_ATTENDEES.SUCCESS:
      return {
        ...state,
        isFetching: false,
        attendees: action.response,
      };
    case types.GET_ATTENDEES.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.err,
      };
    default:
      return state;
  }
}
