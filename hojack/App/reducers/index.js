import { combineReducers } from 'redux';
import auth from './auth';
import event from './event';

const reducer = combineReducers({
    auth,
    event,
});

export default reducer;
