import React,{ Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RegisterContainer from 'containers/RegisterContainer'

class RegisterScene extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <View style={styles.container}>
        <RegisterContainer />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#3B4EE3',
  }
})

export default RegisterScene;
