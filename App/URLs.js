const BASE_URL = 'https://shielded-sea-32169.herokuapp.com/api';
const NEW_BASE_URL = 'https://backend-9r4ts70y7.now.sh';

export default {
  users: {
    _: `${NEW_BASE_URL}/users`,
    login: `${NEW_BASE_URL}/users/login`,
    events: `${NEW_BASE_URL}/users/events`,
  },
  events: {
    _: `${NEW_BASE_URL}/events`,
    attendees: (id) => `${BASE_URL}/${id}/attendees`,
  },
  event: (id) => `${BASE_URL}/events/${id}`,
  attendees: {
    _: `${BASE_URL}/attendees`,
  },
};
