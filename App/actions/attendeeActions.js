import * as types from './types';

export function loadAttendees(payload) {
  return {
    type: types.LOAD_ATTENDEES,
    payload,
  };
}

export function removeAttendee(payload) {
  return {
    type: types.REMOVE_ATTENDEE,
    payload,
  };
}

export function updateAttendee(payload) {
  return {
    type: types.UPDATE_ATTENDEE,
    payload,
  };
}

export function createAttendeeRequest(payload) {
  return {
    type: types.CREATE_ATTENDEE.REQUEST,
    payload,
  };
}

export function createAttendeeSuccess(id, response) {
  return {
    type: types.CREATE_ATTENDEE.SUCCESS,
    id,
    response,
  };
}

export function createAttendeeFailure(err) {
  return {
    type: types.CREATE_ATTENDEE.FAILURE,
    err,
  };
}

export function getAttendeeRequest(payload) {
  return {
    type: types.GET_ATTENDEE.REQUEST,
    payload,
  };
}

export function getAttendeeSuccess(response) {
  return {
    type: types.GET_ATTENDEE.SUCCESS,
    response,
  };
}

export function getAttendeeFailure(err) {
  return {
    type: types.GET_ATTENDEE.FAILURE,
    err,
  };
}

export function getAttendeesRequest(payload) {
  return {
    type: types.GET_ATTENDEES.REQUEST,
    payload,
  };
}

export function getAttendeesSuccess(response) {
  return {
    type: types.GET_ATTENDEES.SUCCESS,
    response,
  };
}

export function getAttendeesFailure(err) {
  return {
    type: types.GET_ATTENDEES.FAILURE,
    err,
  };
}
