import React,{ Component } from 'react'
import { View, StyleSheet,Text,Image } from 'react-native'
import { Actions as RouteActions } from 'react-native-router-flux';
import {Login} from 'api/Api'
import GoogleSignIn from 'components/GoogleSignIn'
import AuthForm from 'components/AuthForm'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as DreamActions from 'actions/DreamActions';
import * as AuthActions from 'actions/AuthActions';

class LoginContainer extends Component{
  constructor(props){
    super(props)
    this._handleLogin = this._handleLogin.bind(this)
    this._handleSignUp = this._handleSignUp.bind(this)
  }
  //Should be a api function to check if user is logged in, for now check if token

  _handleLogin = (username, password) => {
    console.log(username);
    if (username !== '' && password !== ''){
      //JWT authentication
      // Returns The HTTP Reponse as Json, then returns the token as json
      this.props.Auth.LoginUser(username, password)
    }
  }
  _handleSignUp = (username,password,verifyPassword) => {
    if (username !== '' && password !== ''){
      //JWT authentication
      // Returns The HTTP Reponse as Json, then returns the token as json
      if (password ===  verifyPassword){
        this.props.Auth.SignupUser(username, password)
      }
      //RouteActions.tabbbar()
    }
  }


  render(){
    const { isAuthenticating } = this.props.user
    return(
        <View style={styles.LoginContainer}>
          <View style={styles.ImageContainer}>
            <View style={styles.LogoContainer}>
            <Image style={styles.Logo} source={require('assets/Dream_Catcher.png')} />
            </View>
          </View>
          <AuthForm
          isAuthenticating={this.props.user.isAuthenticating}
          onLogin={this._handleLogin}
          onSignUp={this._handleSignUp}/>
          <GoogleSignIn />
        </View>
    )
  }
}
  const styles = StyleSheet.create({
    LoginContainer:{
      flex:1,
      borderWidth: 1,
      width:'100%',
      alignItems:'center',
    },
    ImageContainer:{
      flex:.40,
      justifyContent:'center',
      alignItems:'center'
    },
    LogoContainer:{
      flex:.75,
      justifyContent:'flex-end'

    },
    Logo : {
      flex:1,
      justifyContent: 'center',
      resizeMode: 'contain'
    },
    Slogan:{
      flex:1,
      textAlign: 'center',
      paddingTop: '5%',
      fontSize: 24
    },

  })

  function mapStateToProps(state){
    return{user: state.user}
  }

  function mapDispatchToProps(dispatch){
    return {
          Dream: bindActionCreators(DreamActions, dispatch),
          Auth: bindActionCreators(AuthActions, dispatch)
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
