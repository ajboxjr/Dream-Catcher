import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, TextInput, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions as RouteActions } from 'react-native-router-flux'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as AuthActions from 'actions/AuthActions';

class SettingContainer extends Component{
  constructor(props){
    super(props)
    this._handleSceneChange = this._handleSceneChange.bind(this)
    this.state ={
      old: '',
      password: '',
      isNewPassword: 'false'
    }
  }
  _handleSceneChange = () =>{
    RouteActions.pop()
  }
  // changePassword = () => {
  //   if (this.password.length == 0){
  //     //Change the box red and placeholder to enter password
  //   }
  //   else {
  //     //Check password
  //     if (this.state.isNewPassword){
  //       Auth.changePassword(old, newPassword)
  //     }
  //     else {
  //       if Auth.checkPassword(this.password){
  //         this.setState({setNewPassword: true})
  //         //clear password and placeholder to new password
  //       }
  //       else {
  //         // placeholder to wrong password
  //       }
  //     }
  //   }
  // }
  render(){
    const {_id} = this.props.user;

    return (
      <View style={styles.container}>
        <View style={styles.settingHeaderContainer}>
          <TouchableWithoutFeedback onPress={this._handleSceneChange}>
            <Icon style={styles.backTouch} name="keyboard-arrow-left" size={30}/>
          </TouchableWithoutFeedback>
          <Text style={styles.settingsHeader}>Settings</Text>
        </View>
        <View style={styles.settingsSection}>
          <Text>User Settings</Text>
          <View style={styles.settingItems}>
            <View style={styles.authInfo}>
              <TextInput style={[styles.loginInput, styles.username]} placeholder={_id}/>
              <TextInput ref={ref => this.password = ref} style={[styles.loginInput, styles.password]} placeholder="Old Password"/>
            </View>
            <View style={styles.changePasswordContainer}>
              <View style={styles.changePasswordButton}>
                <TouchableWithoutFeedback onPress={this.changePassword}>
                  <Text style={styles.changePasswordText}> Change Password </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
          <View style={styles.settingItems}>
            <View style={styles.versionContainer}>
              <View style={styles.versionItem}>
              <Text>Version</Text>
              </View>
              <View style={styles.versionItem}>
              <Text>1.0</Text>
              </View>
            </View>
          </View>
          <View style={styles.deleteAccount}>
            <TouchableWithoutFeedback>
              <View>
                <Text>Delete Account </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:.9,
    backgroundColor: "white",
    width: '90%',
    alignItems:'center'
  },
  settingHeaderContainer:{
    flex:.1,
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'center',
    width: '80%',
    borderBottomWidth:1,
  },
  settingsHeader:{
    fontSize: 30,
    textAlign:'center',
    fontWeight: "200",
  },
  settingsSection: {
    flex:.9,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black'
  },
  backTouch:{
    position: 'absolute',
    top: '50%',
    left: '0%',
  },
  settingItems:{
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    height: 90,
    backgroundColor: '#8CABBE'
  },
  authInfo:{
    marginLeft: '2%',
    justifyContent: 'space-around',
    width: '70%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'black',
  },
  username: {
    backgroundColor: '#E0E0E0',
  },
  password: {
    backgroundColor: '#FFFFFF',
  },
  loginInput:{
    borderRadius: 3,
    height: 35,
  },
  changePasswordContainer: {
    width:'28%',
    borderWidth: 1,
    borderColor: 'black',
    justifyContent:'flex-end'
  },
  changePasswordButton: {
    margin: 2,
    height: 40,
    borderRadius: 5,
    justifyContent:'flex-end',
    backgroundColor: '#A6D9F7',
  },
  changePasswordText:{
    alignSelf:'center',
    textAlign:'center',
  },
  versionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  versionItem: {
    width: '50%', height: '100%',borderWidth: 1,
    justifyContent:'center', alignItems:'center',
    borderColor: 'black'
  }
})
function mapStateToProps(state){
  return{user: state.user}
}

function mapDispatchToProps(dispatch){
  return {
        Auth: bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer);


// export default SettingContainer;
