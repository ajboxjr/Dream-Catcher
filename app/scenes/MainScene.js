import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import {Image} from 'react-native'

import MainNavigationWithState from '../navigation/MainStack'

class MainScene extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('new props!!!!!');
    if (this.props.user.token !== null) {
      nextProps.load();
    }
  }

  render() {
    return (<MainNavigationWithState/>)
  }
}

export default MainScene;
