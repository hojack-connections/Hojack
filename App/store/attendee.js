import axios from 'axios';
import URLs from '../URLs';

export default class AttendeeStore {
  authStore;

  constructor(_authStore) {
    this.authStore = _authStore;
  }

  async create(eventId, data) {
    try {
      await axios.post(URLs.attendees._, {
        ...data,
        token: this.authStore.token,
      });
    } catch (err) {
      console.log('Error creating attendee', err);
      alert(err.toString());
      throw err;
    }
  }
}
