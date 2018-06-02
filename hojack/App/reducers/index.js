import auth from './auth';
import event from './event';
import attendee from './attendee';

const rehydrated = (state = false , action) => {
    switch (action.type) {
        case "persist/REHYDRATE" :
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
};

export default reducer;
