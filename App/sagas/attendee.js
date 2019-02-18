import React from 'react';
import { take, takeLatest, put, fork, call } from 'redux-saga/effects';
import * as types from '../actions/types';
import { 
    createAttendeeSuccess, 
    createAttendeeFailure,
    getAttendeesSuccess,
    getAttendeesFailure,
    getAttendeeSuccess,
    getAttendeeFailure,
} from '../actions/attendeeActions';
import axios from 'axios';
import API_BASE_URL from './config';

function create_attendee(payload) {
    return axios.post(API_BASE_URL.attendee, payload)
    .then(response => {
        console.log('create_attendee response = ', response);
        return response;
    })
    .catch(error => {
        console.log('create_attendee error = ', error.response);
        throw error.response;
    });
}

function get_all_attendees(payload) {
  return axios.get(API_BASE_URL.attendee, { params: {token: payload.token} })
  .then(response => {
      console.log('get_all_attendees response = ', response);
      return response;
  })
  .catch(error => {
      console.log('get_attendees response = ', error.response);
      throw error.response;
  });
}

function get_attendee(payload) {
  return axios.get(API_BASE_URL.attendee + '/' + payload.id, { params: {token: payload.token} })
  .then(response => {
      console.log('get_attendee response = ', response);
      return response;
  })
  .catch(error => {
      console.log('get_attendee response = ', error.response);
      throw error.response;
  });
}

function* createAttendeeRequestWorker(action) {
    try {
        const response = yield call(create_attendee, action.payload);
        console.log('SAGA CREATE_ATTENDEE SUCCESS: ', response.data);
        yield put(createAttendeeSuccess(action.payload.event, response.data));
    } catch(err) {
        console.log('SAGA CREATE_ATTENDEE FAILURE: ', err);
        yield put(createAttendeeFailure(err));
    }
}

function* getAttendeesRequestWorker(action) {
  try {
      const response = yield call(get_all_attendees, action.payload);
      console.log('SAGA GET_ATTENDEES SUCCESS: ', response.data);
      yield put(getAttendeesSuccess(response.data));
  } catch(err) {
      console.log('SAGA GET_ATTENDEES FAILURE: ', err);
      yield put(getAttendeesFailure(err));
  }
}

function* getAttendeeRequestWorker(action) {
  try {
      const response = yield call(get_attendee, action.payload);
      console.log('SAGA GET_ATTENDEE SUCCESS: ', response.data);
      yield put(getAttendeeSuccess(response.data));
  } catch(err) {
      console.log('SAGA GET_ATTENDEE FAILURE: ', err);
      yield put(getAttendeeFailure(err));
  }
}

const createAttendeeRequestWatcher = function* createAttendeeRequestWatcher() {
    yield takeLatest(types.CREATE_ATTENDEE.REQUEST, createAttendeeRequestWorker);
}

const getAttendeesRequestWatcher = function* getAttendeesRequestWatcher() {
  yield takeLatest(types.GET_ATTENDEES.REQUEST, getAttendeesRequestWorker);
}

const getAttendeeRequestWatcher = function* getAttendeeRequestWatcher() {
  yield takeLatest(types.GET_ATTENDEE.REQUEST, getAttendeeRequestWorker);
}

export default [
    fork(createAttendeeRequestWatcher),
    fork(getAttendeesRequestWatcher),
    fork(getAttendeeRequestWatcher),
]
