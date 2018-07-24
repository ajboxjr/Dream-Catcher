import React, {Component} from 'react'
import {
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Keyboard
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

import DreamEntryTags from './DreamEntryTags'
import FormattedDate from '../Universal/FormattedDate'

class DreamEntryForm extends Component {
  constructor(props) {
    super(props)
    //Entry
    this._toggleEntryEdit = this._toggleEntryEdit.bind(this)
    //-> components
    this.toggleEditButton = this.toggleEditButton.bind(this)
    //Tag Container
    this._handleToggleScroll = this._handleToggleScroll.bind(this)
    this._handleEditToggle = this._handleEditToggle.bind(this)
    //Tag Items
    this._handleTagAdd = this._handleTagAdd.bind(this)
    this._handleTagEdit = this._handleTagEdit.bind(this)
    this._handleTagDelete = this._handleTagDelete.bind(this)

    this.state = {
      isEditable: false,
      title: null,
      tags: [],
      entry: null,
      editingEntry: false,
      scrollX: new Animated.Value(0)
    }
  }

  /*
    Store dream properties
  */
  componentWillMount() {
    const {title, entry, tags} = this.props.dream
    this.setState({title: title, entry: entry, tags: tags, editingEntry: false})
  }

  /*
    Toggle whether entry is being editited
  */
  _toggleEntryEdit = (bool) => {
    if (bool == false) {
      Keyboard.dismiss()
    }
    this.setState({editingEntry: bool})
  }

  /*
    Toggle display of entry finish button
  */
  toggleEditButton = (editingEntry) => {
    return (
      editingEntry
      ? <TouchableWithoutFeedback onPress={() => this._toggleEntryEdit(false)}>
        <Image style={styles.editButton} source={require('../../assets/check_button.png')}/>
      </TouchableWithoutFeedback>
      : null)
  }

  /*
   Toggle scroll state of tag container and animate
  */
  _handleToggleScroll(scrollUp) {
    //Determine which direction to scroll
    let dest = 1
    if (!scrollUp) {
      Keyboard.dismiss()
      dest = 0
    }
    Animated.timing(this.state.scrollX, {
      duration: 500,
      toValue: dest
    }).start(() => {
      this.setState({isScrolled: scrollUp})
    })
  }

  /*
    Toggle whether use is editing Dream Entry
  */
  _handleEditToggle = () => {
    const {title, tags, entry, isEditable} = this.state
    if (this.state.isEditable === false) {
      console.log('editing')
    } else {
      console.log('saving');
      //Pass in edit fields
      this.props.onEdit(title, entry, tags)
      this._handleToggleScroll(false)
    }
    this.setState({
      isEditable: !this.state.isEditable
    })
  }

  /*
    Append new Tag to state tag array
  */
  _handleTagAdd = (newTag) => {
    const {tags} = this.state
    this.setState({
      tags: [
        ...tags,
        newTag
      ]
    })
  }

  /*
    Edit tag by index
  */
  _handleTagEdit = (index, tag) => {
    const {tags} = this.state
    tags[index] = tag
    this.setState({tags: tags})
  }

  /*
    Delete tag from state
  */
  _handleTagDelete = (deleteTag) => {
    const updatedTags = this.state.tags.filter((tag) => {
      return tag !== deleteTag
    })
    this.setState({tags: updatedTags})
  }

  render() {
    const {
      isEditable,
      editingEntry,
      title,
      tags,
      entry,
      isScrolled
    } = this.state
    const {lastEdited} = this.props.dream

    return (<View style={styles.DreamEntryContainer}>
      <View style={styles.DreamEntryHeader}>
        <View style={styles.DreamEntryToolBarIconContainer}>
          <View style={styles.DreamEntryToolBarNavLeft}>

            <TouchableWithoutFeedback onPress={this.props.onReturn}>
              <Icon style={styles.BackIcon} name="keyboard-arrow-left" size={27}/>
            </TouchableWithoutFeedback>

          </View>
          <View style={styles.DreamEntryToolBarNavRight}>

            <TouchableWithoutFeedback onPress={this._handleEditToggle}>
              {
                isEditable == true
                  ? <Icon name="save" size={25}/>
                  : <Icon name="mode-edit" size={25}/>
              }
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.props.onDeleteEntry}>
              <Image style={styles.TrashCanIcon} source={require('../../assets/trash.png')}/>
            </TouchableWithoutFeedback>

          </View>
        </View>
        <View style={[
            styles.DreamEntryTitleContainer, {
              shadowOpacity: isEditable
                ? .3
                : .001
            }
          ]}>
          <TextInput style={styles.DreamEntryTitleText} value={title} returnKeyType='done' onChangeText={(text) => this.setState({title: text})} editable={isEditable}/>
        </View>

        <View style={styles.DreamEntryDateEditedContainer}>
          <FormattedDate style={styles.DreamEntryDateEditedText} date={this.props.dream.updatedAt}/>
        </View>

      </View>
      <View style={[
          styles.DreamContentContainer, {
            shadowOpacity: isEditable
              ? .3
              : .001
          }
        ]}>

        {this.toggleEditButton(editingEntry)}

        <TextInput style={styles.DreamContentText} value={entry} onChangeText={(text) => this.setState({entry: text})} editable={isEditable} multiline={true} onFocus={() => this._toggleEntryEdit(true)} onEndEditing={() => this._toggleEntryEdit(false)}/>

      </View>

      <DreamEntryTags tags={tags} isScrolled={isScrolled} scrollDown={() => this._handleToggleScroll(false)} scrollX={this.state.scrollX} scrollUp={() => this._handleToggleScroll(true)} onAddTag={this._handleTagAdd} onEditTag={this._handleTagEdit} onDeleteTag={this._handleTagDelete} isEditable={this.state.isEditable}/>
    </View>)
  }
}
const styles = StyleSheet.create({
  DreamEntryContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  DreamEntryHeader: {
    //0
    marginTop: '5%',
    flex: .15,
    marginHorizontal: '5%'
  },
  TagFormContainer: {
    position: 'absolute',
    zIndex: 1,
    height: 200,
    width: '100%',
    backgroundColor: "#1B4782"
  },
  DreamEntryToolBarIconContainer: {
    flex: .3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  DreamEntryToolBarNavLeft: {
    flexDirection: 'row'
  },
  DreamEntryToolBarNavRight: {
    flexDirection: 'row'
  },
  TrashCanIcon: {
    width: 25,
    height: 25
  },
  DreamEntryTitleContainer: {
    // 1
    backgroundColor: '#FFFFFF',
    width: '70%',
    height: '100%',
    // borderWidth:1,
    flex: .50,
    margin: 4,
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 0
    }
  },
  DreamEntryTitleText: {
    marginLeft: '2%',
    fontSize: 24
  },
  DreamEntryDateEditedContainer: {
    flex: .3,
    marginLeft: '5%'
  },
  DreamEntryDateEditedText: {
    fontSize: 15
  },
  DreamContentContainer: {
    flex: .55,
    // borderWidth:1,
    // width:'100%',
    backgroundColor: '#FFFFFF',
    height: '100%',
    shadowOffset: {
      width: 0,
      height: 0
    },
    flexDirection: 'column',
    marginHorizontal: '4%'
  },
  editButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    height: 25,
    width: 25,
    zIndex: 1
  },
  DreamContentText: {
    marginLeft: 3,
    flex: 1,
    fontSize: 24,
    marginRight: '5%'
  }
})

export default DreamEntryForm;
