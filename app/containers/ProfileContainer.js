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
    this.getDimensions = this.getDimensions.bind(this)
    this.getLayout = this.getLayout.bind(this)
    this.state = {
      profH: 0,
      profW: 0
    }
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

  getLayout = ({width, height}) =>{
    console.log(width, height);
    this.setState({profW:width, profH: height});
  }
  getDimensions = (increase) =>{
    const { profH } = this.state;
    return {
      width: profH+increase,
      height: profH+increase,
      borderRadius: profH+increase/2
    }
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
        <View onLayout= {(event) => this.getLayout(event.nativeEvent.layout)} style={styles.profileHeader}>
          <TouchableHighlight style={styles.settingsTouch} onPress={this._handleSceneChange}>
            <Icon style={styles.settingIcon} name='settings' color='#333F4F' size={40}/>
          </TouchableHighlight>
          <View style={[this.getDimensions(5) ,styles.innerCircle]}>
            <Image style={styles.profileImage} source={require('../assets/cloud.png')} />
          </View>
          <BubbleProfile getDimensions={this.getDimensions}/>
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
    backgroundColor: '#FFFFFF',
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
  innerCircle: {
    position:'absolute',
    borderRadius: 100,
    backgroundColor: '#020B5D',
    zIndex: 2,
    justifyContent:'center',
    alignItems:'center'
  },
  profileImage:{
    marginBottom: '10%'
  },
  settingsTouch: {
    position:'absolute',
    top: '3%',
    right: '3%',
    zIndex: 2,
  },
  settingIcon: {
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
    top: '-4%',
    width: 200,
    height: 50,
    opacity: .95,
    justifyContent: 'center',
    borderRadius: 4,
  },
  username:{
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF'
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
    height: '12%',
    backgroundColor: '#EB5C87',
    borderRadius: 3,
  },
  logoutText:{
    fontSize: 30,
    color: 'white'

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
