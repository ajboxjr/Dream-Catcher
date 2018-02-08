import React, {Component} from 'react'
import {Text, View, TouchableOpacity, Image, TouchableHighlight, StyleSheet} from 'react-native'
import { Actions as RouteActions } from 'react-native-router-flux'
class GoogleSignIn extends Component{
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
        <View style={styles.LineBreak}>
          <View style={{width: 200,height:1,position:'absolute', backgroundColor:'white'}}/>
          <Text style={styles.Or}>or</Text>
        </View>
        <TouchableHighlight style={styles.SignUpGoogle} onPress={this._onPressButton}>
          <Image style={styles.GoogleImage} source={require('assets/Google_Signin.png')} />
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  SignUpContainer:{
    flex:.15,
    width: 300,
    justifyContent:'center',
    alignItems:'center',
  },
  LineBreak:{
    height: 30,
    width: 280,
    alignItems:'center',
    justifyContent:'center'
  },
  Or: {
    fontSize: 20,
    paddingHorizontal: 2,
    position:'relative',
    backgroundColor: '#3B4EE3',

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
export default GoogleSignIn;
