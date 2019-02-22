import React from 'react';
import { take, takeLatest, put, fork, call } from 'redux-saga/effects';
import * as types from '../actions/types';
import {
  createEventSuccess,
  createEventFailure,
  getEventSuccess,
  getEventFailure,
  getEventsSuccess,
  getEventsFailure,
} from '../actions/eventActions';
import axios from 'axios';
import API_BASE_URL from './config';

function createEvent(payload) {
  return axios
    .post(API_BASE_URL.event, payload)
    .then((response) => {
      console.log('create_event response = ', response);
      return response;
    })
    .catch((error) => {
      console.log('create_event error = ', error.response);
      throw error.response;
    });
}

function getAllEvents(payload) {
  return axios
    .get(API_BASE_URL.event, { params: { token: payload.token } })
    .then((response) => {
      console.log('get_all_events response = ', response);
      return response;
    })
    .catch((error) => {
      console.log('get_all_events response = ', error.response);
      throw error.response;
    });
}

function getEvent(payload) {
  return axios
    .get(API_BASE_URL.event + '/' + payload.id, {
      params: { token: payload.token },
    })
    .then((response) => {
      console.log('get_event response = ', response);
      return response;
    })
    .catch((error) => {
      console.log('get_event response = ', error.response);
      throw error.response;
    });
}

function* createEventRequestWorker(action) {
  try {
    const response = yield call(createEvent, action.payload);
    console.log('SAGA CREATE_EVENT SUCCESS: ', response.data);
    yield put(createEventSuccess(response.data));
  } catch (err) {
    console.log('SAGA CREATE_EVENT FAILURE: ', err);
    yield put(createEventFailure(err));
  }
}

function* getEventsRequestWorker(action) {
  try {
    const response = yield call(getAllEvents, action.payload);
    console.log('SAGA GET_EVENTS SUCCESS: ', response.data);
    yield put(getEventsSuccess(response.data));
  } catch (err) {
    console.log('SAGA GET_EVENTS FAILURE: ', err);
    yield put(getEventsFailure(err));
  }
}

function* getEventRequestWorker(action) {
  try {
    const response = yield call(getEvent, action.payload);
    console.log('SAGA GET_EVENT SUCCESS: ', response.data);
    yield put(getEventSuccess(response.data));
  } catch (err) {
    console.log('SAGA GET_EVENT FAILURE: ', err);
    yield put(getEventFailure(err));
  }
}

const createEventRequestWatcher = function* createEventRequestWatcher() {
  yield takeLatest(types.CREATE_EVENT.REQUEST, createEventRequestWorker);
};

const getEventsRequestWatcher = function* getEventsRequestWatcher() {
  yield takeLatest(types.GET_EVENTS.REQUEST, getEventsRequestWorker);
};

const getEventRequestWatcher = function* getEventRequestWatcher() {
  yield takeLatest(types.GET_EVENT.REQUEST, getEventRequestWorker);
};

export default [
  fork(createEventRequestWatcher),
  fork(getEventsRequestWatcher),
  fork(getEventRequestWatcher),
];
