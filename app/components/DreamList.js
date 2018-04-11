import React,{Component } from 'react'
import PropTypes from 'prop-types'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { Actions as RouteActions } from 'react-native-router-flux';

import DreamItem from 'components/DreamItem'

class DreamList extends Component{
  constructor(props){
    super(props)
    this._handleSceneChange = this._handleSceneChange.bind(this)
    this._handleScroll = this._handleScroll.bind(this)
    this.loadDreams = this.loadDreams.bind(this)
  }
  _handleSceneChange(id){
    RouteActions.tab2_scene2({dreamId: id})
  }
  loadDreams = () => {
    this.props.populateDreams()
    while(this.props.isPopulating){
      this.scrollView.scrollTo({x: 0, y: -10, animated: true})
    }
    this.scrollView.scrollTo({x: 0, y: 0, animated: true})
  }

  _handleScroll =(e) => {
    console.log(';asdf');
    var {contentOffset} = e.nativeEvent;
    console.log("offset y",contentOffset.y);
    if (contentOffset.y < 0){
      console.log(this.props.isPopulating);
      this.loadDreams()
    }
  }
  render(){
    return(
      <ScrollView
        onScroll={this._handleScroll}
        ref={ref => this.scrollView = ref}>
        <View style={styles.DreamListContainer}>
          {this.props.dreams.map((item, i) => {
          return  <DreamItem key={item._id} dream={item} onTap={() => this._handleSceneChange(item._id)} />
          })}
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  DreamListContainer: {
    flex: .85,
  }
})

DreamList.propTypes = {
  dreams: PropTypes.array.isRequired
}

DreamList.defaultProps = {
  dreams: [{
    _id: "5a645b3cadc4eab4181539d1",
    title: "title",
    author: "2015-01-21T09:19:57.081Z",
    createdDate: "201-01-21T09:19:57.081Z",
    entry: "Some entry huh. I was perusing down the street and a young man with a cane jumped down the sewer. In fear I tripped and fell flat onto my face. What a nightmare...",
    lastEdited: "2018-01-21T09:19:57.081Z",
    tags: ["one", "two", "three"]
  },
  {
    _id: "5a645b3cadc4eab4181539d5",
    title: "Title2",
    author: "5a63e2c7bc4ccf947b77d33e",
    createDate: "2018-01-21T09:19:57.081Z",
    entry: "Slaked;alskdfj 	",
    lastEdited: "2018-01-21T09:19:57.081Z",
    tags: ["one", "two", "three","hear","katy","bundy","need","more","tags"]
  },
  {
    _id: "5a645b3cadc4eab4181539d9",
    title: "Need better title names",
    author: "2018-01-21T09:19:57.081Z",
    createDate: "2018-09-10T09:10:57.081Z",
    entry: "This is entry 5",
    lastEdited: "2018-01-21T09:19:57.081Z",
    tags: ["one", "two", "three","funk","earl","science"]
  },
]
}
export default DreamList;
