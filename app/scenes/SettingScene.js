import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import SettingContainer from 'containers/SettingContainer'

class SettingScene extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <View style={styles.container}>
        <SettingContainer />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#3B4EE3",
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default SettingScene;
