const BASE_PATH = 'https://shielded-sea-32169.herokuapp.com/api/';
// const BASE_PATH = 'https://localhost:7001/';

export default (API_PATH = {
  auth: BASE_PATH + 'users',
  attendee: BASE_PATH + 'attendees',
  event: BASE_PATH + 'events',
});
