import { observable } from 'mobx';

export default class ReceiverStore {
  authStore;
  @observable sheetReceiversById = {};
  @observable certReceiversById = {};

  constructor(_authStore) {
    this.authStore = _authStore;
  }

  addSheetReceiver(id, email) {
    if (!sheetReceiversById[id]) {
      sheetReceiversById[id] = [];
    }
    sheetReceiversById[id].push(email);
  }

  addCertReceiver(id, email) {
    if (!certReceiversById[id]) {
      certReceiversById[id] = [];
    }
    certReceiversById[id].push(email);
  }
}
