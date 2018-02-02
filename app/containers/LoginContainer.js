import React,{ Component } from 'react'
import { ActivityIndicator, View, StyleSheet,Text } from 'react-native'
import { Actions as RouteActions } from 'react-native-router-flux';
import {Login} from 'api/Api'
import LoginForm from 'components/LoginForm'
import SignUpBox from 'components/SignUpBox'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as DreamActions from 'actions/DreamActions';
import * as AuthActions from 'actions/AuthActions';

class LoginContainer extends Component{
  constructor(props){
    super(props)
    this._handleLogin = this._handleLogin.bind(this)
  }
  //Should be a api function to check if user is logged in, for now check if token

  _handleLogin = (username, password) => {
    if (username !== '' && password !== ''){
      //JWT authentication
      // Returns The HTTP Reponse as Json, then returns the token as json
      this.props.Auth.LoginUser(username, password)
    }
  }

  render(){
    const { isAuthenticating } = this.props.user
    return(
      <View style={styles.Container}>
      {this.props.user.isAuthenticating ?
         <ActivityIndicator size="large" color="#0000ff" /> :
         null}
        <LoginForm onLogin={this._handleLogin}/>
        <SignUpBox />
      </View>
    )
  }
}
  const styles = StyleSheet.create({
    Container: {
      flex: 4,
      alignItems: 'center'
    },
    loading: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center'
    }
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
