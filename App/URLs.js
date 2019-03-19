// const NEW_BASE_URL = 'http://localhost:4000';
const NEW_BASE_URL = 'https://api.gocert.io';

export const BASE_URL = NEW_BASE_URL;

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
  attendees: {
    _: `${NEW_BASE_URL}/attendees`,
  },
};
