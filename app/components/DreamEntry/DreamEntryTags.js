import React, {Component} from 'react'
import {
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  Animated,
  Keyboard
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

import DreamEntryTagItem from './DreamEntryTagItem'

class DreamEntryTags extends Component {
  constructor(props) {
    super(props)
    //Tag Container
    this._handleScrollUp = this._handleScrollUp.bind(this)
    //-> components
    this.scrollButton = this.scrollButton.bind(this)
    //Tag Item
    this._pendingAddTag = this._pendingAddTag.bind(this)
    this._cancelAddTag = this._cancelAddTag.bind(this)
    this._handleNewTagText = this._handleNewTagText.bind(this)
    this.isRepeat = this.isRepeat.bind(this)
    this._handleSubmitTag = this._handleSubmitTag.bind(this)
    this._handleDeleteTag = this._handleDeleteTag.bind(this)
    this.state = {
      isScrolled: false,
      isEditingTag: false,
      newTagText: ''
    }
  }

  /*
  Scroll scrollview and and container
*/
  _handleScrollUp = () => {
    this.scrollView.scrollToEnd()
    this.props.scrollUp()
  }
  scrollButton = (isEditable, isScrolled) => {
    return (
      isEditable
      ? isScrolled
        ? <View>
          <TouchableWithoutFeedback onPress={this.props.scrollDown}>
            <Icon name="close" size={25}/>
          </TouchableWithoutFeedback>
        </View>
        : <View>
          <TouchableWithoutFeedback onPress={this._handleScrollUp}>
            <Icon name="keyboard-arrow-up" size={25}/>
          </TouchableWithoutFeedback>
        </View>
      : <View></View>)
  }

  /*
  Scroll Container and notify that user is editing tag
*/
  _pendingAddTag() {
    this.props.scrollUp()
    this.setState({isEditingTag: true})
  }

  /*
  Clear tag text and notify that user is not editing
*/
  _cancelAddTag() {
    this.setState({isEditingTag: false, newTagText: ''})
  }

  /*
  Limit Tag Length Under 18 chars
*/
  _handleNewTagText(text) {
    if (text.length < 18) {
      this.setState({newTagText: text})
    }
  }

  /*
  Prevent User for repeating tag
*/
  isRepeat(tag) {
    const {tags} = this.props
    return tags.includes(tag)
  }

  /*
  Add verified tag to parent state
*/
  _handleSubmitTag() {
    const {newTagText} = this.state
    if (newTagText) {
      if (!this.isRepeat(newTagText)) {
        this.setState({newTagText: ''})
        this.props.onAddTag(newTagText)
      }
      console.log('repeat')
    } else {
      console.log('no text entered');
    }
  }

  /*
  Edit tag based on index
*/
  _handleTagEdit(index, editTag) {
    this.props.onEditTag(index, editTag)
  }

  /*
  Delete tag
*/
  _handleDeleteTag(delTag) {
    this.props.onDeleteTag(delTag)
  }

  render() {
    const color = [
      '#3ED67F',
      '#56CCF2',
      '#EBB617',
      '#9B51E0',
      '#EB5757',
      '#2D9CDB',
      '#FF7800',
      '#3DFF45',
      '#F2994A',
      '#AF07B2'
    ]
    const {isEditingTag, newTagText} = this.state
    const {isScrolled, isEditable, tags, scrollUp, scrollDown} = this.props

    let scrollIcon = null
    let newTagItemContent = null

    if (isEditingTag) {
      newTagItemContent = <View style={{
          flex: 1,
          justifyContent: 'center'
        }}>
        <TouchableWithoutFeedback onPress={this._cancelAddTag}>
          <View style={[styles.DeleteTagIcon, styles.circle]}>
            <Icon name="close" size={13}/>
          </View>
        </TouchableWithoutFeedback>
        <TextInput style={styles.NewTextTag} placeholder="Enter Tag" value={newTagText} onChangeText={this._handleNewTagText} blurOnSubmit={false} onSubmitEditing={this._handleSubmitTag} autoFocus={true}/>
        <TouchableWithoutFeedback onPress={this._handleSubmitTag}>
          <View style={[styles.circle, styles.CreateTagIcon]}>
            <Icon name="check" size={14}/>
          </View>
        </TouchableWithoutFeedback>
      </View>
    } else {
      newTagItemContent = <View>
        <Text style={styles.TagItemText}>+</Text>
      </View>
    }

    if (isEditable) {
      //Make Tags Bar Scrollable DONE
      //If Scrolled up x if scrolled down arrowup DONE

      // Add Delete Button to tags
      newTagItem = <View style={[
          {
            backgroundColor: '#8A8A8A'
          },
          styles.TagItem
        ]}>
        <TouchableWithoutFeedback onPress={() => this._pendingAddTag()}>
          {newTagItemContent}
        </TouchableWithoutFeedback>
      </View>
    } else {
      //Scroll Tags Down and make Scrollable false DONE

      newTagItem = null
      // Hide/Remove Delete & New Tag Button
    }
    //centerContent
    return (<View style={styles.DreamTagsContainer}>
      <Animated.View style={[
          styles.TagsView, {
            top: this.props.scrollX.interpolate({
              inputRange: [
                0, 1
              ],
              outputRange: ['0%', '-170%']
            })
          }
        ]}>
        <View style={styles.TagListContainer}>
          <View style={styles.TagTitleContainer}>
            <Text style={styles.TagsTitleText}>Tags</Text>
            {this.scrollButton(isEditable, isScrolled)}
          </View>
          <ScrollView centerContent={true} style={{
              flex: 1,
              alignSelf: 'center',
              width: '100%'
            }} contentContainerStyle={styles.TagListScroll} keyboardShouldPersistTaps='handled' ref={ref => this.scrollView = ref}>
            <View style={styles.TagList}>
              {
                tags.map((tag, i) => {
                  return (<DreamEntryTagItem key={i} scrollUp={scrollUp} isEditable={this.props.isEditable} color={color[i]} tag={tag} onDelete={this._handleDeleteTag} onEdit={(tag) => this._handleTagEdit(i, tag)}/>)
                })
              }
              {
                tags.length < 9
                  ? newTagItem
                  : null
              }
            </View>
          </ScrollView>
        </View>
      </Animated.View>
    </View>)
  }
}
//Max tags -- 9...

const styles = StyleSheet.create({
  DreamTagsContainer: {
    flex: .25,
    position: 'relative'
  },
  TagTitleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  TagsView: {
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: .5,
    position: 'relative',
    backgroundColor: 'white'
  },
  ViewIcon: {
    position: 'relative',
    alignItems: 'flex-end'
  },
  CloseTags: {
    position: 'absolute',
    top: '0%',
    right: '0%',
    zIndex: 1
  },
  TagOpenClose: {
    textAlign: 'center',
    margin: 0
  },
  TagListContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%'
  },
  TagsTitleText: {
    alignSelf: 'flex-start',
    margin: 4,
    fontSize: 20
  },
  TagListScroll: {
    flexGrow: 1,
    // height: '100%',
    //fix to flex-start???
    borderWidth: .1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    // width: '100%',
  },
  TagList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '4%'
  },
  NewTextTag: {
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    height: '50%',
    width: '100%',
    zIndex: 0
  },
  CreateTagIcon: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '-15%'
  },
  TagItem: {
    width: '29%',
    height: 40,
    marginHorizontal: 6,
    marginBottom: 15,
    borderRadius: 3,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: .3,
    alignSelf: 'flex-start',
    justifyContent: 'center'
  },
  TagItemText: {
    fontSize: 16,
    textAlign: 'center'
  },
  DeleteTagIcon: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: '-10%',
    right: '-5%'
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: .9
  }
})
export default DreamEntryTags;
