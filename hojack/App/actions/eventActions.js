import * as types from './types';

export function createEventRequest(payload) {
    return {
        type: types.CREATE_EVENT.REQUEST,
        payload,
    }
}

export function createEventSuccess(response) {
    return {
        type: types.CREATE_EVENT.SUCCESS,
        response,
    }
}

export function createEventFailure(err) {
    return {
        type: types.CREATE_EVENT.FAILURE,
        err,
    }
}

export function updateEventRequest(payload) {
    return {
        type: types.UPDATE_EVENT.REQUEST,
        payload,
    }
}

export function updateEventSuccess(response) {
    return {
        type: types.UPDATE_EVENT.SUCCESS,
        response,
    }
}

export function updateEventFailure(err) {
    return {
        type: types.UPDATE_EVENT.FAILURE,
        err,
    }
}

export function deleteEventRequest(payload) {
    return {
        type: types.DELETE_EVENT.REQUEST,
        payload,
    }
}

export function deleteEventSuccess(response) {
    return {
        type: types.DELETE_EVENT.SUCCESS,
        response,
    }
}

export function deleteEventFailure(err) {
    return {
        type: types.DELETE_EVENT.FAILURE,
        err,
    }
}

export function getEventRequest(payload) {
    return {
        type: types.GET_EVENT.REQUEST,
        payload,
    }
}

export function getEventSuccess(response) {
    return {
        type: types.GET_EVENT.SUCCESS,
        response,
    }
}

export function getEventFailure(err) {
    return {
        type: types.GET_EVENT.FAILURE,
        err,
    }
}

export function getEventsRequest(payload) {
    return {
        type: types.GET_EVENTS.REQUEST,
        payload,
    }
}

export function getEventsSuccess(response) {
    return {
        type: types.GET_EVENTS.SUCCESS,
        response,
    }
}

export function getEventsFailure(err) {
    return {
        type: types.GET_EVENTS.FAILURE,
        err,
    }
}

export function getEventAttendeesRequest(payload) {
    return {
        type: types.GET_EVENT_ATTENDEES.REQUEST,
        payload,
    }
}

export function getEventAttendeesSuccess(response) {
    return {
        type: types.GET_EVENT_ATTENDEES.SUCCESS,
        response,
    }
}

export function getEventAttendeesFailure(err) {
    return {
        type: types.GET_EVENT_ATTENDEES.FAILURE,
        err,
    }
}
