import React,{Component} from 'react'
import { Text, InputField, TextInput, View, ScrollView, Image, StyleSheet, TouchableWithoutFeedback, Alert, Animated} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions as RouteActions } from 'react-native-router-flux';
import DreamEntryTags from 'components/DreamEntryTags'
import DreamEntryTagForm from 'components/DreamEntryTagForm'
import {Month} from 'utils/utils.js'

class DreamEntryForm extends Component{
  constructor(props){
    super(props)
    this._handleEditToggle = this._handleEditToggle.bind(this)
    this._handleTagAdd = this._handleTagAdd.bind(this)
    this._handleTagEdit = this._handleTagEdit.bind(this)
    this._handleTagDelete = this._handleTagDelete.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.state = {
      isEditable : false,
      title: null,
      tags: [],
      entry: null,
    }
  }

  componentWillMount(){
    console.log(this.props.dream)
    const { title, entry, tags} = this.props.dream
    console.log(tags)
    this.setState({
      title: title,
      entry: entry,
      tags: tags,
    })
  }

  formatDate = () =>{
    //Move to Utils
    const {lastEdited} = this.props.dream
    date = new Date(lastEdited)
    formatedDate = Month[date.getMonth()-1]+" "+date.toLocaleString('en-US', { day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
    return formatedDate
  }

  _handleTagDelete(deleteTag){
    const updatedTags = this.state.tags.filter((tag) => {
      return tag !== deleteTag
    })
    this.setState({tags: updatedTags })
  }
  _handleTagAdd(newTag){
    const { tags } = this.state
    this.setState({tags: [...tags, newTag]})
  }
  _handleTagEdit(index,tag){
    const { tags } = this.state
    tags[index] = tag
    this.setState({tags: tags})
  }
  _handleEditToggle(){
    const { title, tags, entry, isEditable } = this.state
    if(this.state.isEditable === false){
      console.log('editing')
    }
    else {
      console.log('saving');
      //Pass in edit fields
      this.props.onEdit(title, entry, tags)
    }
    this.setState({isEditable: !this.state.isEditable})
  }
  // isEditable={isEditable}

  render(){
    const { isEditable, title, tags, entry } = this.state
    const { lastEdited } = this.props.dream
    return(
      <View style={{flex:1, borderWidth:1,    justifyContent: 'space-between'}}>
        <View style={styles.DreamEntryHeader}>
          <View style={styles.DreamEntryToolBarIconContainer}>
            <View style={styles.DreamEntryToolBarNavLeft}>
              <TouchableWithoutFeedback onPress={RouteActions.tab1_scene2}>
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
                <Image style={styles.TrashCanIcon} source={require('assets/trash.png')} />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.DreamEntryTitleContainer}>
            <TextInput style={[styles.DreamEntryTitleText, {borderWidth: isEditable ? 1 : 0}]}
            value={title}
            returnKeyType='done'
            onChangeText={(text)=> this.setState({title: text})}
            editable={isEditable} />
          </View>
          <View style={styles.DreamEntryDateEditedContainer}>
            <Text style={styles.DreamEntryDateEditedText} >
              Last Edited: {this.formatDate()}
            </Text>
          </View>
        </View>

        <View style={[styles.DreamContentContainer, {borderWidth: isEditable ? 1 : 0}]}>

          <TextInput style={styles.DreamContentText}
            value={entry}
            onChangeText={(text)=> this.setState({entry: text})}
            editable={isEditable}
            multiline={true} />
        </View>

        <DreamEntryTags
          tags={tags}
          onAddTag={this._handleTagAdd}
          onEditTag={this._handleTagEdit}
          onDeleteTag={this._handleTagDelete}
          isEditable={this.state.isEditable}/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
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
    flex: .55,
    justifyContent: 'center'
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
    // marginTop: '5%',
    flexDirection:'column',
    marginHorizontal: '4%',

  },
  DreamContentText:{
    flex:1,
    fontSize: 24,
  },
})

DreamEntryForm.defaultProps ={
  dream: {
    _id: 'aslkdfjas',
    author: 'bob',
    title:"i like tomoatoes",
    entry: 'Salad Bob tomatoes fermeted soup cream of wheat diarea and fire monkies are always watching the way we snort our flour.',
    tags:['green', 'underwear', 'thisle','waterhole','one','two', 'three', 'four'],
    createdDate:'10/31/18',
    lastEdited:'Some time ago'
  }
}

export default DreamEntryForm;
