import { all } from 'redux-saga/effects';
import auth from './auth';

const root = function* root() {
    yield all([
        ...auth,
    ])
};

export default root;
