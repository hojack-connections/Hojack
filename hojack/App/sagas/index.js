import { all } from 'redux-saga/effects';
import auth from './auth';
import event from './event';
import attendee from './attendee';

const root = function* root() {
    yield all([
        ...auth,
        ...event,
        ...attendee,
    ])
};

export default root;
