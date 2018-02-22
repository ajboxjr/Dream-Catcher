  import React,{Component} from 'react'
//import PropTypes from 'prop-types'
import {View, ActivityIndicator, TextInput, Text, TouchableHighlight, StyleSheet, Animated, KeyboardAvoidingView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
class AuthForm extends Component{
  constructor(props){
    super(props)
    this.state= {
      username: '',
      password: '',
      verifyPassword: '',
      isAuthenticating: false,
      isLogin: true,
      opacity: new Animated.Value(1)
    }
    this._handleLoginClick = this._handleLoginClick.bind(this)
    this._handleSignUpClick = this._handleSignUpClick.bind(this)
    this._handleAuthSwitch = this._handleAuthSwitch.bind(this)
  }
  componentWillMount(){
    this.setState({isAuthenticating: this.props.isLoading})
  }

  _handleLoginClick = () => {
    const { username, password } = this.state
    this.props.onLogin(username, password)
  }
  _handleSignUpClick = () => {
    const { username, password, verifyPassword } = this.state
    this.props.onSignUp(username,password,verifyPassword)
  }
  _handleAuthSwitch = (isLoginBool) => {
    setTimeout(()=> {
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
    ]).start(()=>{
    })
  }
  render(){
    const { username, password, verifyPassword, isLogin, isAuthenticating } = this.state

    let loginHeader = null
    loginHeader=
    <View style={styles.AuthHeaderContainer}>
      <TouchableHighlight style={[styles.HeaderTouch, {opacity: isLogin? 1 :.2 }]} onPress={()=> this._handleAuthSwitch(true)}>
        <View style={styles.LoginHeaderContainer}>
          <Text style={styles.AuthHeader}>Login</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight style={[styles.HeaderTouch, {opacity: isLogin? .2 :1 }]} onPress={()=> this._handleAuthSwitch(false)}>
        <View style={styles.SignUpHeaderContainer}>
          <Text style={styles.AuthHeader}>Sign Up</Text>
        </View>
      </TouchableHighlight>
    </View>
    let loginSignUp = null;
    if (isLogin){
      loginSignUp =
      <View style={styles.LoginFormContainer}>
        <View style={styles.InputContainer}>
          <TextInput style={styles.InputBox}
            placeholder="Username"
            onChangeText={(text) => this.setState({username: text})}
            placeholderTextColor='black'
            value={username} />
          <TextInput style={styles.InputBox}
            placeholder="Password"
            onChangeText={(text) => this.setState({password: text})}
            value={password}
            placeholderTextColor='black'
            secureTextEntry={true} />
        </View>

        <TouchableHighlight style={styles.LoginTouch} onPress={this._handleLoginClick}>
          <View style={styles.LoginSignupButton}>
          {isAuthenticating?
            <ActivityIndicator style={styles.loadingIcon} size="small" color="#0000ff" />:
          <Text style={styles.LoginText}>Login</Text>}
          </View>
        </TouchableHighlight>
      </View>
    }
    else{
      loginSignUp = <View style={styles.LoginFormContainer}>
        <View style={styles.InputContainer}>
          <TextInput style={styles.InputBox}
            placeholder="Username"
            spellCheck={false}
            onChangeText={(text) => this.setState({username: text})}
            placeholderTextColor='black'
            value={username} />
          <TextInput style={styles.InputBox}
            placeholder="Password"
            onChangeText={(text) => this.setState({password: text})}
            value={password}
            placeholderTextColor='black'
            secureTextEntry={true} />
          <TextInput style={styles.InputBox}
            placeholder="Verify Password"
            onChangeText={(text) => this.setState({verifyPassword: text})}
            value={verifyPassword}
            placeholderTextColor='black'
            secureTextEntry={true} />
        </View>
        <TouchableHighlight style={styles.LoginTouch} onPress={this._handleSignUpClick}>
          <View style={styles.LoginSignupButton}>
            {isAuthenticating?
              <ActivityIndicator style={styles.loadingIcon} size="small" color="#0000ff" />:
            <Text style={styles.LoginText}>Sign Up</Text>}
          </View>
        </TouchableHighlight>
      </View>
    }
    return(
      <View style={styles.Container}>
        <Animated.View style={[styles.AuthFormContainer,{opacity:this.state.opacity}]}>
            <View style={styles.LoginContainer}>
              {loginHeader}
                  {loginSignUp}
            </View>
        </Animated.View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  Container: {
    position:'relative',
    //top
    flex:.5,
    width:'100%',
    alignItems:'center',
    justifyContent:'flex-start'
  },
  AuthFormContainer:{
    flex:.8,
    width: '70%',
    // borderWidth:1,
    // borderRadius:4,
    backgroundColor: '#3B4EE3',
  },
  LoginContainer: {
    flex:1,
    width: '95%',
  },
  AuthHeaderContainer:{
    flex: .2,
    flexDirection:'row',
  },
  HeaderTouch:{
    flex:.5,
    justifyContent:'center',
  },
  LoginHeaderContainer:{
    borderBottomWidth:3,
  },
  SignUpHeaderContainer:{
    borderBottomWidth:3,
    borderBottomColor:'white',
    alignItems:'flex-end',
  },
  AuthHeader: {
    fontSize: 26,
  },
  LoginFormContainer: {
    flex:.8,
    alignItems:'center',
  },
  InputContainer:{
    flex:.8,
    justifyContent:'flex-start',
    alignItems:'center',
    width: '100%',
  },
  InputBox: {
    marginTop: 10,
    height: 30,
    width: '80%',
    backgroundColor: 'white',
    color: 'black',
    textAlign:'center',
    borderRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: "white",
    fontSize: 20,
    shadowOpacity: .5,
    shadowOffset: {width: 2, height: 3}
  },
  LoginTouch:{
    flex:.2,
    justifyContent:'center',
    width:"40%"

  },
  LoginSignupButton: {
    flex:1,
    justifyContent:'center',
    borderRadius:3,
    marginBottom:4,
    backgroundColor: '#11A1CF',
    shadowOpacity: .5,
    shadowOffset: {width: 2, height: 3}

  },
  LoginText: {
    fontSize: 16,
    textAlign: 'center',
  },
  loadingIcon: {
    alignSelf:'center'
  }
})

export default AuthForm ;
