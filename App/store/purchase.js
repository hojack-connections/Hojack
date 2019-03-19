import * as RNIap from 'react-native-iap';

export default class PurchaseStore {
  constructor() {
    RNIap.initConnection();
  }

  async purchaseSubscription(id) {
    try {
      const subs = await RNIap.getSubscriptions([id]);
      if (subs.length !== 1) {
        throw new Error('Invalid subscription identifier supplied');
      }
      const purchase = await RNIap.buySubscription(id);
      alert(JSON.stringify(purchase));
    } catch (err) {
      console.log('Error purchasing subscription', err);
      throw err;
    }
  }
}
