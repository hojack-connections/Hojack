const BASE_URL = 'https://shielded-sea-32169.herokuapp.com/api';
const NEW_BASE_URL = 'http://localhost:4000';
// const NEW_BASE_URL = 'https://api.gocert.io';

export default {
  users: {
    _: `${NEW_BASE_URL}/users`,
    login: `${NEW_BASE_URL}/users/login`,
    events: `${NEW_BASE_URL}/users/events`,
    eventsCount: `${NEW_BASE_URL}/users/events/count`,
  },
  events: {
    _: `${NEW_BASE_URL}/events`,
    attendees: `${NEW_BASE_URL}/events/attendees`,
    submit: `${NEW_BASE_URL}/events/submit`,
  },
  event: (id) => `${BASE_URL}/events/${id}`,
  attendees: {
    _: `${NEW_BASE_URL}/attendees`,
  },
};
