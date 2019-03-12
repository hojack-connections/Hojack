import { observable } from 'mobx';
import axios from 'axios';
import URLs from '../URLs';

export default class EventStore {
  authStore;

  @observable attendeesById = {};
  @observable eventsById = {};
  @observable events = [];

  constructor(_authStore) {
    this.authStore = _authStore;
  }

  async create(data) {
    try {
      return await axios.post(URLs.events._, data);
    } catch (err) {
      console.log('Error creating event');
    }
  }

  async loadEvent(id) {
    try {
      await axios.get(URLs.event(id), {
        params: {
          token: this.authStore.token,
        },
      });
    } catch (err) {
      console.log('Error loading event');
    }
  }

  async loadEvents() {
    try {
      const res = await axios.get(URLs.users.events, {
        params: {
          token: this.authStore.token,
        },
      });
      this.events = res.data;
      this.events.forEach((event) => {
        this.eventsById[event._id] = event;
      });
    } catch (err) {
      console.log('Error loading events', err);
    }
  }

  async getEventAttendees(id) {
    try {
      const res = await axios.get(URLs.events.attendees(id), {
        params: {
          token: this.authStore.token,
        },
      });
      attendeesById[id] = res.data;
    } catch (err) {
      console.log('Error loading attendees for event', id);
    }
  }

  async createAttendee(eventId, data) {
    try {
      await axios.post(URLs.events.attendees, data);
      await this.getEventAttendees(eventId);
    } catch (err) {
      console.log('Error creating attendee', err);
      throw err;
    }
  }
}
