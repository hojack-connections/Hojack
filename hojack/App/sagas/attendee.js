import React from 'react';
import { take, takeLatest, put, fork, call } from 'redux-saga/effects';
import * as types from '../actions/types';
import { 
    createAttendeeSuccess, 
    createAttendeeFailure,
    updateAttendeeSuccess,
    updateAttendeeFailure,
    deleteAttendeeSuccess,
    deleteAttendeeFailure,
    getAttendeesSuccess,
    getAttendeesFailure,
    getAttendeeSuccess,
    getAttendeeFailure,
} from '../actions/attendeeActions';
import axios from 'axios';

const BASE_URL = 'http://localhost:7001/api/attendees';

function create_attendee(payload) {
    return axios.post(BASE_URL, payload)
    .then(response => {
        console.log('create_attendee response = ', response);
        return response;
    })
    .catch(error => {
        console.log('create_attendee error = ', error.response);
        throw error.response;
    });
}

function update_attendee(payload) {
    return axios.put(BASE_URL + '/' + payload.id)
    .then(response => {
        console.log('update_attendee response = ', response);
        return response;
    })
    .catch(error => {
        console.log('update_attendee response = ', error.response);
        throw error.response;
    });
}

function delete_attendee(payload) {
    return axios.post(BASE_URL + '/' + payload.id)
    .then(response => {
        console.log('delete_attendee response = ', response);
        return response;
    })
    .catch(error => {
        console.log('delete_attendee response = ', error.response);
        throw error.response;
    });
}

function get_all_attendees(payload) {
  return axios.get(BASE_URL)
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
  return axios.get(BASE_URL + '/' + payload.id)
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
        yield put(createAttendeeSuccess(response.data));
    } catch(err) {
        console.log('SAGA CREATE_ATTENDEE FAILURE: ', err);
        yield put(createAttendeeFailure(err));
    }
}

function* updateAttendeeRequestWorker(action) {
    try {
        const response = yield call(update_attendee, action.payload);
        console.log('SAGA UPDATE_ATTENDEE SUCCESS: ', response.data);
        yield put(updateAttendeeSuccess(response.data));
    } catch(err) {
        console.log('SAGA UPDATE_ATTENDEE FAILURE: ', err);
        yield put(updateAttendeeFailure(err));
    }
}

function* deleteAttendeeRequestWorker(action) {
    try {
        const response = yield call(delete_attendee, action.payload);
        console.log('SAGA DELETE_ATTENDEE SUCCESS: ', response.data);
        yield put(deleteAttendeeSuccess(response.data));
    } catch(err) {
        console.log('SAGA DELETE_ATTENDEE FAILURE: ', err);
        yield put(deleteAttendeeFailure(err));
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

const updateAttendeeRequestWatcher = function* updateAttendeeRequestWatcher() {
    yield takeLatest(types.UPDATE_ATTENDEE.REQUEST, updateAttendeeRequestWorker);
}

const deleteAttendeeRequestWatcher = function* deleteAttendeeRequestWatcher() {
    yield takeLatest(types.DELETE_ATTENDEE.REQUEST, deleteAttendeeRequestWorker);
}

const getAttendeesRequestWatcher = function* getAttendeesRequestWatcher() {
  yield takeLatest(types.GET_ATTENDEES.REQUEST, getAttendeesRequestWorker);
}

const getAttendeeRequestWatcher = function* getAttendeeRequestWatcher() {
  yield takeLatest(types.GET_ATTENDEE.REQUEST, getAttendeeRequestWorker);
}

export default [
    fork(createAttendeeRequestWatcher),
    fork(updateAttendeeRequestWatcher),
    fork(deleteAttendeeRequestWatcher),
    fork(getAttendeesRequestWatcher),
    fork(getAttendeeRequestWatcher),
]
