import * as types from './types';

export function createAttendeeRequest(payload) {
    return {
        type: types.CREATE_ATTENDEE.REQUEST,
        payload,
    }
}

export function createAttendeeSuccess(response) {
    return {
        type: types.CREATE_ATTENDEE.SUCCESS,
        response,
    }
}

export function createAttendeeFailure(err) {
    return {
        type: types.CREATE_ATTENDEE.FAILURE,
        err,
    }
}

export function updateAttendeeRequest(payload) {
    return {
        type: types.UPDATE_ATTENDEE.REQUEST,
        payload,
    }
}

export function updateAttendeeSuccess(response) {
    return {
        type: types.UPDATE_ATTENDEE.SUCCESS,
        response,
    }
}

export function updateAttendeeFailure(err) {
    return {
        type: types.UPDATE_ATTENDEE.FAILURE,
        err,
    }
}

export function deleteAttendeeRequest(payload) {
    return {
        type: types.DELETE_ATTENDEE.REQUEST,
        payload,
    }
}

export function deleteAttendeeSuccess(response) {
    return {
        type: types.DELETE_ATTENDEE.SUCCESS,
        response,
    }
}

export function deleteAttendeeFailure(err) {
    return {
        type: types.DELETE_ATTENDEE.FAILURE,
        err,
    }
}

export function getAttendeeRequest(payload) {
  return {
      type: types.GET_ATTENDEE.REQUEST,
      payload,
  }
}

export function getAttendeeSuccess(response) {
  return {
      type: types.GET_ATTENDEE.SUCCESS,
      response,
  }
}

export function getAttendeeFailure(err) {
  return {
      type: types.GET_ATTENDEE.FAILURE,
      err,
  }
}

export function getAttendeesRequest(payload) {
  return {
      type: types.GET_ATTENDEES.REQUEST,
      payload,
  }
}

export function getAttendeesSuccess(response) {
  return {
      type: types.GET_ATTENDEES.SUCCESS,
      response,
  }
}

export function getAttendeesFailure(err) {
  return {
      type: types.GET_ATTENDEES.FAILURE,
      err,
  }
}
