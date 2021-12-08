import {createStore, applyMiddleware} from 'redux';
import PromiseMiddleware from 'redux-promise-middleware';
import {persistReducer, persistStore} from 'redux-persist';
import {logger} from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducer/index';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(PromiseMiddleware, logger),
);

const persistor = persistStore(store);

export {store, persistor};
