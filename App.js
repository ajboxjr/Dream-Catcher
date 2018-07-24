import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { YellowBox } from 'react-native';

import { Provider } from 'react-redux';

import { store, persistor } from './app/store/store'
// const store = configureStore({});

import NewDreamScene from './app/scenes/NewDreamScene'
import RootNavigationWithState from './app/navigation/RootNavigator'

import { PersistGate } from 'redux-persist/integration/react'


export default class App extends React.Component {

  render() {

    console.ignoredYellowBox = ['Remote debugger'];
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigationWithState />
          </PersistGate>
      </Provider>
    );
  }
}
