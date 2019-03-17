import { observable } from 'mobx';
import axios from 'axios';
import URLs from '../URLs';

export default class EventStore {
  authStore;

  @observable attendeesById = {};
  @observable eventsById = {};
  @observable events = [];

  @observable totalEventCount = 0;
  @observable totalAttendeeCount = 0;

  constructor(_authStore) {
    this.authStore = _authStore;
  }

  async create(data) {
    try {
      await axios.post(URLs.events._, {
        ...data,
        token: this.authStore.token,
      });
    } catch (err) {
      console.log('Error creating event');
      throw err;
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
      throw err;
    }
  }

  async loadTotalEventCount() {
    try {
      const res = await axios.get(URLs.users.eventsCount, {
        params: {
          token: this.authStore.token,
        },
      });
      this.totalEventCount = res.data.count;
    } catch (err) {
      console.log('Error loading total event count', err);
      throw err;
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
      await this.loadTotalEventCount();
    } catch (err) {
      console.log('Error loading events', err);
      throw err;
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
      throw err;
    }
  }

  async update(id, data) {
    try {
      await axios.put(URLs.events._, {
        ...data,
        token: this.authStore.token,
      });
    } catch (err) {
      console.log('Error updating event', err);
      throw err;
    }
  }

  async delete(id) {
    try {
      await axios.delete(URLs.events._, {
        data: {
          _id: id,
          token: this.authStore.token,
        },
      });
    } catch (err) {
      console.log('Error deleting event', err);
      throw err;
    }
  }

  async submit(id, certReceivers, sheetReceivers) {
    try {
      await axios.post(URLs.events.submit, {
        _id: id,
        certReceivers,
        sheetReceivers,
        token: this.authStore.token,
      });
    } catch (err) {
      console.log('Error submitting event', err);
      throw err;
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
