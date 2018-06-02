import React from 'react';
import { AsyncStorage } from 'react-native';
import { take, takeLatest, put, fork, call } from 'redux-saga/effects';
import * as types from '../actions/types';
import { 
    loginSuccess, 
    loginFailure,
    signupSuccess,
    signupFailure,
} from '../actions/authActions';
import axios from 'axios';

function signup(payload) {
    return axios.post('http://localhost:7001/api/users', payload)
    .then(response => {
        console.log('signup response = ', response);
        return response;
    })
    .catch(error => {
        console.log('signup error = ', error.response);
        throw error.response;
    });
}

function login(payload) {
    return axios.post('http://localhost:7001/api/users/login', payload)
    .then(response => {
        console.log('login response = ', response);
        return response;
    })
    .catch(error => {
        console.log('login response = ', error.response);
        throw error.response;
    });
}

function* signupRequestWorker(action) {
    try {
        const response = yield call(signup, action.payload);
        console.log('SAGA SIGNUP SUCCESS: ', response.data);
        yield put(signupSuccess(response.data));
    } catch(err) {
        console.log('SAGA SIGNUP FAILURE: ', err);
        yield put(signupFailure(err));
    }
}

function* loginRequestWorker(action) {
    try {
        const response = yield call(login, action.payload);
        console.log('SAGA LOGIN SUCCESS: ', response.data);
        yield put(loginSuccess(response.data));
    } catch(err) {
        console.log('SAGA LOGIN FAILURE: ', err);
        yield put(loginFailure(err));
    }
}

const signupRequestWatcher = function* signupRequestWatcher() {
    yield takeLatest(types.SIGNUP.REQUEST, signupRequestWorker);
}

const loginRequestWatcher = function* loginRequestWatcher() {
    yield takeLatest(types.LOGIN.REQUEST, loginRequestWorker);
}

export default [
    fork(signupRequestWatcher),
    fork(loginRequestWatcher),
]
