const BASE_URL = 'https://shielded-sea-32169.herokuapp.com/api';

export default {
  users: {
    _: `${BASE_URL}/users`,
    login: `${BASE_URL}/users/login`,
  },
  events: {
    _: `${BASE_URL}/events`,
    attendees: (id) => `${BASE_URL}/${id}/attendees`,
  },
  event: (id) => `${BASE_URL}/events/${id}`,
  attendees: {
    _: `${BASE_URL}/attendees`,
  },
};
