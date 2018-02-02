import React,{ Component } from 'react'
import { Text, TextInput, Image, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native'
import { Actions as RouteActions} from 'react-native-router-flux';
import LoginContainer from 'containers/LoginContainer'

class LoginScene extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.ImageContainer}>
          <Image style={styles.Logo} source={require('assets/Dream_Catcher.png')} />
          <Text style={styles.Slogan}> Remember Your Dreams...</Text>
          <LoginContainer />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#3B4EE3',
    flex:1,
    alignItems: 'center',
  },
  ImageContainer:{
    flex:4,
  },
  Logo : {
    justifyContent: 'center',
    marginTop: 60,
  },
  Slogan:{
    flex:1,
    textAlign: 'center',
    paddingTop: 40,
    fontSize: 24
  },
})
export default LoginScene;
