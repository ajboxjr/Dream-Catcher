import React,{ Component } from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native';

import DreamEntryContainer from '../containers/DreamEntryContainer'

class DreamEntryScene extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    console.log(this.props.navigation.state.params.dreamId)
  }
  render(){

    return (
      <View style={styles.container}>
        <DreamEntryContainer dreamId={this.props.navigation.state.params.dreamId} navigation={this.props.navigation}/>
      </View>
    )
  }
}

DreamEntryScene.defaultProps ={
  // dream: {
  //   _id: 'aslkdfjas',
  //   author: 'bob',
  //   title:"i like tomoatoes",
  //   entry: 'Green salads are better than moldy ones.',
  //   tags:['green', 'underwear', 'thisle','waterhole','one','two', 'three', 'four'],
  //   createdDate:'10/31/18',
  //   lastEdited:'Some time ago'
  // }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#3B4EE3',
    justifyContent: 'center',
    alignItems: 'center'
  },
})
export default DreamEntryScene;
