import React,{ Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native'
import { Actions as RouteActions} from 'react-native-router-flux';
import LoginContainer from 'containers/LoginContainer'

class LoginScene extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={styles.container}>
        <LoginContainer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#3B4EE3',
    alignItems: 'center',
    justifyContent:'space-between'
  },
})
export default LoginScene;
