import React,{ Component } from 'react'
import { Text, TextInput, Image, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native'
import { Actions as RouteActions} from 'react-native-router-flux';
import LoginContainer from 'containers/LoginContainer'
import GoogleSignIn from 'components/GoogleSignIn'

class LoginScene extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.ImageContainer}>
          <Image style={styles.Logo} source={require('assets/Dream_Catcher.png')} />
        </View>
        <LoginContainer />
        <GoogleSignIn />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#3B4EE3',
    flex:1,
    alignItems: 'center',
    justifyContent:'space-between'
  },
  ImageContainer:{
    flex:.5,
    justifyContent:'center'
  },
  Logo : {
    justifyContent: 'center',
  },
  Slogan:{
    flex:1,
    textAlign: 'center',
    paddingTop: '5%',
    fontSize: 24
  },
})
export default LoginScene;
