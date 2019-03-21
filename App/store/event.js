import { observable } from 'mobx';
import axios from 'axios';

export default class EventStore {
  authStore;

  @observable attendeesById = new Map();
  @observable eventsById = {};
  @observable events = [];
  @observable receiversByEventId = {};

  @observable totalEventCount = 0;

  constructor(_authStore) {
    this.authStore = _authStore;
  }

  async create(data) {
    try {
      await axios.post('/events', {
        ...data,
        token: this.authStore.token,
      });
    } catch (err) {
      console.log('Error creating event');
      throw err;
    }
  }

  async loadTotalEventCount() {
    try {
      const res = await axios.get('/users/events/count', {
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
      const res = await axios.get('/users/events', {
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

  async loadEventAttendees(id) {
    try {
      const res = await axios.get('/events/attendees', {
        params: {
          eventId: id,
          token: this.authStore.token,
        },
      });
      this.attendeesById.set(id, res.data);
    } catch (err) {
      console.log('Error loading attendees for event', id);
      throw err;
    }
  }

  async update(id, data) {
    try {
      await axios.put('/events', {
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
      await axios.delete('/events', {
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

  async submit(id) {
    try {
      await axios.post('/events/submit', {
        _id: id,
        token: this.authStore.token,
      });
    } catch (err) {
      console.log('Error submitting event', err);
      throw err;
    }
  }

  async addReceiverForEvent(eventId, email) {
    try {
      await axios.post('/receivers', {
        eventId,
        email,
        token: this.authStore.token,
      });
    } catch (err) {
      console.log('Error adding receiver for event', err);
      throw err;
    }
  }

  async deleteReceiver(receiverId) {
    try {
      await axios.delete('/receivers', {
        data: {
          _id: receiverId,
          token: this.authStore.token,
        },
      });
    } catch (err) {
      console.log('Error deleting sheet receiver', err);
      throw err;
    }
  }

  async loadReceiversForEvent(eventId) {
    try {
      const { data } = await axios.get('/events/receivers', {
        params: {
          eventId,
          token: this.authStore.token,
        },
      });
      this.receiversByEventId[eventId] = data;
    } catch (err) {
      console.log('Error loading sheet receivers for event', err);
      throw err;
    }
  }
}
