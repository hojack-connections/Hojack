import { observable, computed } from 'mobx';
import { BASE_URL } from '../URLs';
import axios from 'axios';

export default class SubscriptionStore {
  authStore;
  @observable activeSubscription = null;

  constructor(_authStore) {
    this.authStore = _authStore;
  }

  @computed
  get hasActiveSubscription() {
    return this.activeSubscription !== null;
  }

  async loadActiveSubscription() {
    try {
      const res = await axios.get(`${BASE_URL}/subscriptions/active`, {
        params: {
          token: this.authStore.token,
        },
      });
      this.activeSubscription = res.data;
    } catch (err) {
      console.log('Error loading active subscription', err);
      throw err;
    }
  }

  async startTrial() {
    try {
      await axios.post(`${BASE_URL}/subscriptions`, {
        receiptData: 'void',
        isTrial: true,
        platform: 'ios',
        token: this.authStore.token,
      });
    } catch (err) {
      console.log('Error starting trial', err);
      throw err;
    }
  }
}
