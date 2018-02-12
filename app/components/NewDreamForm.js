import React,{Component} from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, Animated, Image, Keyboard } from 'react-native';
import DreamRecorder from 'components/DreamRecorder'
import Icon from 'react-native-vector-icons/MaterialIcons';
import DreamEntryTagForm from 'components/DreamEntryTagForm'



class NewDreamForm extends Component{
  constructor(props){
    super(props)
    this.handleNewTag = this.handleNewTag.bind(this)
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.submitTag = this.submitTag.bind(this)
    this.isRepeat = this.isRepeat.bind(this)
    this.deleteTag = this.deleteTag.bind(this)
    this._handleFinishEntry = this._handleFinishEntry.bind(this)
    this._handleTagAdd = this._handleTagAdd.bind(this)
    this._handleTagDelete = this._handleTagDelete.bind(this)
    this._handleFormOpen = this._handleFormOpen.bind(this)
    this._handleFormClose = this._handleFormClose.bind(this)

    this.state ={
      pendingTag: '',
      title: '',
      entry: '',
      tags: [],
      toggleTagForm: false,
    }
  }
  _handleFormOpen = () => {
    this.setState({toggleTagForm: true})
  }
  _handleFormClose = (updatedTags) =>{
    this.setState({toggleTagForm: false})
  }

  _handleFinishEntry = () => {
    Keyboard.dismiss()
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
  _handleTagAdd(newTag){
    const { tags } = this.state
    this.setState({tags: [...tags, newTag]})
  }
  _handleTagDelete(index){
    const { tags } = this.state
    this.setState({tags: tags.filter((tag,i) => i != index)})
  }
  _handleFormSubmit = () => {
    const { title, entry, tags } = this.state;
    this.props.onDream(title, entry, tags)
  }
  deleteTag = (index) =>{
    console.log(index);
    this.setState({tags: this.state.tags.filter((tag, i) => i !== index )})
  }

  render(){
    const { title, entry, tags, toggleTagForm } = this.state;
    return(
    <View style={styles.container}>

      <DreamEntryTagForm
        tags={tags}
        onAddTag={this._handleTagAdd}
        isOpen={toggleTagForm}
        onDelete={this._handleTagDelete}
        onClose={this._handleFormClose} />

        <View style={styles.newDreamTitleContainer}>
          <TextInput placeholder="Title" onChangeText={(text) => this.setState({title: text})}
          value={title} style={styles.newDreamTitleText} />
        </View>

        <View style={styles.newDreamEntry}>
          <Image style={styles.EntryImage} source={require('assets/entry_rectangle.png')}/>
          <TouchableWithoutFeedback style={styles.TagTouch} onPress={this._handleFormOpen}>
            <Image source={require('assets/tag_button.png')} style={styles.TagButton}></Image>
          </TouchableWithoutFeedback>

            <DreamRecorder />

            <TextInput
              style={styles.newDreamEntryTextField}
              multiline={true}
              onChangeText={(text) => this.setState({entry: text})}
              value={entry} placeholder="So What happened" />
              <TouchableWithoutFeedback onPress={this._handleFinishEntry}>
                <View style={{position:'absolute', right:'2%', bottom:'10%',}}><Text>Finished</Text></View>
              </TouchableWithoutFeedback>

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
  sumbitDreamButton: {
    flex: .2,
    borderWidth: 1,
  },
  submitDreamView: {
    backgroundColor: '#CF7474',
    padding: '4%',
    borderRadius: 3,
  },
  TagTouch: {
    //
  },
  TagButton: {
    position:'absolute',
    top: 5,
    right: 5,

    alignSelf:'flex-end',
    width: 25,
    height: 25,
    zIndex:1,


  }



})

export default NewDreamForm;
