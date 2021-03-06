import React, {Component} from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {NavigationActions} from 'react-navigation'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as DreamActions from '../actions/DreamActions';
import * as AuthActions from '../actions/AuthActions';

import AuthForm from '../components/Login/AuthForm'

class LoginContainer extends Component {
  constructor(props) {
    super(props)
    this._handleLogin = this._handleLogin.bind(this)
    this._handleSignUp = this._handleSignUp.bind(this)
  }

  /*
    Dispatch Login user
  */
  componentWillMount() {
    console.log('mounted');
    this.props.Auth.TokenLoginUser()
  }

  /*
    Should be a api function to check if user is logged in, for now check if token
  */
  _handleLogin = (username, password) => {
    console.log(username);
    if (username !== '' && password !== '') {
      //JWT authentication
      // Returns The HTTP Reponse as Json, then returns the token as json
      this.props.Auth.LoginUser(username, password)
    }
  }

  /*
    Sign in User
  */
  _handleSignUp = (username, password, verifyPassword) => {
    if (username !== '' && password !== '') {
      //JWT authentication
      // Returns The HTTP Reponse as Json, then returns the token as json
      this.props.Auth.SignupUser(username, password, verifyPassword)
    }
  }

  render() {
    const {isAuthenticating} = this.props.user
    return (<View style={styles.loginContainer}>
      <View style={styles.imageContainer}>

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/Dream_Catcher.png')}/>
        </View>

      </View>
      <AuthForm error={this.props.user.error} isAuthenticating={this.props.user.isAuthenticating} onLogin={this._handleLogin} onSignUp={this._handleSignUp}/>
    </View>)
  }
}
const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  imageContainer: {
    flex: .40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    flex: .75,
    justifyContent: 'flex-end'
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'contain'
  }
})

function mapStateToProps(state) {
  return {user: state.user}
}

function mapDispatchToProps(dispatch) {
  return {
    Dream: bindActionCreators(DreamActions, dispatch),
    Auth: bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
