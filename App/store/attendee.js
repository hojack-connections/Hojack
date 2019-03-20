import axios from 'axios';
import { observable } from 'mobx';

export default class AttendeeStore {
  authStore;

  @observable totalAttendeeCount = 0;
  @observable allAttendees = [];

  constructor(_authStore) {
    this.authStore = _authStore;
  }

  async loadTotalAttendeeCount() {
    try {
      const res = await axios.get('/attendees', {
        params: {
          token: this.authStore.token,
        },
      });
      this.allAttendees = res.data;
      this.totalAttendeeCount = this.allAttendees.length;
    } catch (err) {
      console.log('Error loading total attendee count', err);
      throw err;
    }
  }

  async create(eventId, data) {
    try {
      await axios.post('/attendees', {
        ...data,
        token: this.authStore.token,
      });
    } catch (err) {
      console.log('Error creating attendee', err);
      throw err;
    }
  }
}
