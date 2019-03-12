import { observable } from 'mobx';

export default class ReceiverStore {
  authStore;
  @observable sheetReceiversById = {};
  @observable certReceiversById = {};

  constructor(_authStore) {
    this.authStore = _authStore;
  }

  addSheetReceiver(id, email) {
    if (!this.sheetReceiversById[id]) {
      this.sheetReceiversById[id] = [];
    }
    if (this.sheetReceiversById[id].indexOf(email) !== -1) return;
    this.sheetReceiversById[id].push(email);
  }

  addCertReceiver(id, email) {
    if (!this.certReceiversById[id]) {
      this.certReceiversById[id] = [];
    }
    if (this.certReceiversById[id].indexOf(email) !== -1) return;
    this.certReceiversById[id].push(email);
  }

  removeSheetReceiver(id, email) {
    if (!this.sheetReceiversById[id]) {
      this.sheetReceiversById[id] = [];
    }
    const emailIndex = this.sheetReceiversById[id].indexOf(email);
    if (emailIndex === -1) return;
    this.sheetReceiversById[id].splice(emailIndex, 1);
  }

  removeCertReceiver(id, email) {
    if (!this.certReceiversById[id]) {
      this.certReceiversById[id] = [];
    }
    const emailIndex = this.certReceiversById[id].indexOf(email);
    if (emailIndex === -1) return;
    this.certReceiversById[id].splice(emailIndex, 1);
  }
}
