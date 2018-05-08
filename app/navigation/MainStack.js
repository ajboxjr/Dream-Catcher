import React, { Component } from 'react';
import {Image } from 'react-native'
import { connect } from 'react-redux'
import { TabNavigator, addNavigationHelpers } from 'react-navigation';

import { addListener } from '../utils/utils'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Feather'

import UserInfoStack from '../navigation/UserInfoStack'
import { DreamViewStack } from '../navigation/DreamViewStack'
import NewDreamScene from '../scenes/NewDreamScene'

const tabOptions = {
  tab1:{
    screen: DreamViewStack,
    navigationOptions: {
      tabBarLabel:"My Dreams",
      tabBarIcon: <MaterialIcon name="description" size={35} color="#000" />
    }
  },
  tab2: {
    screen: NewDreamScene,
    navigationOptions: {
      tabBarLabel: "Dream",
      labelStyle: {
        fontSize: 20,
      },
      tabBarShowLabels: 'hidden',
      tabBarIcon: <Image style={{resizeMode:'contain', height:'100%'}} source={require('../assets/new_dream.png')} />,
    }
  },
  tab3: {
    screen: UserInfoStack,
    navigationOptions: {
      tabBarLabel:"Profile",
      tabBarIcon: <Icon name="user" size={35} color="#000" />
    }
  }
}

export default MainStack = TabNavigator(tabOptions,{
  tabBarOptions: {
  tinColor: '#fff',
  activeTintColor: '#eee',
  inactiveTintColor: '#fff',
  showIcon: true,
  showLabel: true,
  lazyLoad: true,
  upperCaseLabel: false,
  indicatorStyle: {
    backgroundColor: 'transparent'
  },
  style: {
    backgroundColor: 'rgb(59,78,227)',
    borderTopWidth: 1,
  }
}
})
