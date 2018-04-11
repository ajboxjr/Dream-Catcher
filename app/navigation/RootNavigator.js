import React from 'react'
import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'
//Login Scene
import LoginScene from 'scenes/LoginScene'
import { addListener } from 'utils/utils'

import MainStack from '../navigation/MainStack'


export const RootStack = TabNavigator({
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
