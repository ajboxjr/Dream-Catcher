import React,{ Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RegisterForm from 'components/RegisterForm'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as DreamActions from 'actions/DreamActions';
import * as AuthActions from 'actions/AuthActions';

class RegisterContainer extends Component{
  constructor(props){
    super(props)
    this._handleRegister = this._handleRegister.bind(this)
  }
  _handleRegister = (username, password) => {
    if (username !== '' && password !== ''){
      //JWT authentication
      // Returns The HTTP Reponse as Json, then returns the token as json
      this.props.Auth.SignupUser(username, password)
      //RouteActions.tabbbar()
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <RegisterForm onRegister={this._handleRegister}/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-start'
  }
})
function mapStateToProps(state){
  return { user: this.state}
}

function mapDispatchToProps(dispatch){
  return { Dream: bindActionCreators(DreamActions, dispatch),
          Auth: bindActionCreators(AuthActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
