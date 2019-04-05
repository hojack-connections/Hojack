import axios from 'axios'

export default class UserStore {
  authStore

  constructor(_authStore) {
    this.authStore = _authStore
  }

  async signup(data) {
    try {
      await axios.post('/users', {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      })
      await this.login(data)
    } catch (err) {
      console.log('Error signing up', err)
      throw err
    }
  }

  async login(data) {
    try {
      const res = await axios.post('/users/login', {
        email: data.email,
        password: data.password,
      })
      await this.authStore.authChanged(res.data.token)
    } catch (err) {
      console.log('Error logging in', err)
      throw err
    }
  }

  async update(data) {
    try {
      await axios.put('/users', {
        ...data,
        token: this.authStore.token,
      })
      await this.authStore.loadCurrentUser()
    } catch (err) {
      console.log('Error updating user', err)
      throw err
    }
  }
}
