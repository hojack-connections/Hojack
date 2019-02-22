import * as types from './types';

export function createEventRequest(payload) {
  return {
    type: types.CREATE_EVENT.REQUEST,
    payload,
  };
}

export function createEventSuccess(response) {
  return {
    type: types.CREATE_EVENT.SUCCESS,
    response,
  };
}

export function createEventFailure(err) {
  return {
    type: types.CREATE_EVENT.FAILURE,
    err,
  };
}

export function getEventRequest(payload) {
  return {
    type: types.GET_EVENT.REQUEST,
    payload,
  };
}

export function getEventSuccess(response) {
  return {
    type: types.GET_EVENT.SUCCESS,
    response,
  };
}

export function getEventFailure(err) {
  return {
    type: types.GET_EVENT.FAILURE,
    err,
  };
}

export function getEventsRequest(payload) {
  return {
    type: types.GET_EVENTS.REQUEST,
    payload,
  };
}

export function getEventsSuccess(response) {
  return {
    type: types.GET_EVENTS.SUCCESS,
    response,
  };
}

export function getEventsFailure(err) {
  return {
    type: types.GET_EVENTS.FAILURE,
    err,
  };
}

export function removeEvent(payload) {
  return {
    type: types.REMOVE_EVENT,
    payload,
  };
}

export function updateEvent(payload) {
  return {
    type: types.UPDATE_EVENT,
    payload,
  };
}

export function markEventAsSubmitted(payload) {
  return {
    type: types.MARK_EVENT_SUBMITTED,
    payload,
  };
}
