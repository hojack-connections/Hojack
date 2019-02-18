import * as types from '../actions/types';

const initialState = {
  certReceivers: ["<<All Attendees>>", ],
  sheetReceivers: []
}

export default function settings(state = initialState, action) {
  switch (action.type) {
      case types.ADD_CERT_RECEIVER:
          let newCertList = state.certReceivers.slice(0);
          newCertList.push(action.payload);
          return {
              ...state,
              certReceivers: newCertList,
          }
      case types.REMOVE_CERT_RECEIVER:
          let newCertList1 = state.certReceivers.slice(0);
          newCertList1.splice(action.payload, 1);
          return {
              ...state,
              certReceivers: newCertList1,
          }
      case types.ADD_SHEET_RECEIVER:
          let newSheetList = state.sheetReceivers.slice(0);
          newSheetList.push(action.payload);
          return {
              ...state,
              sheetReceivers: newSheetList,
          }
      case types.REMOVE_SHEET_RECEIVER:
          let newSheetList1 = state.sheetReceivers.slice(0);
          newSheetList1.splice(action.payload, 1);
          return {
              ...state,
              sheetReceivers: newSheetList1,
          }
      default:
          return state;
  }
}
