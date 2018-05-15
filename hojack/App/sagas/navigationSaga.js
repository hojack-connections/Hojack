import React from 'react';
import { take, takeLatest, put, fork, call } from 'redux-saga/effects';
import * as types from '../actions/types';
// import { navigationSuccess, navigationFailure } from '../actions/navigationActions';
import axios from 'axios';

function fetchNavigations() {
    return axios.get('https://putzmeister.banauten.com/howto/navigation.json');        
}

function* navigationRequestWorker(action) {
    try {
        const response = yield call(fetchNavigations);
        console.log('SAGA NAVIGATION SUCCESS: ', response.data);
        // yield put(navigationSuccess(response.data));
    } catch(err) {
        console.log('SAGA NAVIGATION FAILURE: ', err);
        // yield put(navigationFailure(err));
    }
}

const navigationRequestWatcher = function* navigationRequestWatcher() {
    // yield takeLatest(types.NAVIGATIONS.REQUEST, navigationRequestWorker);
}

export default [
    fork(navigationRequestWatcher),
]