import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import URLs from '../URLs';

export default class AuthStore {
  @observable auth;

  get authenticated() {
    return !!this.auth;
  }

  set auth(_auth) {
    this.authChanged(_auth);
  }

  async authChanged(newAuth) {
    try {
      await AsyncStorage.setItem('auth', JSON.stringify(newAuth));
    } catch (err) {
      console.log('Error updating auth value', err);
    }
  }

  async signup(data) {
    try {
      const res = await axios.post(URLs.users._, {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      });
      this.auth = res;
    } catch (err) {
      console.log('Error signing up');
    }
  }

  async login() {
    try {
      const res = await axios.post(URLs.users.login);
      this.auth = res;
    } catch (err) {
      console.log('Error logging in');
    }
  }
}
