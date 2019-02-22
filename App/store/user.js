import { observable } from 'mobx';
import axios from 'axios';
import URLs from '../URLs';

export default class UserStore {
  authStore;

  constructor(_authStore) {
    this.authStore = _authStore;
  }

  async signup(data) {
    try {
      const res = await axios.post(URLs.users._, {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      });
      this._authStore.auth = res;
    } catch (err) {
      console.log('Error signing up', err);
    }
  }

  async login(data) {
    try {
      const res = await axios.post(URLs.users.login, {
        email: data.email,
        password: data.password,
      });
      this.authStore.auth = res.data;
    } catch (err) {
      console.log('Error logging in', err);
    }
  }
}
