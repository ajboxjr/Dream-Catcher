import React,{Component } from 'react'
import PropTypes from 'prop-types'
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native'

import DreamItem from 'components/DreamItem'

class DreamList extends Component{
  constructor(props){
    super(props)
    // this._handleScroll = this._handleScroll.bind(this)
    this.loadDreams = this.loadDreams.bind(this)
  }
  componentDidMount(){
    // this.props.populateDreams() Populate Dreams on refresh
  }
  loadDreams = () => {

    console.log('should load');
    this.props.populateDreams()
    this.setState({refreshing: true});
    // this.setState({refreshing: false})
  }
  render(){
    return(
      <ScrollView
      refreshControl={
        <RefreshControl
            onRefresh={() => this.loadDreams()}
            refreshing={this.props.isPopulating}
        />
        }>
        <View style={styles.DreamListContainer}>
          {this.props.dreams.map((item, i) => {
            console.log(item);
          return  <DreamItem key={item._id} dream={item} onTap={() => this.props.onDreamSelect(item._id)} />
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
  }]
}
export default DreamList;
