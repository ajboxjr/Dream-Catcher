import React,{ Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginContainer from 'containers/LoginContainer'

class LoginScene extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}>
        <LoginContainer navigation={this.props.navigation}/>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%',
    backgroundColor: '#3B4EE3',
    alignItems: 'center',
    justifyContent:'space-between'
  },
})
export default LoginScene;
