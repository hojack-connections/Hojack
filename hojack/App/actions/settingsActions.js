import * as types from './types';

export function addCertReceiver(payload) {
  return {
      type: types.ADD_CERT_RECEIVER,
      payload,
  }
}

export function removeCertReceiver(payload) {
  return {
      type: types.REMOVE_CERT_RECEIVER,
      payload,
  }
}

export function addSheetReceiver(payload) {
  return {
      type: types.ADD_SHEET_RECEIVER,
      payload,
  }
}

export function removeSheetReceiver(payload) {
  return {
      type: types.REMOVE_SHEET_RECEIVER,
      payload,
  }
}
