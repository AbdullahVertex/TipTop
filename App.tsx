import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store'; // make sure persistor is exported in store.ts
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppNavigator />
          <Toast />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
