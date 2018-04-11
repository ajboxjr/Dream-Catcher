import React, { Component } from 'react';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux'

// import DreamView from '../../app/navigation/DreamViewStack'
import NewDreamScene from 'scenes/NewDreamScene'
import UserInfoStack from 'app/navigation/UserInfoStack'
import { DreamViewStack } from 'app/navigation/DreamViewStack'

import { addListener } from 'utils/utils'

export default MainStack = TabNavigator({
  tab1:{
    screen: DreamViewStack,
  },
  tab2: {
    screen: NewDreamScene
  },
  tab3: {
    screen: UserInfoStack
  }
})
