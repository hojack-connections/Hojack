import * as types from './types';

export function signupRequest(payload) {
  return {
    type: types.SIGNUP.REQUEST,
    payload,
  };
}

export function signupSuccess(response) {
  return {
    type: types.SIGNUP.SUCCESS,
    response,
  };
}

export function signupFailure(err) {
  return {
    type: types.SIGNUP.FAILURE,
    err,
  };
}

export function loginRequest(payload) {
  return {
    type: types.LOGIN.REQUEST,
    payload,
  };
}

export function loginSuccess(response) {
  return {
    type: types.LOGIN.SUCCESS,
    response,
  };
}

export function loginFailure(err) {
  return {
    type: types.LOGIN.FAILURE,
    err,
  };
}
