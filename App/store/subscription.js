import { observable, computed } from 'mobx'
import axios from 'axios'
import { Platform } from 'react-native'

export default class SubscriptionStore {
  authStore
  @observable activeSubscription = null
  @observable latestSubscription = null
  @observable freeTrialEligible = false

  constructor(_authStore) {
    this.authStore = _authStore
  }

  @computed
  get hasActiveSubscription() {
    return this.activeSubscription !== null
  }

  async loadActiveSubscription() {
    try {
      const { data } = await axios.get(`/subscriptions/status`, {
        params: {
          token: this.authStore.token,
        },
      })
      this.activeSubscription = data.activeSubscription
      this.freeTrialEligible = data.freeTrialEligible
      this.latestSubscription = data.latestSubscription
    } catch (err) {
      console.log('Error loading active subscription', err)
      throw err
    }
  }

  async startTrial() {
    try {
      await axios.post(`/subscriptions`, {
        receiptData: 'void',
        isTrial: true,
        platform: Platform.OS === 'ios' ? 'ios' : 'android',
        token: this.authStore.token,
      })
    } catch (err) {
      console.log('Error starting trial', err)
      throw err
    }
  }
}
