import React from 'react';
import MainNavigatorScreen from './source/navigators';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './source/stores/store';
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigatorScreen />
      </PersistGate>
    </Provider>
  );
}
