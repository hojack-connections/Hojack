const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
    const res = {};
    [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`);
    return res;
}

// Login Actions
export const LOGIN                  = createRequestTypes('LOGIN');
export const LOGOUT                 = createRequestTypes('LOGOUT');

// Signup Actions
export const SIGNUP                 = createRequestTypes('SIGNUP');

// Event Actions
export const CREATE_EVENT           = createRequestTypes('CREATE_EVENT');
export const UPDATE_EVENT           = createRequestTypes('UPDATE_EVENT');
export const DELETE_EVENT           = createRequestTypes('DELETE_EVENT');
export const GET_EVENT              = createRequestTypes('GET_EVENT');
export const GET_EVENTS             = createRequestTypes('GET_EVENTS');
export const GET_EVENT_ATTENDEES    = createRequestTypes('GET_EVENT_ATTENDEES');
export const SUBMIT_EVENT           = createRequestTypes('SUBMIT_EVENT');

// Attendee Actions
export const ADD_ATTENDEE           = createRequestTypes('ADD_ATTENDEE');
export const UPDATE_ATTENDEE        = createRequestTypes('UPDATE_ATTENDEE');
export const DELETE_ATTENDEE        = createRequestTypes('DELETE_ATTENDEE');
export const GET_ATTENDEE           = createRequestTypes('GET_ATTENDEE');
export const GET_ATTENDEES          = createRequestTypes('GET_ATTENDEES');
