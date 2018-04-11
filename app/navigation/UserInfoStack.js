import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import ProfileScene from 'scenes/ProfileScene'
import SettingScene from 'scenes/SettingScene'

export default UserInfoStack = StackNavigator({
  Profile:{
    screen: ProfileScene
  },
  Settings:{
    screen: SettingScene
  }
},
{
  initialRouteName: 'Profile',
  headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
  }
})
