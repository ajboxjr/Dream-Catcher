import React,{Component} from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, Animated, Image } from 'react-native';
import DreamRecorder from 'components/DreamRecorder'
import Icon from 'react-native-vector-icons/MaterialIcons';



class NewDreamForm extends Component{
  constructor(props){
    super(props)
    this.handleNewTag = this.handleNewTag.bind(this)
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.submitTag = this.submitTag.bind(this)
    this.isRepeat = this.isRepeat.bind(this)
    this.state ={
      pendingTag: '',
      title: '',
      entry: '',
      tags: [],
    }
  }
  isRepeat(newTag){
    tagRepeated = false
    this.state.tags.map((tag) => {
      if(tag.toLowerCase() === newTag.toLowerCase()){
        tagRepeated = true
      }
    })
    return tagRepeated
  }
  submitTag = () => {
    const {pendingTag,tags} = this.state
    if (pendingTag !== "" && !this.isRepeat(pendingTag)){
      this.setState({tags: [...tags,pendingTag]})
    }
    this.tagInput.setNativeProps({ text: '' })
  }
  handleKeyDown = (e) => {
    console.log(e.nativeEvent.key);
    if(e.nativeEvent.key == "Enter"){

     }
  }
  handleNewTag = (text) => {
    const {pendingTag} = this.state
    //Global Util Varliable for length of string
        this.setState({pendingTag: text})
  }

  _handleFormSubmit = () => {
    const { title, entry, tags } = this.state;
    this.props.onDream(title, entry, tags)
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
              <TouchableWithoutFeedback>
                <View style={{position:'absolute', right:'2%', bottom:'10%',}}><Text>Finished</Text></View>
              </TouchableWithoutFeedback>
        </View>

        <View style={styles.TagsContainer}>
          <TextInput
            style={styles.TagsTextBox}
            onChangeText={this.handleNewTag}
            keyboardType="default"
            clearButtonMode="while-editing"
            returnKeyType="next"
            ref={ element => this.tagInput = element}
            onKeyPress={this.handleKeyDown}
            value={this.state.pendingTag}
            blurOnSubmit={false}
            onSubmitEditing={this.submitTag}
            placeholder="Tags (max 10.)"/>
            <View>
            {this.state.tags.map((tag,i) => (
              <View key={i} style={{flexDirection: 'row',alignItems:'center'}}>
                <Text>{tag}</Text>
                <Icon name="cancel" size={10} />
              </View>
            ))}

            </View>
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
    flex: .5,
    width: '90%',
    borderWidth: 1
  },
  TagsTextBox:{
    borderWidth:1,
    height: 20,
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
