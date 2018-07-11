import React, {Component} from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
  Alert,
  Animated
} from 'react-native'
import {StackNavigator} from 'react-navigation';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons';

import BubbleProfile from '../components/Profile/BubbleProfile'
import UserInfo from '../components/Profile/UserInfo'

import * as AuthActions from '../actions/AuthActions';

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    //Navigate
    this._handleSceneChange = this._handleSceneChange.bind(this)
    //Profile Header
    this.getDimensions = this.getDimensions.bind(this)
    this.getLayout = this.getLayout.bind(this)
    //Logout
    this._handleLogout = this._handleLogout.bind(this)
    this.state = {
      profH: 0,
      profW: 0
    }
  }

  /*
    Navigate to Settings
  */
  _handleSceneChange = () => {
    this.props.onClick()
  }

  /*
    Return dimentions of profile profileHeader
  */
  getDimensions = (increase) => {
    const {profH} = this.state;
    return {
      width: profH + increase,
      height: profH + increase,
      borderRadius: profH + increase / 2
    }
  }

  /*
    store Layout width in Heigh to state
  */
  getLayout = ({width, height}) => {
    console.log(width, height);
    this.setState({profW: width, profH: height});
  }

  /*
    Prompt User to logout
  */
  _handleLogout() {
    Alert.alert('Logout', 'You really want to logout...', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'Logout',
        onPress: () => {
          console.log('OK Pressed')
          this.props.Auth.LogoutUser()
        }
      }
    ], {cancelable: false})
  }

  render() {
    const {_id} = this.props.user
    return (<View style={styles.profileContainer}>
      <View onLayout={(event) => this.getLayout(event.nativeEvent.layout)} style={styles.profileHeader}>

        <TouchableHighlight style={styles.settingsTouch} onPress={this._handleSceneChange}>
          <Icon style={styles.settingIcon} name='settings' color='#333F4F' size={40}/>
        </TouchableHighlight>

        <View style={[this.getDimensions(5), styles.innerCircle]}>
          <Image style={styles.profileImage} source={require('../assets/cloud.png')}/>
        </View>

        <BubbleProfile getDimensions={this.getDimensions}/>

      </View>

      <UserInfo onLogout={() => this._handleLogout()} _id={this.props.user._id} dreams={this.props.dreams}/>

    </View>)
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: .9,
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: .3
  },
  profileHeader: {
    backgroundColor: '#040F75',
    flex: .3,
    //Weird margin...
    width: '101%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  innerCircle: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: '#020B5D',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    marginBottom: '10%'
  },
  settingsTouch: {
    position: 'absolute',
    top: '3%',
    right: '3%',
    zIndex: 2
  },
  settingIcon: {},
  usernameContainer: {
    flex: 1,
    justifyContent: 'center'
  }
})
function mapDispatchToProps(dispatch) {
  return {
    Auth: bindActionCreators(AuthActions, dispatch)
  }
}
function mapStateToProps(state) {
  return {user: state.user, dreams: state.dreams.items}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
