import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';

import { Provider } from 'react-redux';

import configureStore from './app/store/store'
const store = configureStore({});

import NewDreamScene from './app/scenes/NewDreamScene'
import RootNavigationWithState from './app/navigation/RootNavigator'
// <RootNavigationWithState />
import ProfileScene from './app/scenes/ProfileScene'

export default class App extends React.Component {

  render() {
    console.ignoredYellowBox = ['Remote debugger'];
    return (
      <Provider store={store}>
        <RootNavigationWithState />
      </Provider>
    );
  }
}
