import * as types from '../actions/types';

const initialState = {
    isFetching: false,
    data: [],
    error: '',
}

export default function navigation(state = initialState, action) {
    switch (action.type) {
        
        default:
            return state;
    }
}
