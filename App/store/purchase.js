import * as RNIap from 'react-native-iap'
import axios from 'axios'
import { Platform, NativeModules } from 'react-native'
const { InAppUtils } = NativeModules

export default class PurchaseStore {
  authStore

  constructor(_authStore) {
    this.authStore = _authStore
    RNIap.initConnection()
  }

  async syncReceipts() {
    try {
      await new Promise((rs, rj) => {
        InAppUtils.refreshReceiptIfNeeded((err) => {
          if (err) return rj(err)
          return rs()
        })
      })
      const receiptData = await new Promise((rs, rj) => {
        InAppUtils.receiptData((err, receiptData) => {
          if (err) return rj(err)
          rs(receiptData)
        })
      })
      await axios.post('/subscriptions', {
        token: this.authStore.token,
        receiptData,
        platform: Platform.OS === 'ios' ? 'ios' : 'android',
      })
    } catch (err) {
      console.log('Error synchronizing receipts')
      throw err
    }
  }

  async purchaseSubscription(id) {
    try {
      const subs = await RNIap.getSubscriptions([id])
      if (subs.length !== 1) {
        throw new Error('Invalid subscription identifier supplied')
      }
      const purchase = await RNIap.buySubscription(id)
      await axios.post('/subscriptions', {
        token: this.authStore.token,
        receiptData: purchase.transactionReceipt,
        platform: Platform.OS === 'ios' ? 'ios' : 'android',
      })
    } catch (err) {
      console.log('Error purchasing subscription', err)
      throw err
    }
  }
}
