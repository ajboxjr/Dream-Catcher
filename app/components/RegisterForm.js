import React,{ Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import RegisterContainer from 'containers/RegisterContainer'

class RegisterForm extends Component{
  constructor(props){
    super(props)
    this.state= {
      username: '',
      password: ''
    }
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
  }
  _handleFormSubmit = () =>{
    const { username, password } = this.state
    this.props.onRegister(username,password)
  
  }

  render(){
    const { username, password } = this.state
    return(
      <View style={styles.container}>
        <Text style={styles.SignUpHeader}>Start Dreaming!</Text>
        <TextInput style={styles.InputBox}
          placeholder="Username"
          onChangeText={(text) => this.setState({username: text})}
          value={username} />
        <TextInput style={styles.InputBox}
          placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
          value={password}
          secureTextEntry={true} />
        <TouchableHighlight style={styles.LoginButton} onPress={this._handleFormSubmit}>
          <Text style={styles.LoginText}>Sign UP</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
  },
  SignUpHeader: {
    marginBottom: 30,
    fontSize: 36,
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
    width: 80,
    height: 100,
    borderWidth: 1,
  },
  LoginText: {
    fontSize: 16,
    textAlign: 'center'
  },
})

export default RegisterForm;
