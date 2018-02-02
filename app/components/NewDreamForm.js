import React,{Component} from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, Animated, Image } from 'react-native';
import DreamRecorder from 'components/DreamRecorder'



class NewDreamForm extends Component{
  constructor(props){
    super(props)
    this.formatTags = this.formatTags.bind(this)
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
    this.state ={
      title: '',
      entry: '',
      tags: '',
    }
  }

  formatTags = () => {
    const { tags } = this.state;
    const tagsarr = tags.split(" ")
    return tagsarr


  }

  _handleFormSubmit = () => {
    const { title, entry, tags } = this.state;
    this.props.onDream(title, entry, tags.split(" "))
  }

  render(){
    const { title, entry, tags } = this.state;
    return(
    <View style={styles.container}>

        <View style={styles.newDreamTitleContainer}>
          <TextInput placeholder="Title" onChangeText={(text) => this.setState({title: text})}
          value={title} style={styles.newDreamTitleText} />
        </View>

        <View style={styles.newDreamEntry}>
          <Image style={styles.EntryImage} source={require('assets/entry_rectangle.png')}/>
            <DreamRecorder />
            <TextInput
              style={styles.newDreamEntryTextField}
              multiline={true}
              onChangeText={(text) => this.setState({entry: text})}
              value={entry} placeholder="So What happened" />
        </View>

        <View style={styles.TagsContainer}>
          <TextInput
            style={styles.TagsTextBox}
            onChangeText={(text) => this.setState({tags: text})}
            value={tags}
            placeholder="Tags"/>
        </View>

        <TouchableWithoutFeedback style={styles.sumbitDreamButton} onPress={this._handleFormSubmit}>
         <View style={styles.submitDreamView}>
          <Text style={styles.submitDreamText}> Off to the moon!</Text>
         </View>
        </TouchableWithoutFeedback>
    </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  newDreamTitleContainer: {
    flex: .1,
    width: '85%',
    backgroundColor: '#E0E0E0',
    marginTop: '2%',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: .1
  },
  newDreamTitleText: {
    textAlign: 'center',
  },
  newDreamEntry: {
    flex: .6,
    width: '90%',
    borderWidth: 1
  },
  EntryImage: {
    position: 'absolute',
    zIndex: -1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  newDreamEntryTextField: {
    marginHorizontal: '1%',
  },
  TagsContainer:{
    flex: .1,
    alignSelf: 'flex-end',
    marginRight: '4%'
  },
  sumbitDreamButton: {
    flex: .2,
    borderWidth: 1,
  },
  submitDreamView: {
    backgroundColor: '#CF7474',
    padding: '4%',
    borderRadius: 3,
  },



})

export default NewDreamForm;
