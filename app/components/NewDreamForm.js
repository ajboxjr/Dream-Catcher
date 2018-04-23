import React,{Component} from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, Animated, Image, Keyboard } from 'react-native';
import DreamRecorder from '../components/DreamRecorder'
import Icon from 'react-native-vector-icons/MaterialIcons';
import DreamEntryTagForm from '../components/DreamEntryTagForm'
// import RCTKeyboardToolbarTextInput from 'react-native-textinput-utils'

import { getCatchPhrase } from '../utils/utils'



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
    this._handleEntryFocus = this._handleEntryFocus.bind(this)
    this.animateUnderline = this.animateUnderline.bind(this)
    this.unanimateUnderline = this.unanimateUnderline.bind(this)
    this.borderErrorAnimation = this.borderErrorAnimation.bind(this)
    this.titleErrorAnimation = this.titleErrorAnimation.bind(this)
    this.state = {
      pendingTag: '',
      title: '',
      entry: '',
      tags: [],
      toggleTagForm: false,
      setRecording: false,
      recordingText: '',
      isDreaming: false,
      titleUnderlineX: new Animated.Value(0),
      titleUnderlineColor: new Animated.Value(0),
      entryBorderOpacity: new Animated.Value(0)
    }
  }

  componentWillMount(){
    this.setState({catchPhrase: getCatchPhrase()})
  }

  _handleFormOpen = () => {
    this.setState({toggleTagForm: true})
  }

  _handleFormClose = () =>{
    this.setState({toggleTagForm: false})
  }

  titleErrorAnimation = () => {
      Animated.sequence([
        Animated.timing(this.state.titleUnderlineColor, {
          duration: 0,
          toValue: 1
        }),
        // Animated.timing(this.state.titleUnderlineColor, {
        //   duration: 300,
        //   toValue: 0
        // })
      ]).start(()=> {
        this.animateUnderline(this.unanimateUnderline)
      })

  }

  borderErrorAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.entryBorderOpacity, {
        duration: 700,
        toValue: 1,
      }),
      Animated.timing(this.state.entryBorderOpacity, {
        duration: 300,
        toValue:0
      })
    ]).start(()=>{
      console.log('start broder animation');
    })
  }

  animateUnderline = (callback=null)=>{
    Animated.timing(this.state.titleUnderlineX, {
      duration: 500,
      toValue: 10,
    }).start(() => {
      // this.setState({toggleTagForm: false})
      if(typeof callback == 'function'){
        callback()
      }
    })
  }

  unanimateUnderline = () => {
    if(this.state.title){
      Animated.timing(this.state.titleUnderlineX, {
        duration: 300,
        toValue: 4,
      }).start(() => {
        // this.setState({toggleTagForm: false})
      })
    }
    else {
      Animated.timing(this.state.titleUnderlineX, {
        duration: 400,
        toValue: 0,
      })
      // .start(() => {
      //   // this.setState({toggleTagForm: false})
      // })
    }
  }

  _handleFinishEntry = () => {
    Keyboard.dismiss()
    this.setState({isDreaming: false})
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

  _handleTextRecording = (text) => {
    const { isRecording, recordingText } = this.state
    if(isRecording) {
      this.setState({ recordingText: text });
    }
  }

  _handleTextInput = (text) => {
    const { isRecording, recordingText } = this.state
    this.setState({entry: text});
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
    if(!entry){
      //ERROR No Title
      this.borderErrorAnimation()
    }
    if(!title){
      this.titleErrorAnimation()
    }
    if (title !== "" && entry !== ""){
      this.props.onDream(title, entry, tags)
    }
  }

  _handleEntryFocus = () => {
    console.log('ok');
    this._handleFormClose()
    this.setState({isDreaming:true})
  }

  _handleEntryFinish = () => {
    this.setState({isDreaming: false})
  }

  deleteTag = (index) =>{
    console.log(index);
    this.setState({tags: this.state.tags.filter((tag, i) => i !== index )})
  }

  render(){
    const { title, entry, tags, toggleTagForm, isDreaming, catchPhrase, isRecording, recordingText } = this.state;
    let entryButton = null;
    if (isDreaming){
      entryButton=<TouchableWithoutFeedback onPress={this._handleFinishEntry}>
        <Image source={require('../assets/check_button.png')} style={[styles.TagButton,{opacity: .4}]}></Image>
      </TouchableWithoutFeedback>
    }
    else {
      entryButton=<TouchableWithoutFeedback style={styles.TagTouch} onPress={this._handleFormOpen}>
        <Image source={require('../assets/tag_button.png')} style={[styles.TagButton]}></Image>
      </TouchableWithoutFeedback>
    }
    return(
    <View style={styles.container}>

      <DreamEntryTagForm
        tags={tags}
        onAddTag={this._handleTagAdd}
        isOpen={toggleTagForm}
        onDelete={this._handleTagDelete}
        onClose={this._handleFormClose} />

        <View style={styles.newDreamTitleContainer}>
          <TextInput onFocus={this.animateUnderline} onEndEditing={this.unanimateUnderline} placeholder="Title" onChangeText={(text) => this.setState({title: text})}
          value={title} style={styles.newDreamTitleText} />
          <Animated.View style={[styles.newDreamTitleUnderline,{
            backgroundColor: this.state.titleUnderlineColor.interpolate({
              inputRange: [0,1],
              outputRange: ['rgb(0,0,0)','rgb(277,29,26)']
            }),
            width: this.state.titleUnderlineX.interpolate({
              inputRange: [0, 10],
              outputRange: ['0%','90%']
            })
          }]}>
          </Animated.View>
        </View>
        <View style={styles.newDreamEntryContainer}>
          <Animated.View style={[styles.newDreamEntry, {
            borderColor: this.state.entryBorderOpacity.interpolate({
              inputRange: [0 ,1],
              outputRange: ['rgba(255,29,26,0)','rgba(277,29,26,.9)']
            }),
        }]}>
            <Image style={styles.EntryImage} source={require('../assets/entry_rectangle.png')}/>
              {entryButton}
              <DreamRecorder
                updateDreamText={this._handleTextRecording}
                clearRecording={() => this.setState({entry: entry+recordingText, recordingText: ''})}
                setRecording={(recording) => this.setState({isRecording: recording})}
                isRecording={isRecording}/>
              <TextInput
              style={styles.newDreamEntryTextField}
              multiline={true}
              onChangeText={this._handleTextInput}
              value={entry+recordingText} placeholder={catchPhrase}
              onFocus={this._handleEntryFocus}
              onEndEditing={this._handleEntryFinish}/>
          </Animated.View>
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
// onFocus={this.setState({isDreaming:true})}
// onEndEditing={this.setState({isDreaming: false})}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
  },
  newDreamTitleContainer: {
    flex: .2,
    ///////////
    justifyContent:'center',
    width: '85%',
    marginTop: '2%',
    justifyContent:'center'
  },
  newDreamTitleText: {
    textAlign: 'left',
    fontSize:24,
  },
  newDreamTitleUnderline: {
      height:2,
      backgroundColor: 'black',
  },
  newDreamEntryContainer:{
    flex:.7,
    width:'100%',
    alignItems:'center',
    justifyContent:'flex-start'
  },
  newDreamEntry: {
    flex: .8,
    ///////////////
    borderWidth: 3,
    borderRadius: 8,
    width: '90%',
  },
  EntryImage: {
    position: 'absolute',
    zIndex: -1,
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  newDreamEntryTextField: {
    marginTop:'2%',
    marginHorizontal: '2%',
    fontSize:18,
  },
  sumbitDreamButton: {
    flex: .2,
    /////////////
    borderWidth: 1,
  },
  submitDreamView: {
    backgroundColor: '#63C924',
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
