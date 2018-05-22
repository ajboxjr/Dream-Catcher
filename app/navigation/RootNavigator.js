import React from 'react'
import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'

import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener
} from 'react-navigation-redux-helpers';

import { addListener } from "../store/store"


import MainStack from '../navigation/MainStack'
import LoginScene from '../scenes/LoginScene'

export const RootStack = StackNavigator({
  Login: {
    screen: LoginScene
  },
  Main:{
    screen: MainStack
  }
},
{
  initialRouteName: 'Login',
  headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
        gesturesEnabled: true
  }
})


RootNavigationWithState = ({dispatch, rootNav}) => (
  <RootStack
    navigation={addNavigationHelpers({ dispatch, state: rootNav, addListener })}
  />
)

const mapStateToProps = state => ({
  rootNav: state.rootNav,
});

export default connect(mapStateToProps)(RootNavigationWithState);
