import React,{ Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DreamListContainer from '../containers/DreamListContainer';

class DreamListScene extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <View style={styles.container}>
        <DreamListContainer navigation={this.props.navigation}/>
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


export default DreamListScene;
