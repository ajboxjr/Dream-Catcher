import React,{ Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileContainer from 'containers/ProfileContainer'

class ProfileScene extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <View style={styles.container}>
        <ProfileContainer />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    backgroundColor: '#3B4EE3',
  },

})

export default ProfileScene;
