import React, { Component } from 'react';
import {Image, View, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { TabNavigator, addNavigationHelpers } from 'react-navigation';

import { addListener } from '../utils/utils'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Feather'

import UserInfoStack from '../navigation/UserInfoStack'
import { DreamViewStack } from '../navigation/DreamViewStack'
import NewDreamScene from '../scenes/NewDreamScene'

const styles = StyleSheet.create({
  newDreamIconContainer: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderColor: 'white',
    position:'absolute',
    bottom: '10%',
    backgroundColor: "#000",
    borderWidth: 2,
    justifyContent:'center',
    alignItems:'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: .4,
    shadowColor: "#1B9AAA"
  },
  newDreamIcon: {
    flex: 1,
    width: '80%',
    resizeMode: 'contain'
  }
})

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
      tabBarLabel: "New Dream",
      labelStyle: {
        fontSize: 20,
      },
      tabBarShowLabels: 'hidden',
      tabBarIcon: <View style={styles.newDreamIconContainer}>
        <Image style={styles.newDreamIcon} source={require('../assets/cloud.png')} />
      </View>
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
  tinColor: '#000',
  activeTintColor: '#1B9AAA',
  inactiveTintColor: '#000',
  showIcon: true,
  showLabel: true,
  lazyLoad: true,
  upperCaseLabel: false,
  indicatorStyle: {
    backgroundColor: 'transparent'
  },
  style: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
  }
}
})
