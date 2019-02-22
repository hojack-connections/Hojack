import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas';

const config = {
  key: 'primary',
  storage,
  blacklist: ['attendee', 'event'],
};

export default function configureStore() {
  const reducer = persistCombineReducers(config, reducers);

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    undefined,
    compose(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(sagas);
  persistStore(store, null, () => {
    store.getState();
  });

  return store;
}
