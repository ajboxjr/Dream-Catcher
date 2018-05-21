import React,{Component} from 'react'
import { Text, InputField, TextInput, View, ScrollView, Image, StyleSheet, TouchableWithoutFeedback, Alert, Animated, Keyboard, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

import DreamEntryTags from './DreamEntryTags'
// import DreamEntryTagForm from '../DreamEntry/DreamEntryForm'
import {Month} from '../../utils/utils.js'

class DreamEntryForm extends Component{
  constructor(props){
    super(props)
    this._scrollUp = this._scrollUp.bind(this)
    this._handleScrollDown = this._handleScrollDown.bind(this)
    this._handleEditToggle = this._handleEditToggle.bind(this)
    this._handleTagAdd = this._handleTagAdd.bind(this)
    this._handleTagEdit = this._handleTagEdit.bind(this)
    this._handleTagDelete = this._handleTagDelete.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this._finishEntryEditing = this._finishEntryEditing.bind(this)
    this._animateFinishButton = this._animateFinishButton.bind(this)
    this.state = {
      isEditable : false,
      title: null,
      tags: [],
      entry: null,
      editingEntry: false,
      scrollX: new Animated.Value(0),

    }
  }

  componentWillMount(){
    const { title, entry, tags} = this.props.dream
    this.setState({
      title: title,
      entry: entry,
      tags: tags,
      editingEntry: false
    })
  }

  formatDate = () =>{
    //Move to Utils
    const {updatedAt} = this.props.dream
    date = new Date(updatedAt)
    formatedDate = Month[date.getMonth()-1]+" "+date.toLocaleString('en-US', { day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
    return formatedDate
  }

  _handleTagDelete = (deleteTag) => {
    const updatedTags = this.state.tags.filter((tag) => {
      return tag !== deleteTag
    })
    this.setState({tags: updatedTags })
  }

  _animateFinishButton = () => {
    this.setState({editingEntry: true})
  }

  _finishEntryEditing = () => {
    this.setState({editingEntry: false})
    Keyboard.dismiss()
  }
  //Tag form
  _handleScrollDown(){
    //Close keyboard and scrolldown
    Keyboard.dismiss()
    const { isScrolled } = this.state
    Animated.timing(this.state.scrollX, {
        duration: 500,
        toValue: 0
    }).start(() =>{
      this.setState({isScrolled: false})
    })
  }

  _scrollUp() {
    const {isScrolled} = this.state
      Animated.timing(this.state.scrollX, {
          duration: 500,
          toValue: 1
      }).start(() => {
        this.setState({isScrolled: true})
      })
  }

  _handleTagAdd = (newTag) => {
    const { tags } = this.state
    this.setState({tags: [...tags, newTag]})
  }

  _handleTagEdit = (index,tag) => {
    const { tags } = this.state
    tags[index] = tag
    this.setState({tags: tags})
  }

  _handleEditToggle = () => {
    const { title, tags, entry, isEditable } = this.state
    if(this.state.isEditable === false){
      console.log('editing')
    }
    else {
      console.log('saving');
      //Pass in edit fields
      this.props.onEdit(title, entry, tags)
      this._handleScrollDown()
    }
    this.setState({isEditable: !this.state.isEditable})
  }

  render(){
    const { isEditable, editingEntry, title, tags, entry, isScrolled } = this.state
    const { lastEdited } = this.props.dream
    let toggleEditButton
    if (isEditable){
      toggleEditButton =
          <TouchableWithoutFeedback onPress={this._finishEntryEditing}>
              <Image style={styles.editButton} source={require('../../assets/check_button.png')} />
          </TouchableWithoutFeedback>
    }
    else {
      toggleEditButton = null
    }
    return(
      <View style={styles.DreamEntryContainer}>
        <View style={styles.DreamEntryHeader}>
          <View style={styles.DreamEntryToolBarIconContainer}>
            <View style={styles.DreamEntryToolBarNavLeft}>
              <TouchableWithoutFeedback onPress={this.props.onReturn}>
                <Icon style={styles.BackIcon} name="keyboard-arrow-left" size={27} />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.DreamEntryToolBarNavRight}>

              <TouchableWithoutFeedback onPress={this._handleEditToggle}>
                {isEditable == true ?
                  <Icon name="save" size={25} /> :
                  <Icon name="mode-edit" size={25} />
                }
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.props.onDeleteEntry}>
                <Image style={styles.TrashCanIcon} source={require('../../assets/trash.png')} />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={[styles.DreamEntryTitleContainer, {shadowOpacity: isEditable ? .3 : .001}]}>
            <TextInput style={styles.DreamEntryTitleText}
            value={title}
            returnKeyType='done'
            onChangeText={(text)=> this.setState({title: text})}
            editable={isEditable} />
          </View>
          <View style={styles.DreamEntryDateEditedContainer}>
            <Text style={styles.DreamEntryDateEditedText} >
              Last Edited: {this.formatDate(this.props.dream.updatedAt)}
            </Text>
          </View>
        </View>
        <View style={[styles.DreamContentContainer, {shadowOpacity: isEditable ? .3 : 0}]}>
          {toggleEditButton}
          <TextInput style={styles.DreamContentText}
            value={entry}
            onChangeText={(text)=> this.setState({entry: text})}
            editable={isEditable}
            multiline={true}
            onFocus={() => this._animateFinishButton()}/>
        </View>

        <DreamEntryTags
          tags={tags}
          isScrolled={isScrolled}
          scrollDown={this._handleScrollDown}
          scrollX={this.state.scrollX}
          scrollUp={this._scrollUp}
          onAddTag={this._handleTagAdd}
          onEditTag={this._handleTagEdit}
          onDeleteTag={this._handleTagDelete}
          isEditable={this.state.isEditable} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  DreamEntryContainer:{
    flex:1,
    justifyContent: 'space-between'
  },
  DreamEntryHeader:{
    //0
    marginTop: '5%',
    flex: .15,
    marginHorizontal: '5%',
  },
  TagFormContainer:{
    position:'absolute',
    zIndex: 1,
    height: 200,
    width:'100%',
    backgroundColor: "#1B4782",
  },
  DreamEntryToolBarIconContainer: {
    flex: .3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  DreamEntryToolBarNavLeft:{
    flexDirection: 'row',
  },
  DreamEntryToolBarNavRight: {
    flexDirection: 'row',
  },
  TrashCanIcon: {
    width: 25,
    height: 25,
  },
  DreamEntryTitleContainer:{
    // 1
    width:'70%',
    height: '100%',
    // borderWidth:1,
    flex: .50,
    margin: 4,
    justifyContent: 'center',
    shadowOffset: {width:0, height:0},
  },
  DreamEntryTitleText:{
    marginLeft: '2%',
    fontSize: 24,

  },
  DreamEntryDateEditedContainer:{
    flex: .3,
    marginHorizontal: '3%',
  },
  DreamEntryDateEditedText:{
    fontSize:14,
  },
  DreamContentContainer: {
    flex: .55,
    shadowOffset: {width: 0, height:0},
    flexDirection:'column',
    marginHorizontal: '4%',
  },
  editButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    height:25,
    width:25,
    zIndex:1
  },
  DreamContentText:{
    marginLeft: 3,
    flex:1,
    fontSize: 24,
  },
})

export default DreamEntryForm;
