import * as types from '../actions/types';

const initialState = {
    isFetching: false,
    isLogged: false,
    isRegistered: false,
    token: null,
    error: '',
}

export default function auth(state = initialState, action) {
    switch (action.type) {        
        case types.SIGNUP.REQUEST:
            return {
                ...state,
                isFetching: true,
                error: '',
            }
        case types.SIGNUP.SUCCESS:
            return {
                ...state,
                isFetching: false,
                isRegistered: true,
            }
        case types.SIGNUP.FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.err,
            }
        case types.LOGIN.REQUEST:
            return {
                ...state,
                isFetching: true,
                error: '',
            }
        case types.LOGIN.SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLogged: true,
                token: action.response.token,
            }
        case types.LOGIN.FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.err,
            }
        default:
            return state;
    }
}
