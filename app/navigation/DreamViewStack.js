import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';

import DreamListScene from '../scenes/DreamListScene'
import DreamEntryScene from '../scenes/DreamEntryScene'

export const DreamViewStack = StackNavigator({
  DreamList: {
    screen: DreamListScene
  },
  DreamEntry: {
    screen: DreamEntryScene,
    navigationOptions: {
      tabBarVisible: false
    }
  }
}, {
  initialRouteName: 'DreamList',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
