import * as RNIap from 'react-native-iap';
import axios from 'axios';
import { BASE_URL } from '../URLs';
import { Platform } from 'react-native';

export default class PurchaseStore {
  authStore;

  constructor(_authStore) {
    this.authStore = _authStore;
    RNIap.initConnection();
  }

  async purchaseSubscription(id) {
    try {
      const subs = await RNIap.getSubscriptions([id]);
      if (subs.length !== 1) {
        throw new Error('Invalid subscription identifier supplied');
      }
      const purchase = await RNIap.buySubscription(id);
      await axios.post(`${BASE_URL}/subscriptions`, {
        token: this.authStore.token,
        receiptData: purchase.transactionReceipt,
        platform: Platform.OS === 'ios' ? 'ios' : 'android',
      });
    } catch (err) {
      console.log('Error purchasing subscription', err);
      throw err;
    }
  }
}
