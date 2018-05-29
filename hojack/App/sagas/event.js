import React from 'react';
import { take, takeLatest, put, fork, call } from 'redux-saga/effects';
import * as types from '../actions/types';
import { 
    createEventSuccess, 
    createEventFailure,
    updateEventSuccess,
    updateEventFailure,
    deleteEventSuccess,
    deleteEventFailure,
    getEventSuccess,
    getEventFailure,
    getEventsSuccess,
    getEventsFailure,
    getEventAttendeesSuccess,
    getEventAttendeesFailure,
} from '../actions/eventActions';
import axios from 'axios';

const BASE_URL = 'http://localhost:7001/api/events';

function create_event(payload) {
    return axios.post(BASE_URL, payload)
    .then(response => {
        console.log('create_event response = ', response);
        return response;
    })
    .catch(error => {
        console.log('create_event error = ', error.response);
        throw error.response;
    });
}

function update_event(payload) {
    return axios.put(BASE_URL + '/' + payload.id)
    .then(response => {
        console.log('update_event response = ', response);
        return response;
    })
    .catch(error => {
        console.log('update_event response = ', error.response);
        throw error.response;
    });
}

function delete_event(payload) {
    return axios.post(BASE_URL + '/' + payload.id)
    .then(response => {
        console.log('delete_event response = ', response);
        return response;
    })
    .catch(error => {
        console.log('delete_event response = ', error.response);
        throw error.response;
    });
}

function get_all_events(payload) {
    return axios.get(BASE_URL)
    .then(response => {
        console.log('get_all_events response = ', response);
        return response;
    })
    .catch(error => {
        console.log('get_all_events response = ', error.response);
        throw error.response;
    });
}

function get_event(payload) {
    return axios.get(BASE_URL + '/' + payload.id)
    .then(response => {
        console.log('get_event response = ', response);
        return response;
    })
    .catch(error => {
        console.log('get_event response = ', error.response);
        throw error.response;
    });
}

function get_event_attendees(payload) {
    return axios.get(BASE_URL + '/' + payload.id + '/attendees')
    .then(response => {
        console.log('get_event_attendees response = ', response);
        return response;
    })
    .catch(error => {
        console.log('get_event_attendees response = ', error.response);
        throw error.response;
    });
}

function* createEventRequestWorker(action) {
    try {
        const response = yield call(create_event, action.payload);
        console.log('SAGA CREATE_EVENT SUCCESS: ', response.data);
        yield put(createEventSuccess(response.data));
    } catch(err) {
        console.log('SAGA CREATE_EVENT FAILURE: ', err);
        yield put(createEventFailure(err));
    }
}

function* updateEventRequestWorker(action) {
    try {
        const response = yield call(update_event, action.payload);
        console.log('SAGA UPDATE_EVENT SUCCESS: ', response.data);
        yield put(updateEventSuccess(response.data));
    } catch(err) {
        console.log('SAGA UPDATE_EVENT FAILURE: ', err);
        yield put(updateEventFailure(err));
    }
}

function* deleteEventRequestWorker(action) {
    try {
        const response = yield call(delete_event, action.payload);
        console.log('SAGA DELETE_EVENT SUCCESS: ', response.data);
        yield put(deleteEventSuccess(response.data));
    } catch(err) {
        console.log('SAGA DELETE_EVENT FAILURE: ', err);
        yield put(deleteEventFailure(err));
    }
}

function* getEventsRequestWorker(action) {
    try {
        const response = yield call(get_all_events, action.payload);
        console.log('SAGA GET_EVENTS SUCCESS: ', response.data);
        yield put(getEventsSuccess(response.data));
    } catch(err) {
        console.log('SAGA GET_EVENTS FAILURE: ', err);
        yield put(getEventsFailure(err));
    }
}

function* getEventRequestWorker(action) {
    try {
        const response = yield call(get_event, action.payload);
        console.log('SAGA GET_EVENT SUCCESS: ', response.data);
        yield put(getEventSuccess(response.data));
    } catch(err) {
        console.log('SAGA GET_EVENT FAILURE: ', err);
        yield put(getEventFailure(err));
    }
}

function* getEventAttendeesRequestWorker(action) {
    try {
        const response = yield call(get_event_attendees, action.payload);
        console.log('SAGA GET_EVENT_ATTENDEES SUCCESS: ', response.data);
        yield put(getEventAttendeesSuccess(response.data));
    } catch(err) {
        console.log('SAGA GET_EVENT_ATTENDEES FAILURE: ', err);
        yield put(getEventAttendeesFailure(err));
    }
}

const createEventRequestWatcher = function* createEventRequestWatcher() {
    yield takeLatest(types.CREATE_EVENT.REQUEST, createEventRequestWorker);
}

const updateEventRequestWatcher = function* updateEventRequestWatcher() {
    yield takeLatest(types.UPDATE_EVENT.REQUEST, updateEventRequestWorker);
}

const deleteEventRequestWatcher = function* deleteEventRequestWatcher() {
    yield takeLatest(types.DELETE_EVENT.REQUEST, deleteEventRequestWorker);
}

const getEventsRequestWatcher = function* getEventsRequestWatcher() {
    yield takeLatest(types.GET_EVENTS.REQUEST, getEventsRequestWorker);
}

const getEventRequestWatcher = function* getEventRequestWatcher() {
    yield takeLatest(types.GET_EVENT.REQUEST, getEventRequestWorker);
}

const getEventAttendeesRequestWatcher = function* getEventAttendeesRequestWatcher() {
    yield takeLatest(types.GET_EVENT_ATTENDEES.REQUEST, getEventAttendeesRequestWorker);
}

export default [
    fork(createEventRequestWatcher),
    fork(updateEventRequestWatcher),
    fork(deleteEventRequestWatcher),
    fork(getEventsRequestWatcher),
    fork(getEventRequestWatcher),
    fork(getEventAttendeesRequestWatcher),
]
