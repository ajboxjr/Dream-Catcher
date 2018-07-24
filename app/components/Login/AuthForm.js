import React, {Component} from 'react'
//import PropTypes from 'prop-types'
import {
  View,
  ActivityIndicator,
  TextInput,
  Text,
  TouchableHighlight,
  StyleSheet,
  Animated
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';

import LoginHeader from './LoginHeader'

/*
  replace(/\u0020/, '\u00a0') spaces with no break spaces...
*/
class AuthForm extends Component {
  constructor(props) {
    super(props)
    //Login Button
    this._handleLoginClick = this._handleLoginClick.bind(this)
    //Signup Button
    this._handleSignUpClick = this._handleSignUpClick.bind(this)
    //Switch Login/Signup
    this._handleAuthSwitch = this._handleAuthSwitch.bind(this)
    //Login Signup compoents
    this.loginSignUp = this.loginSignUp.bind(this)
    this.state = {
      username: '',
      password: '',
      verifyPassword: '',
      isLogin: true,
      opacity: new Animated.Value(1)
    }
  }

  /*
    Send username,password to parent for dispatch
  */
  _handleLoginClick = () => {
    const {username, password} = this.state
    this.props.onLogin(username, password)
  }

  /*
    Send username, passsword to parent for dispatch
  */
  _handleSignUpClick = () => {
    const {username, password, verifyPassword} = this.state
    this.props.onSignUp(username, password, verifyPassword)
  }

  /*
    toogle login signup portal
  */
  _handleAuthSwitch = (isLoginBool) => {
    setTimeout(() => {
      this.setState({isLogin: isLoginBool})
    }, 250);
    Animated.sequence([
      Animated.timing(this.state.opacity, {
        duration: 250,
        toValue: 0
      }),
      Animated.timing(this.state.opacity, {
        duration: 300,
        toValue: 1
      })
    ]).start(() => {})
  }

  /*
    Toggle Login Signup containers
  */
  loginSignUp(isLogin) {
    const {username, password, verifyPassword, isAuthenticating} = this.state
    return (
      isLogin
      ? <View style={styles.loginFormContainer}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputBox} placeholder="Username" onChangeText={(text) => this.setState({
              username: text.replace(/\s+/, "")
            })} placeholderTextColor='black' autoCapitalize='none' autoCorrect={false} value={username}/>
          <TextInput style={styles.inputBox} placeholder="Password" onChangeText={(text) => this.setState({password: text})} value={password} placeholderTextColor='black' secureTextEntry={true}/>

        </View>

        <TouchableHighlight style={styles.loginTouch} disabled={isAuthenticating} onPress={this._handleLoginClick}>
          <View style={styles.loginSignupButton}>
            {
              isAuthenticating
                ? <ActivityIndicator style={styles.loadingIcon} size="small" color="#000000"/>
                : <Text style={styles.loginText}>Login</Text>
            }
          </View>
        </TouchableHighlight>
      </View>
      : <View style={styles.loginFormContainer}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputBox} placeholder="Username" spellCheck={false} autoCapitalize='none' autoCorrect={false} onChangeText={(text) => this.setState({
              username: text.replace(/\s+/, "")
            })} placeholderTextColor='black' value={username}/>
          <TextInput style={styles.inputBox} placeholder="Password" onChangeText={(text) => this.setState({
              password: text.replace(/\u0020/, '\u00a0')
            })} value={password} placeholderTextColor='black' secureTextEntry={true}/>
          <TextInput style={styles.inputBox} placeholder="Verify Password" onChangeText={(text) => this.setState({
              verifyPassword: text.replace(/\u0020/, '\u00a0')
            })} value={verifyPassword} placeholderTextColor='black' secureTextEntry={true}/>
        </View>
        <TouchableHighlight style={styles.loginTouch} disabled={isAuthenticating} onPress={this._handleSignUpClick}>
          <View style={styles.loginSignupButton}>
            {
              isAuthenticating
                ? <ActivityIndicator style={styles.loadingIcon} size="small" color="#000000"/>
                : <Text style={styles.loginText}>Sign Up</Text>
            }
          </View>
        </TouchableHighlight>
      </View>)

  }

  render() {
    const {isLogin} = this.state
    const {error} = this.props

    let errorHandler = <View style={styles.errorContainer}>
      {
        error
          ? <Text style={styles.errorText}>Error: {error.map((item) => '\n' + item)}</Text>
          : null
      }
    </View>

    return (<View style={styles.container}>
      <Animated.View style={[
          styles.authFormContainer, {
            opacity: this.state.opacity
          }
        ]}>
        <View style={styles.loginContainer}>
        <LoginHeader switchLogin={(bool) => this._handleAuthSwitch(bool)} isLogin={this.state.isLogin}/>
          {this.loginSignUp(isLogin)}
        </View>
      </Animated.View>
      {errorHandler}
    </View>)
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: .5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  authFormContainer: {
    flex: .8,
    width: '70%',
    backgroundColor: '#3B4EE3'
  },
  loginContainer: {
    flex: 1,
    width: '95%'
  },
  loginFormContainer: {
    flex: .8,
    alignItems: 'center'
  },
  inputContainer: {
    flex: .8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  inputBox: {
    marginTop: 10,
    height: 30,
    width: '80%',
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center',
    borderRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: "white",
    fontSize: 20,
    shadowOpacity: .5,
    shadowOffset: {
      width: 2,
      height: 3
    }
  },
  errorContainer: {
    position: 'absolute',
    bottom: 0,
    height: 30,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '2%'
  },
  errorText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'white',
    opacity: .9
  },
  passwordSpecsContainer: {
    position: 'absolute',
    top: '100%',
    width: 170
  },
  passwordSpecs: {
    // textAlign:'center',
  },
  loginTouch: {
    flex: .2,
    justifyContent: 'center',
    width: "60%"
  },
  loginSignupButton: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: 4,
    backgroundColor: '#11A1CF',
    shadowOpacity: .5,
    shadowOffset: {
      width: 2,
      height: 3
    }

  },
  loginText: {
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center'
  },
  loadingIcon: {
    alignSelf: 'center'
  }
})

export default AuthForm;
