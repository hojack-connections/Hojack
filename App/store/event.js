import axios from 'axios';
import URLs from '../URLs';

export default class EventStore {
  async create(data) {
    try {
      await axios.post(URLs.events._, data);
    } catch (err) {
      console.log('Error creating event');
    }
  }

  async loadEvent(id) {
    try {
      await axios.get(URLs.event(id), {
        params: {
          // TODO: Get a token in here
          token: '',
        },
      });
    } catch (err) {
      console.log('Error loading event');
    }
  }
}
