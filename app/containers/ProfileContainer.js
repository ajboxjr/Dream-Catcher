import React,{Component} from 'react'
import {Text, View, TouchableHighlight, StyleSheet, Image,Alert, Animated} from 'react-native'
import { StackNavigator } from 'react-navigation';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons';

import BubbleProfile from '../components/BubbleProfile'
import * as AuthActions from '../actions/AuthActions';



class ProfileContainer extends Component{
  constructor(props){
    super(props)
    this._onLogout = this._onLogout.bind(this)
    this.totalDreams = this.totalDreams.bind(this)
    this.totalTags = this.totalTags.bind(this)
    this.fuzzyBorder = this.fuzzyBorder.bind(this)
    this.state = {
      circleOpacity: new Animated.Value(0)
    }
  }

  componentWillMount(){
    console.log('mounted');
    this.fuzzyBorder()
  }

  totalDreams = () => {
    const { dreams } = this.props
    if (dreams){
      return dreams.length
    }
    else{
      return 0
    }
  }

  fuzzyBorder =  () => {
    Animated.sequence([
      Animated.timing(this.state.circleOpacity,{
        duration: 2000,
        toValue: 1
      }),
      Animated.timing(this.state.circleOpacity, {
        duration: 2000,
        toValue: 0,
      })
    ]).start(()=>{
      this.fuzzyBorder()
    })
  }

  totalTags = () =>{
    const { dreams } = this.props
    if (dreams){
        let tagArr = []
        dreams.forEach((dream) => {
          dream.tags.forEach((tag) => {
            tagArr.push(tag)
          })
          // acc += dream.tags
      })
      return tagArr.length
    }
    else{
      return 0
    }
  }
  measureView(event) {
    console.log('event properties: ', event);
    console.log('width: ', event.nativeEvent.layout.width)
  }
  _onLogout(){
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Logout', onPress: () => {
          console.log('OK Pressed')
          this.props.Auth.LogoutUser()
        },
        }
      ],
      { cancelable: false }
    )
  }
  _handleSceneChange = () =>{
    this.props.onClick()
  }

  render(){
    const {_id} = this.props.user
    return(
      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
        <TouchableHighlight style={styles.settingsTouch} onPress={this._handleSceneChange}>
          <Icon style={styles.settingIcon} name='settings' color='#333F4F' size={40}/>
        </TouchableHighlight>
        <BubbleProfile />
        <Animated.View style={[styles.profileCircle, {shadowOpacity: this.state.circleOpacity.interpolate({
          inputRange: [0,1],
          outputRange: [.1, .7]
        })}]}>
          <Image style={styles.profileImage} source={require('../assets/cloud.png')} />
        </Animated.View>
        </View>
        <View style={styles.profileInfoContainer}>
        <View style={styles.profileUsernameContainer}>
          <Text style={styles.username}>{_id}</Text>
        </View>
          <View style={styles.profileInnerContainer}>
            <View style={styles.profileItem}>
              <Text>Dreams</Text><Text>{this.totalDreams()}</Text>
            </View>
            <View style={styles.profileItem}>
            <Text>Tags</Text><Text>{this.totalTags()}</Text>
            </View>
          </View>
          <TouchableHighlight style={styles.logoutButton} onPress={this._onLogout}>
            <View>
              <Text style={styles.logoutText}> Logout </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profileContainer:{
    flex: .9,
    alignItems: 'center',
    marginHorizontal: '5%',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: .3,
  },
  profileHeader:{
    backgroundColor: '#040F75',
    flex:.3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  settingsTouch: {
    position:'absolute',
    top: '3%',
    right: '3%'
  },
  settingIcon: {
  },
  profileCircle: {
    width:200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#020B5D',
    justifyContent: 'center',
    alignItems:'center',
    shadowOffset: {width: 0, height: 0},
  },
  profileImage:{
    marginBottom: '10%'
  },
  usernameContainer:{
    flex: 1,
    justifyContent: 'center',
  },
  profileInfoContainer: {
    flex:.7,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 1,
    width: '100%',
  },
  profileUsernameContainer:{
    position:'absolute',
    backgroundColor: '#373737',
    top: '-3%',
    width: 200,
    height: 50,
    opacity: .95,
    justifyContent: 'center'
  },
  username:{
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white'
  },
  profileInnerContainer:{
    width: '100%',
    justifyContent:'center',
  },
  profileItem:{
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D1D1CD',
    width: '105%',
    height: '22%',
    paddingHorizontal: '5%',
    marginBottom: 20,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: .4,
  },
  logoutButton:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '15%',
    backgroundColor: '#EB5C87',
    borderRadius: 3,
  },
  logoutText:{
    fontSize: 30,

  }
})
function mapDispatchToProps(dispatch){
  return { Auth: bindActionCreators(AuthActions, dispatch) }
}
function mapStateToProps(state){
  return {
          user: state.user,
          dreams: state.dreams.items
          }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
