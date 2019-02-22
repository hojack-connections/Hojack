import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';

export default class AuthStore {
  @observable auth;

  get authenticated() {
    return !!this.auth;
  }

  set auth(_auth) {
    this.authChanged(_auth);
  }

  get token() {
    return this.auth.token;
  }

  async authChanged(newAuth) {
    try {
      await AsyncStorage.setItem('auth', JSON.stringify(newAuth));
    } catch (err) {
      console.log('Error updating auth value', err);
    }
  }
}
