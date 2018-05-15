import * as types from './types';

export function updateConnectivity(data) {
    return {
        type: types.UPDATE_CONNECTIVITY,
        data,
    }
}
