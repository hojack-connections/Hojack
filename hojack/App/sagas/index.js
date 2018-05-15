import {all} from 'redux-saga/effects';
import navigation from './navigationSaga';

const root = function* root() {
    yield all([
        ...navigation,
    ])
};

export default root;