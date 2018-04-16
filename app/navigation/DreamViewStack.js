import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Image } from 'react-native'
import { mapNavigationStateParamsToProps } from 'utils/utils'

import DreamListScene from 'scenes/DreamListScene'
import DreamEntryScene from 'scenes/DreamEntryScene'

export const DreamViewStack = StackNavigator({
  DreamList: {
    screen: DreamListScene
  },
  DreamEntry: {
    screen: DreamEntryScene
  }
},
{
  initialRouteName: 'DreamList',
  headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
  }
})