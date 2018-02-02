import React, {Component} from 'react'
import {Text, View, TouchableOpacity, Image, TouchableHighlight, StyleSheet} from 'react-native'
import { Actions as RouteActions } from 'react-native-router-flux'
class SignUpBox extends Component{
  constructor(props){
    super(props)
    this._onPressButton = this._onPressButton.bind(this)
  }

  _onPressButton = () => {
    //Move to Register Scene
    RouteActions.scene_2()
  }
  render(){
    return(
      <View style={styles.SignUpContainer}>
        <Text style={styles.Or}>or</Text>
        <View style={styles.LineBreak}></View>
        <TouchableHighlight style={styles.SignUpGoogle} onPress={this._onPressButton}>
          <Image style={styles.GoogleImage} source={require('assets/Google_Signin.png')} />
        </TouchableHighlight>
        <TouchableOpacity style={styles.CreateAccountButton} onPress={RouteActions.scene_2}>
          <Text style={styles.CreateAccount}> or, create an account </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  SignUpContainer:{
    flex:1,
    width: 300,
    alignItems:'center',
  },
  LineBreak:{
    position: 'absolute',
    zIndex: -1,
    top: 40, left: 5, right: 5,bottom: 0,
    height: 2,
    width: 280,
    backgroundColor:'white',
  },
  Or: {
    marginTop: 25,
    paddingHorizontal: 5,
    fontSize: 20
  },
  GoogleImage: {
    width: 230,
    height: 50,
  },
  GoogleSignUpButton: {
    marginTop: 20,
    flex:1,
    width: 250,
  },
  SignUpButton: {
    justifyContent: 'flex-end',
  },
  CreateAccountButton: {
  },
  CreateAccount: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  }
})
export default SignUpBox;
