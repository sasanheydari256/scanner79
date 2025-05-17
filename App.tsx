import React, {useEffect} from 'react';
import {persistor, store} from '@redux/store';

import {LogBox} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import RootContainer from '@app/navigators';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-reanimated';


LogBox.ignoreLogs([
  'The new TextField implementation does not support the', // RN UI Lib will fix this when TextField migrattion done
  'Warning: Function components cannot be given refs.', // RN UI Lib TextField leadingAccessory ref warning
]);

export default function App(): React.JSX.Element {


  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootContainer />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
