import React,{Component} from 'react'
import { Text, InputField, TextInput, View, ScrollView, Image, StyleSheet, TouchableWithoutFeedback, Alert, Animated, Keyboard} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions as RouteActions } from 'react-native-router-flux';


class DreamEntryTags extends Component{
  constructor(props){
    super(props)
    this.state = {
      scrollX: new Animated.Value(0),
      isScrolled: false,
      isEditingTag: false,
      newTagText: ''

    }
    this._scrollUp = this._scrollUp.bind(this)
    this._handleScrollDown = this._handleScrollDown.bind(this)
    this._pendingAddTag = this._pendingAddTag.bind(this)
    this._cancelAddTag = this._cancelAddTag.bind(this)
    this._handleNewTagText = this._handleNewTagText.bind(this)
    this._handleSubmitTag = this._handleSubmitTag.bind(this)
    this._handleDeleteTag = this._handleDeleteTag.bind(this)
    this.isRepeat = this.isRepeat.bind(this)
  }

  componentDidUpdate(){
    const {isScrolled} = this.state
    if (isScrolled){
      this.scrollView.scrollToEnd({animated: true})
    }
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
  _pendingAddTag(){
    this._scrollUp()
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
    const {isScrolled, isEditingTag, newTagText } = this.state
    const { isEditable, tags } = this.props

    let scrollable = null
    let scrollIcon = null
    let deleteButton = null
    let newTagItemContent = null

    //{deleteButton} ??
    if (isEditingTag){
      newTagItemContent=
      <View style={{flex:1, justifyContent: 'center'}}>
        <TouchableWithoutFeedback onPress={this._cancelAddTag}>
          <View style={styles.DeleteTagIcon}>
            <Icon name="close" size={13} />
          </View>
         </TouchableWithoutFeedback>
         <TextInput style={styles.NewTextTag} placeholder="Enter Tag" value={newTagText} onChangeText={this._handleNewTagText} autoFocus/>
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
                    <TouchableWithoutFeedback onPress={this._handleScrollDown}>
                      <Icon name="close" size={25}/>
                    </TouchableWithoutFeedback>
                  </View>
    }
    else{
      scrollButton =
                    <View>
                      <TouchableWithoutFeedback onPress={this._scrollUp}>
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
      deleteButton = <View style={[styles.DeleteTagIcon, styles.circle]}><Icon name="close" size={13}/></View>
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

    return(
      <View style={styles.DreamTagsContainer}>
          <Animated.View style={[styles.TagsView,{top: this.state.scrollX.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%','-170%']
            }),}]}>
            <View style={styles.TagListContainer}>
              <View style={styles.TagTitleContainer}>
                <Text style={styles.TagsTitleText}>Tags</Text>
                {scrollable}
              </View>
              <ScrollView
                keyboardShouldPersistTaps='handled'
                ref={ref => this.scrollView = ref} >
                <View style={styles.TagList}>
                  {tags.map((tag, i) => {
                    return (
                      <View key={i} style={[{backgroundColor: color[i]}, styles.TagItem]}>
                        <TouchableWithoutFeedback
                          editable={isEditable}
                          onPress={() => this._handleDeleteTag(tag)}>
                          {deleteButton}
                        </TouchableWithoutFeedback>
                        <TextInput
                          key={i}
                          onFocus={() => this._scrollUp}
                          editable={isEditable}
                          value={tag}
                          onChangeText={(text) => this._handleTagEdit(i, text)}
                          style={styles.TagItemText}/>
                      </View>
                      )
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
    borderWidth: 1,
  },
  TagListContainer: {
    borderWidth: 1,
  },
  TagTitleContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  TagsView: {
    flex:1,
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
    width: '100%'
  },
  TagsTitleText:{
    fontSize: 20,
  },
  TagList: {
    flex:1,
    flexDirection: 'row',
    flexWrap:'wrap',
    marginTop: '4%',
  },
  DeleteTagIcon: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: '-10%',
    right: '-5%'
  },
  TagItem: {
    width: 90,
    height: 40,
    marginHorizontal: 10,
    marginBottom: 15,
    borderRadius: 3,
    shadowOffset: {width: 0, height: 4 },
    shadowOpacity: .3,
    justifyContent: 'center'
  },
  TagItemText:{
    fontSize: 16,
    textAlign:'center',
  },
  NewTextTag:{
    justifyContent: 'center',
    alignSelf: 'center',
    height: '50%',
    width: '100%',
    zIndex: 0,
    borderWidth:1,
  },
  CreateTagIcon: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '-15%',
  },
  circle: {
    alignItems:'center',
    justifyContent: 'center',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: .2

  }
})
export default DreamEntryTags;
