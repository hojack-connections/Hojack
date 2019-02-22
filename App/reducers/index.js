import auth from './auth';
import event from './event';
import attendee from './attendee';
import settings from './settings';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
      break;
    default:
      return state;
  }
};

const reducer = {
  rehydrated,
  auth,
  event,
  attendee,
  settings,
};

export default reducer;
