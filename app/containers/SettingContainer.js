import React, { Component } from 'react'
import { Modal, View, StyleSheet, Text, Image, TextInput, TouchableWithoutFeedback, TouchableHighlight, Alert } from 'react-native'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as AuthActions from '../../app/actions/AuthActions';

import DeleteAccountModal from '../components/DeleteAccountModal'


class SettingContainer extends Component{
  constructor(props){
    super(props)
    this._handleSceneChange = this._handleSceneChange.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.state ={
      oldPass: '',
      passInput: '',
      isNewPassword: false,
      passPlaceholder: '',
      displayModal: false,
    }
  }
  componentDidUpdate(){
    if (this.props.user.passwordChanged){
      Alert.alert(
        'Password Changed',
        'Password Sucessfully Changed!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ],
        { cancelable: false })
    }
  }

  toggleModal = () => {
    console.log('this');
    this.setState({ displayModal: !this.state.displayModal })
  }

  _handleSceneChange = () =>{
    this.props.navigation.pop()
  }

  _handleDeleteAccount = (password) => {
    console.log(password);
    this.props.Auth.DeleteUserAccount(password)
  }

  changePassword = () => {
    const { old,passInput } = this.state
    if (passInput.length == 0){
      //Change the box red and placeholder to enter password
    }
    else {
      //Check password
      if (this.state.isNewPassword){
        // console.log(old, passInput);
        this.props.Auth.ChangeUserPassword(old, passInput)
        this.setState({passInput: '', isNewPassword: true});
      }
      else {
          this.setState({isNewPassword: true, old: passInput, passInput: ''});
      }
      //clear password and placeholder to new password
    }
  }
  render(){
    const {_id} = this.props.user;

    return (
      <View style={styles.container}>
        <DeleteAccountModal
          onDelete={this._handleDeleteAccount}
          visible={this.state.displayModal}
          error={this.props.user.error}
          onClose={this.toggleModal}/>
        <View style={styles.settingHeaderContainer}>
          <TouchableWithoutFeedback onPress={this._handleSceneChange}>
            <View style={styles.backTouch}>
            <Icon name="keyboard-arrow-left" size={30}/>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.settingsHeader}>Settings</Text>
        </View>
        <View style={styles.settingsSection}>
          <View style={styles.UserContainer}>
            <Text style={styles.userHeader}>User Settings</Text>
            <View style={styles.settingItems}>
              <View style={styles.authInfo}>
                <TextInput style={[styles.loginInput, styles.username]} editable={false} placeholder={_id}/>
                <TextInput onChangeText={(text) => this.setState({passInput: text})}
                  value={this.state.passInput} style={[styles.loginInput, styles.password]}
                  placeholder={this.state.passPlaceholder}/>
              </View>
              <View style={styles.changePasswordContainer}>
                <View style={styles.changePasswordButton}>
                  <TouchableWithoutFeedback onPress={this.changePassword}>
                    <View>
                      <Text style={styles.changePasswordText}> Change Password </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
            <Text style={{textAlign:'left'}}>{this.props.user.error}</Text>
          </View>
          <View style={styles.footerContainer}>
            <View style={styles.deleteAccount}>
              <TouchableWithoutFeedback onPress={this.toggleModal}>
                <View style={styles.deleteTextWrapper}>
                  <Text style={styles.deleteText}>Delete Account </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.versionWrapper}>
              <View style={styles.versionContainer}>
                <View style={styles.versionItem}>
                <Text style={styles.underline}>Version</Text>
                </View>
                <View style={styles.versionItem}>
                <Text>1.0</Text>
                </View>
              </View>
            </View>
            <View style={styles.ropycight}>
              <Text style={styles.ropycightText}> Created By Anthony Box 2018</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
SettingContainer.defaultProps = {
  user: {
    _id: 'username'
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
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  userHeader: {
    marginTop: 30,
    margin: 10,
    fontSize: 20,
    textDecorationLine: 'underline'
  },
  backTouch:{
    position: 'absolute',
    top: '50%',
    left: '0%',
  },
  settingItems:{
    flexDirection: 'row',
    borderColor: 'black',
    width: '100%',
    height: 90,
    backgroundColor: '#E0E0E0'
  },
  authInfo:{
    marginLeft: '3%',
    justifyContent: 'space-around',
    width: '70%',
    height: '100%',
  },
  username: {
    backgroundColor: '#9A9A9A',
  },
  password: {
    backgroundColor: '#FFFFFF',
  },
  loginInput:{
    paddingLeft: 5,
    borderRadius: 3,
    height: 35,
  },
  changePasswordContainer: {
    width:'28%',
    justifyContent:'flex-end'
  },
  changePasswordButton: {
    marginHorizontal: 4,
    marginBottom: 4,
    height: 35,
    borderRadius: 5,
    justifyContent:'flex-end',
    backgroundColor: '#A6D9F7',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  changePasswordText:{
    alignSelf:'center',
    textAlign:'center',
  },
  versionWrapper: {
    height: 40,
    backgroundColor: '#E0E0E0',
  },
  versionContainer: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  versionItem: {
    width: '50%', height: '100%',
    justifyContent:'center', alignItems:'center',
    borderColor: 'black'
  },
  footerContainer:{
    height: 130,
    justifyContent: 'space-around'
  },
  deleteAccount: {
    alignSelf:'center',
    height: 50,
    width: 250,
    backgroundColor: "#FF0000",
    borderRadius: 10,
  },
  deleteTextWrapper:{
    flexDirection: 'column',
    justifyContent: 'center',
    height:'100%',
  },
  deleteText: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    fontWeight: "600",
  },
  ropycight: {

  },
  ropycightText:{
    textAlign:'center',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  underline : {
    textDecorationLine: 'underline',
  }
})
function mapStateToProps(state){
  return{
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return {
        Auth: bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer);
