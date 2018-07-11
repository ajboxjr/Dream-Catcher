  import React,{Component} from 'react'
//import PropTypes from 'prop-types'
import {View, ActivityIndicator, TextInput, Text, TouchableHighlight, StyleSheet, Animated, KeyboardAvoidingView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';


class AuthForm extends Component{
  constructor(props){
    super(props)
    this._handleLoginClick = this._handleLoginClick.bind(this)
    this._handleSignUpClick = this._handleSignUpClick.bind(this)
    this._handleAuthSwitch = this._handleAuthSwitch.bind(this)
    this.state = {
      username: '',
      password: '',
      verifyPassword: '',
      isLogin: true,
      opacity: new Animated.Value(1)
    }
  }

  _handleLoginClick = () => {
    const { username, password } = this.state
    this.props.onLogin(username, password)
  }

  _handleSignUpClick = () => {
    const { username, password, verifyPassword } = this.state
    this.props.onSignUp(username, password, verifyPassword)
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
    const { username, password, verifyPassword, isLogin } = this.state
    const { error, isAuthenticating } = this.props

    let errorHandler =
      <View style={styles.errorContainer}>
      {error?
        <Text style={styles.errorText}>Error: {error.map((item) => '\n'+item)}</Text>:
        null
      }
      </View>

    let loginHeader=
      <View style={styles.authHeaderContainer}>
        <TouchableHighlight style={[styles.headerTouch, {opacity: isLogin? 1 :.2 }]} onPress={()=> this._handleAuthSwitch(true)}>
          <View style={styles.loginHeaderContainer}>
            <Text style={styles.authHeader}>Login</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.headerTouch, {opacity: isLogin? .2 :1 }]} onPress={()=> this._handleAuthSwitch(false)}>
          <View style={styles.signUpHeaderContainer}>
            <Text style={styles.authHeader}>Sign Up</Text>
          </View>
        </TouchableHighlight>
      </View>

    let loginSignUp = null;
    if (isLogin){
      loginSignUp =
        <View style={styles.loginFormContainer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputBox}
              placeholder="Username"
              onChangeText={(text) => this.setState({username: text.replace(/\s+/, "")})}
              placeholderTextColor='black'
              autoCapitalize='none'
              autoCorrect={false}
              value={username} />
            <TextInput style={styles.inputBox}
              placeholder="Password"
              onChangeText={(text) => this.setState({password: text})}
              value={password}
              placeholderTextColor='black'
              secureTextEntry={true} />

          </View>

          <TouchableHighlight style={styles.loginTouch} disabled={isAuthenticating} onPress={this._handleLoginClick}>
            <View style={styles.loginSignupButton}>
            {isAuthenticating?
              <ActivityIndicator style={styles.loadingIcon} size="small" color="#000000" />:
            <Text style={styles.loginText}>Login</Text>}
            </View>
          </TouchableHighlight>

        </View>
    }
    else{
      loginSignUp =
        <View style={styles.loginFormContainer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputBox}
              placeholder="Username"
              spellCheck={false}
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(text) => this.setState({username: text.replace(/\s+/, "")})}
              placeholderTextColor='black'
              value={username} />
            <TextInput style={styles.inputBox}
              placeholder="Password"
              onChangeText={(text) => this.setState({password: text.replace(/\u0020/, '\u00a0')})}
              value={password}
              placeholderTextColor='black'
              secureTextEntry={true} />
            <TextInput style={styles.inputBox}
              placeholder="Verify Password"
              onChangeText={(text) => this.setState({verifyPassword: text.replace(/\u0020/, '\u00a0')})}
              value={verifyPassword}
              placeholderTextColor='black'
              secureTextEntry={true} />
          </View>
          <TouchableHighlight style={styles.loginTouch} disabled={isAuthenticating} onPress={this._handleSignUpClick}>
            <View style={styles.loginSignupButton}>
              {isAuthenticating?
                <ActivityIndicator style={styles.loadingIcon} size="small" color="#000000" />:
              <Text style={styles.loginText}>Sign Up</Text>}
            </View>
          </TouchableHighlight>
        </View>
    }
    return(
      <View style={styles.container}>
        <Animated.View style={[styles.authFormContainer,{opacity:this.state.opacity}]}>
            <View style={styles.loginContainer}>
              {loginHeader}
                  {loginSignUp}
            </View>
        </Animated.View>
        {errorHandler}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    position:'relative',
    flex:.5,
    width:'100%',
    alignItems:'center',
    justifyContent:'flex-start'
  },
  authFormContainer:{
    flex:.8,
    width: '70%',
    backgroundColor: '#3B4EE3',
  },
  loginContainer: {
    flex:1,
    width:'95%',
  },
  authHeaderContainer:{
    flex: .2,
    flexDirection:'row',
  },
  headerTouch:{
    flex:.5,
    justifyContent:'center',
  },
  loginHeaderContainer:{
    borderBottomWidth:3,
  },
  signUpHeaderContainer:{
    borderBottomWidth:3,
    borderBottomColor:'white',
    alignItems:'flex-end',
  },
  authHeader: {
    fontSize: 26,
  },
  loginFormContainer: {
    flex:.8,
    alignItems:'center',
  },
  inputContainer:{
    flex:.8,
    justifyContent:'flex-start',
    alignItems:'center',
    width: '100%',
  },
  inputBox: {
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
  errorContainer: {
    position: 'absolute',
    bottom: 0,
    flex:1,
    justifyContent:'flex-end',
    marginBottom: '2%',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'white',
    opacity: .9,
  },
  passwordSpecsContainer:{
    position:'absolute',
    top: '100%',
    width: 170,
  },
  passwordSpecs: {
    // textAlign:'center',
  },
  loginTouch:{
    flex:.2,
    justifyContent:'center',
    width:"60%"
  },
  loginSignupButton: {
    flex: 1,
    justifyContent:'center',
    borderRadius:6,
    marginBottom:4,
    backgroundColor: '#11A1CF',
    shadowOpacity: .5,
    shadowOffset: {width: 2, height: 3}

  },
  loginText: {
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
  },
  loadingIcon: {
    alignSelf:'center'
  }
})

export default AuthForm ;