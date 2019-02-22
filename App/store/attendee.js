import axios from 'axios';
import URLs from '../URLs';

export default class AttendeeStore {
  async create(data) {
    try {
      await axios.post(URLs.attendees._, data);
    } catch (err) {
      console.log('Error creating attendee');
    }
  }
}
