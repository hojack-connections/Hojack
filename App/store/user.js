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
      await axios.post(URLs.users._, {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      });
      await this.login(data);
    } catch (err) {
      console.log('Error signing up', err);
      throw err;
    }
  }

  async login(data) {
    try {
      const res = await axios.post(URLs.users.login, {
        email: data.email,
        password: data.password,
      });
      await this.authStore.authChanged(res.data.token);
    } catch (err) {
      console.log('Error logging in', err);
      throw err;
    }
  }
}
