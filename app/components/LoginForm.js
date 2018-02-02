import React,{Component} from 'react'
//import PropTypes from 'prop-types'
import {View, TextInput, Text, TouchableHighlight, StyleSheet} from 'react-native'

class LoginForm extends Component{
  constructor(props){
    super(props)
    this.state= {
      username: '',
      password: ''
    }
    this._handleLoginClick = this._handleLoginClick.bind(this)
  }
  _handleLoginClick = () => {
    const { username, password } = this.state
    this.props.onLogin(username, password)
  }
  render(){
    const { username, password } = this.state
    return(
      <View style={styles.LoginContainer}>
        <TextInput style={styles.InputBox}
          placeholder="Username"
          onChangeText={(text) => this.setState({username: text})}
          value={username} />
        <TextInput style={styles.InputBox}
          placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
          value={password}
          secureTextEntry={true} />
        <TouchableHighlight onPress={this._handleLoginClick}>
          <View style={styles.LoginButton}>
            <Text style={styles.LoginText}>Login</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  LoginContainer: {
    flex:1,
    width: 240,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  InputBox: {
    marginTop: 15,
    height: 40,
    width: 230,
    backgroundColor: 'rgba(255,255,255,.3)',
    color: 'white',
    borderRadius: 3,
    borderBottomWidth: 3,
    borderBottomColor: "white",
    fontSize: 24,
  },
  LoginButton: {
    borderWidth: 1,
    width: '90%',
    height: '80%',
  },
  LoginText: {
    fontSize: 16,
    textAlign: 'center'
  },
})

export default LoginForm;
