import { observable, computed } from 'mobx';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

export default class AuthStore {
  @observable token;
  @observable active = {};

  initialLoadCompleted = false;
  initialLoadCallbacks = [];

  constructor() {
    AsyncStorage.getItem('token', (err, token) => {
      if (err) {
        // No stored token
        this.executeInitialLoadCallbacks();
        return;
      }
      this.token = token;
      if (typeof this.token !== 'string' || this.token.length === 0) {
        this.token = undefined;
      }
      if (this.token) this.loadCurrentUser();
      this.executeInitialLoadCallbacks();
    });
  }

  onInitialLoad(callback) {
    if (this.initialLoadCompleted) return callback();
    this.initialLoadCallbacks.push(callback);
  }

  executeInitialLoadCallbacks() {
    this.initialLoadCompleted = true;
    while (this.initialLoadCallbacks.length) {
      this.initialLoadCallbacks.pop()();
    }
  }

  @computed
  get authenticated() {
    return !!this.token;
  }

  async loadCurrentUser() {
    try {
      const { data } = axios.get('/users/authenticated', {
        params: {
          token: this.token,
        },
      });
      this.active = data;
    } catch (err) {
      console.log('Error loading current user');
    }
  }

  async authChanged(token) {
    try {
      await AsyncStorage.setItem('token', token);
      this.token = token;
    } catch (err) {
      console.log('Error updating auth value', err);
      alert(err);
    }
  }

  async logout() {
    try {
      await AsyncStorage.removeItem('token');
      this.token = undefined;
    } catch (err) {
      console.log('Error logging out', err);
    }
  }
}
