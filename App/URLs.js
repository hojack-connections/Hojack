const BASE_URL = 'https://shielded-sea-32169.herokuapp.com/api';
const NEW_BASE_URL = 'https://api.gocert.io';

export default {
  users: {
    _: `${NEW_BASE_URL}/users`,
    login: `${NEW_BASE_URL}/users/login`,
    events: `${NEW_BASE_URL}/users/events`,
  },
  events: {
    _: `${NEW_BASE_URL}/events`,
    attendees: (id) => `${BASE_URL}/${id}/attendees`,
    submit: `${NEW_BASE_URL}/events/submit`,
  },
  event: (id) => `${BASE_URL}/events/${id}`,
  attendees: {
    _: `${BASE_URL}/attendees`,
  },
};
