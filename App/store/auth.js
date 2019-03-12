import { observable, computed } from 'mobx';
import { AsyncStorage } from 'react-native';

export default class AuthStore {
  @observable token;

  constructor() {
    AsyncStorage.getItem('token', (err, token) => {
      if (err) {
        // No stored token
        return;
      }
      this.token = token;
      if (typeof this.token !== 'string' || this.token.length === 0) {
        this.token = undefined;
      }
    });
  }

  @computed
  get authenticated() {
    return !!this.token;
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
