import React,{Component} from 'react'
import { Text, InputField, TextInput, View, ScrollView, Image, StyleSheet, TouchableWithoutFeedback, Alert, Animated, Keyboard} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

import DreamEntryTagItem from './DreamEntryTagItem'


class DreamEntryTags extends Component{
  constructor(props){
    super(props)
    this._pendingAddTag = this._pendingAddTag.bind(this)
    this._cancelAddTag = this._cancelAddTag.bind(this)
    this._handleNewTagText = this._handleNewTagText.bind(this)
    this._handleSubmitTag = this._handleSubmitTag.bind(this)
    this._handleDeleteTag = this._handleDeleteTag.bind(this)
    this.isRepeat = this.isRepeat.bind(this)
    this.state = {
      isScrolled: false,
      isEditingTag: false,
      newTagText: ''
    }
  }




  isRepeat(tag){
    const { tags } = this.props
    return tags.includes(tag)
  }

  _handleSubmitTag(){
    const { newTagText } = this.state
    if (newTagText){
      if(!this.isRepeat(newTagText)){
        this.setState({newTagText: ''})
        this.props.onAddTag(newTagText)
      }
      console.log('repeat')
    }
    else{
      console.log('no text entered');
    }
  }

  _handleDeleteTag(delTag){
    this.props.onDeleteTag(delTag)
  }

  _handleTagEdit(index, editTag){
    this.props.onEditTag(index, editTag)
  }

  _pendingAddTag(){
    this.props.scrollUp()
    this.setState({isEditingTag: true})
  }

  _cancelAddTag(){
    this.setState({isEditingTag: false, newTagText: ''})
  }

  _handleNewTagText(text){
    if (text.length < 18){
      this.setState({newTagText: text})
    }
  }

  render(){
    const color= ['#3ED67F', '#56CCF2', '#EBB617', '#9B51E0', '#EB5757', '#2D9CDB','#FF7800', '#3DFF45', '#F2994A','#AF07B2']
    const { isEditingTag, newTagText } = this.state
    const { isScrolled, isEditable, tags, scrollUp, scrollDown } = this.props


    let scrollable = null
    let scrollIcon = null
    let deleteButton = null
    let newTagItemContent = null

    if (isEditingTag){
      newTagItemContent=
      <View style={{flex:1, justifyContent: 'center'}}>
        <TouchableWithoutFeedback onPress={this._cancelAddTag}>
          <View style={[styles.DeleteTagIcon,styles.circle]}>
            <Icon name="close" size={13} />
          </View>
         </TouchableWithoutFeedback>
         <TextInput
          style={styles.NewTextTag}
          placeholder="Enter Tag"
          value={newTagText}
          onChangeText={this._handleNewTagText}
          blurOnSubmit={false}
          onSubmitEditing={this._handleSubmitTag}
          autoFocus/>
         <TouchableWithoutFeedback onPress={this._handleSubmitTag}>
           <View style={[styles.circle, styles.CreateTagIcon]}>
            <Icon name="check" size={14} />
           </View>
         </TouchableWithoutFeedback>
       </View>
    }else{
      newTagItemContent = <View><Text style={styles.TagItemText}>+</Text></View>
    }

    if (isScrolled){
      scrollButton =
                  <View>
                    <TouchableWithoutFeedback onPress={scrollDown}>
                      <Icon name="close" size={25}/>
                    </TouchableWithoutFeedback>
                  </View>
    }
    else{
      scrollButton =
                    <View>
                      <TouchableWithoutFeedback onPress={scrollUp}>
                        <Icon name="keyboard-arrow-up" size={25}/>
                      </TouchableWithoutFeedback>
                    </View>
    }

    if (isEditable) {
      //Make Tags Bar Scrollable DONE
      //If Scrolled up x if scrolled down arrowup DONE
      scrollable =
                <View>
                  {scrollButton}
                </View>

      // Add Delete Button to tags
      newTagItem=
        <View style={[{backgroundColor: '#8A8A8A'}, styles.TagItem]}>
          <TouchableWithoutFeedback onPress={() => this._pendingAddTag()}>
            {newTagItemContent}
         </TouchableWithoutFeedback>
        </View>
    }
    else{
      //Scroll Tags Down and make Scrollable false DONE
      scrollable =
                <View>
                </View>
      deleteButton = <View></View>
      newTagItem = null
      // Hide/Remove Delete & New Tag Button
    }
//centerContent
    return(
      <View style={styles.DreamTagsContainer}>
          <Animated.View style={[styles.TagsView,{top: this.props.scrollX.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%','-170%'] }),}]}>
            <View style={styles.TagListContainer}>
              <View style={styles.TagTitleContainer}>
                <Text style={styles.TagsTitleText}>Tags</Text>
                {scrollable}
              </View>
              <ScrollView
                centerContent={true}
                style={{ flex:1, borderWidth:1,alignSelf:'center',width:'100%'}}
                contentContainerStyle={styles.TagListScroll}
                keyboardShouldPersistTaps='handled'
                ref={ref => this.scrollView = ref} >
                <View style={styles.TagList}>
                  {tags.map((tag, i) => {
                      return (<DreamEntryTagItem
                      key={i}
                      scrollUp={scrollUp}
                      isEditable={this.props.isEditable}
                      color={color[i]}
                      tag={tag}
                      onDelete={this._handleDeleteTag}
                      onEdit={(tag) => this._handleTagEdit(i, tag)}/>)
                    })}
                    {newTagItem}
                </View>
              </ScrollView>
            </View>
          </Animated.View>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  DreamTagsContainer:{
    flex: .25,
    position: 'relative',
  },
  TagTitleContainer:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  TagsView: {
    flex:1,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: .5,
    position: 'relative',
    backgroundColor: 'white',
  },
  ViewIcon: {
    position: 'relative',
    alignItems: 'flex-end',
  },
  CloseTags: {
    position: 'absolute',
    top: '0%',
    right: '0%',
    zIndex: 1,
  },
  TagOpenClose: {
    textAlign: 'center',
    margin: 0
  },
  TagListContainer:{
    flex:1,
    alignItems:'center',
    width: '100%',
    // borderWidth:1
  },
  TagsTitleText:{
    alignSelf: 'flex-start',
    margin: 4,
    fontSize: 20,
  },
  TagListScroll  :{
    flexGrow: 1,
    // height: '100%',
    borderWidth:1,
    // width: '100%',
  },
  TagList: {
    flex:1,
    flexDirection: 'row',
    flexWrap:'wrap',
    marginTop: '4%',
  },
  NewTextTag:{
    justifyContent: 'center',
    alignSelf: 'center',
    height: '50%',
    width: '100%',
    zIndex: 0,
  },
  CreateTagIcon: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '-15%',
  },
  TagItem: {
    width: '29%',
    height: 40,
    marginHorizontal: 6,
    marginBottom: 15,
    borderRadius: 3,
    shadowOffset: {width: 0, height: 4 },
    shadowOpacity: .3,
    alignSelf:'flex-start',
    justifyContent: 'center'
  },
  TagItemText:{
    fontSize: 16,
    textAlign:'center',
  },
  DeleteTagIcon: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: '-10%',
    right: '-5%'
  },
  circle: {
    alignItems:'center',
    justifyContent: 'center',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: .9
  }
})
export default DreamEntryTags;
