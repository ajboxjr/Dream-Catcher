import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { Actions as RouteActions, Scene, Stack, Router, TabBar, Icon, Tabs} from 'react-native-router-flux';
import { StackNavigator, TabNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';

import { Provider } from 'react-redux';
import SettingScene from 'scenes/SettingScene';

import configureStore from './app/store/store'
const store = configureStore({});

import NewDreamScene from 'scenes/NewDreamScene'
import NewDreamIcon from './app/components/icons/NewDreamIcon'
import ProfileIcon from './app/components/icons/ProfileIcon'
import ListIcon from './app/components/icons/ListIcon'

import RootNavigationWithState from './app/navigation/RootNavigator'

  // <RootNavigationWithState />
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
