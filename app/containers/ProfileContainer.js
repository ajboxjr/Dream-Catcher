import React,{Component} from 'react'
import {Text, View, TouchableHighlight, StyleSheet, Image,Alert} from 'react-native'
import { StackNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as AuthActions from 'actions/AuthActions';



class ProfileContainer extends Component{
  constructor(props){
    super(props)
    this._onLogout = this._onLogout.bind(this)
    this.totalDreams = this.totalDreams.bind(this)
    this.totalTags = this.totalTags.bind(this)
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
          this.props.Auth.logoutUser()
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
          <Icon style={styles.settingIcon} name='settings' size={40}/>
        </TouchableHighlight>
          <Image style={styles.profileImage} source={{uri: 'https://placeimg.com/150/150/any'}}/>
          <View>
            <Text style={styles.username}>{_id}</Text>
          </View>
        </View>
        <View style={styles.profileInfoContainer}>
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
  },
  profileHeader:{
    flex:2,
    width: '100%',
    alignItems: 'center'
  },
  settingsTouch: {
    position:'absolute',
    top: '3%',
    right: '3%'
  },
  settingIcon: {
  },
  profileImage:{
    marginTop: '5%',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "#EB5C87",
    borderWidth: 2
  },
  usernameContainer:{
    flex: 1,
    justifyContent: 'center',
  },
  username:{
    marginTop: '5%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  profileInfoContainer: {
    flex:3,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 1,
    width: '100%',
  },
  profileInnerContainer:{
    width: '100%',
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
