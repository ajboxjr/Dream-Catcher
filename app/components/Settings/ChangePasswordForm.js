import {View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, Animated } from 'react-native';
import React, {Component} from 'react';

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);
    // this.changePassword = this.changePassword.bind(this)
    this.handlePasswordErrorAnimation = this.handlePasswordErrorAnimation.bind(this)

    this.state = {
      oldPass: '',
      passInput: '',
      isNewPassword: false,
      passPlaceholder: '',
      borderWidth: new Animated.Value(0)
    }
  }

  /*
    Animmate password on empty field
  */
  handlePasswordErrorAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.borderWidth,{
        duration: 400,
        toValue: 2
      }),
      Animated.timing(this.state.borderWidth,{
        duration: 400,
        toValue: 0
      })
    ]).start()
  }
  /*
  */
  changePassword = () => {
    const {old, passInput} = this.state
    if (passInput.length == 0) {
      //Change the box red and placeholder to enter password
      this.handlePasswordErrorAnimation()
    } else {
      //Check password
      if (this.state.isNewPassword) {
        this.props.onSubmit(old, passInput)
        this.setState({passInput: '', isNewPassword: true});
      } else {
        this.setState({isNewPassword: true, old: passInput, passInput: ''});
      }
      //clear password and placeholder to new password
    }
  }

  render() {
    const {id, password, error} = this.props
    return (<View style={styles.UserContainer}>
      <Text style={styles.userHeader}>User Settings</Text>
      <View style={styles.settingItems}>
        <View style={styles.authInfo}>
          <TextInput style={[styles.loginInput, styles.username]} editable={false} placeholder={id}/>
          <Animated.View style={[{borderColor: 'red', borderWidth: this.state.borderWidth }]}>
          <TextInput onChangeText={(text) => this.setState({passInput: text})} value={this.state.passInput} style={[styles.loginInput, styles.password]} placeholder={this.state.passPlaceholder}/>
          </Animated.View>
        </View>
        <View style={styles.changePasswordContainer}>
          <View style={styles.changePasswordButton}>
            <TouchableWithoutFeedback onPress={this.changePassword}>
              <View style={this.changePasswordView}>
                <Text style={styles.changePasswordText}>
                  Change Password
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <View style={{
          height: 70,
          backgroundColor: "#5A5A5A"
        }}>
        <Text style={{
            textAlign: 'center'
          }}>{error}</Text>
      </View>
    </View>)
  }
}

const styles = StyleSheet.create({
  userHeader: {
    marginTop: 30,
    margin: 10,
    fontSize: 20,
    fontWeight: "700",
    textDecorationLine: 'underline'
  },
  backTouch: {
    position: 'absolute',
    top: '50%',
    left: '0%'
  },
  settingItems: {
    flexDirection: 'row',
    borderColor: 'black',
    width: '100%',
    height: 100,
    backgroundColor: '#E0E0E0'
  },
  authInfo: {
    padding: 3,
    // borderWidth:1,
    marginLeft: '3%',
    justifyContent: 'space-around',
    width: '70%',
    height: '100%'
  },
  username: {
    backgroundColor: '#9A9A9A'
  },
  password: {
    backgroundColor: '#FFFFFF'
  },
  loginInput: {
    paddingLeft: 5,
    borderRadius: 3,
    height: 35
  },
  changePasswordContainer: {
    width: '28%',
    justifyContent: 'flex-end'
  },
  changePasswordButton: {
    marginHorizontal: '8%',
    marginBottom: '7%',
    height: 35,
    borderRadius: 5,
    justifyContent: 'flex-end',
    backgroundColor: '#A6D9F7',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  changePasswordView: {
    borderWidth: 1,
    marginBottom: '5%'
  },
  changePasswordText: {
    alignSelf: 'center',
    textAlign: 'center'
  }
});

export default ChangePasswordForm;
