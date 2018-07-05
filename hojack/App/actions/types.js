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
export const GET_EVENT              = createRequestTypes('GET_EVENT');
export const GET_EVENTS             = createRequestTypes('GET_EVENTS');
export const REMOVE_EVENT           = 'REMOVE_EVENT';
export const UPDATE_EVENT           = 'UPDATE_EVENT';
export const MARK_EVENT_SUBMITTED   = 'MARK_EVENT_SUBMITTED';

// Attendee Actions
export const LOAD_ATTENDEES         = 'LOAD_ATTENDEES';
export const REMOVE_ATTENDEE        = 'REMOVE_ATTENDEE';
export const UPDATE_ATTENDEE        = 'UPDATE_ATTENDEE';
export const CREATE_ATTENDEE        = createRequestTypes('CREATE_ATTENDEE');
export const GET_ATTENDEE           = createRequestTypes('GET_ATTENDEE');
export const GET_ATTENDEES          = createRequestTypes('GET_ATTENDEES');

// Settings Actions
export const ADD_CERT_RECEIVER      = 'ADD_CERT_RECEIVER';
export const REMOVE_CERT_RECEIVER   = 'REMOVE_CERT_RECEIVER';
export const ADD_SHEET_RECEIVER     = 'ADD_SHEET_RECEIVER';
export const REMOVE_SHEET_RECEIVER  = 'REMOVE_SHEET_RECEIVER';
