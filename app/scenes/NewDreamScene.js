import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, TextInput} from 'react-native';

import NewDreamContainer from '../containers/NewDreamContainer'

class NewDreamScene extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<View style={styles.container}>
      <NewDreamContainer navigation={this.props.navigation}/>
    </View>)
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: "#3B4EE3",
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default NewDreamScene;
