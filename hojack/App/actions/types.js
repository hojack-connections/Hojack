const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
    const res = {};
    [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`);
    return res;
}

// Login Actions
export const LOGIN = createRequestTypes('LOGIN');
export const LOGOUT = createRequestTypes('LOGOUT');

// Signup Actions
export const SIGNUP = createRequestTypes('SIGNUP');