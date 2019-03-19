import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App/App';
import { Provider } from 'mobx-react';
import AttendeeStore from './App/store/attendee';
import UserStore from './App/store/user';
import EventStore from './App/store/event';
import AuthStore from './App/store/auth';
import ReceiverStore from './App/store/receiver';
import SubscriptionStore from './App/store/subscription';
import PurchaseStore from './App/store/purchase';

const auth = new AuthStore();

const stores = {
  auth,
  attendee: new AttendeeStore(auth),
  user: new UserStore(auth),
  event: new EventStore(auth),
  receiver: new ReceiverStore(auth),
  subscription: new SubscriptionStore(auth),
  purchase: new PurchaseStore(),
};

const Root = () => (
  <Provider {...stores}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('certifio', () => Root);
