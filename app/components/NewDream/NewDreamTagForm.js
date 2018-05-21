import React,{Component} from 'react'
import { Text, InputField, TextInput, View, ScrollView, Image, Keyboard, StyleSheet, TouchableWithoutFeedback, Alert, Animated} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

class NewDreamTagForm extends Component {
  constructor(props){
    super(props)
    this.addTag = this.addTag.bind(this)
    this._handleTagInput = this._handleTagInput.bind(this)
    this.openForm = this.openForm.bind(this)
    this.closeForm = this.closeForm.bind(this)
    this.state = {
      tagInput: '',
      scrollX: new Animated.Value(0)
    }
  }
  componentDidUpdate(){
    const { isOpen  } = this.props
    if(isOpen){
      this.openForm()
    }
    else {
      this.closeForm()
    }
  }

  openForm = () => {
    Animated.timing(this.state.scrollX, {
      duration: 300,
      toValue: 1,
    }).start(() => {
      // this.setState({toggleTagForm: false})
    })
  }

  closeForm = () =>{
    Animated.timing(this.state.scrollX, {
      duration: 300,
      toValue: 0,
    }).start(() => {
      // Keyboard.dismiss()
    })
  }
  addTag = () =>{
    const { tags, tagInput } = this.state
    if (tagInput){
        this.props.onAddTag(tagInput)
        this.setState({ tagInput:''})
    }
  }
  _handleTagInput = (tag) => {
    if (tag.length < 18){
      this.setState({tagInput: tag})
    }
  }

  render(){

    const { tagInput } = this.state
    const { tags }  =this.props
    return(
      <Animated.View style={[styles.tagFormContainer, {top: this.state.scrollX.interpolate({
        inputRange: [0, 1],
        outputRange: ['-50%','0%']
      }),}]}>
        <View style={styles.tagFormContainerInner}>
          <View style={styles.tagInputContainer}>
            <View style={styles.tagInputCenter}>
              <TextInput
                style={styles.tagInput}
                value={tagInput}
                onSubmitEditing={this.addTag}
                blurOnSubmit={false}
                placeholderTextColor={'rgba(255,255,255,.4)'}
                onChangeText={this._handleTagInput}
                placeholder="Add Tags"/>
            </View>
            <View style={styles.tagInputRight}>
              <TouchableWithoutFeedback onPress={this.props.onClose}>
                <Icon style={styles.closeIcon} color="#28EBEB" name="cancel" size={30} />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <ScrollView
            style={styles.tagScroll}>
            <View style={styles.tagListContainer}>
              {tags.map((tag,i) => {
                return (
                  <View key={i} style={styles.tagItem}>
                    <Text style={styles.tagItemText}>{tag}</Text>
                    <TouchableWithoutFeedback onPress={() =>  this.props.onDelete(i)}>
                      <Icon style={styles.deleteTagIcon} name="cancel" size={17} />
                    </TouchableWithoutFeedback>
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
      </Animated.View>
    )
  }
}
const styles = StyleSheet.create({
  tagFormContainer:{
    // overflowX: 'hidden',
    position:'absolute',
    zIndex: 1,
    height: '27%',
    width:'100%',
    backgroundColor: "#1B4782",
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    shadowOffset: {width: 0, height:10},
    shadowOpacity: 1.3
  },
  tagFormContainerInner:{
    flex:1
  },
  tagInputContainer: {
    flex:.6,
    flexDirection: 'row'
  },
  closeIcon:{
    alignSelf:'center'
  },
  submitIcon:{
    alignSelf:'center'
  },
  tagInputCenter: {
    flex:.8,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  tagInput: {
    width:'75%',
    textAlign:'left',
    fontSize: 26,
    color: 'white',
    borderBottomColor:'rgba(255,255,255,1)',
    borderBottomWidth: 3,
    marginHorizontal: 5,
    marginVertical: 2
  },
  tagInputRight: {
    flex: .2,
    marginTop: 5,
    justifyContent:'flex-start',
    justifyContent:'center',
  },
  tagScroll: {
    width:'100%',
    flex:.5,
  },
  tagListContainer: {
    marginHorizontal: '2%',
    flex:1,
    flexWrap: 'wrap',
    flexDirection:'row',
  },
  tagItem:{
    height: 25,
    padding: 6,
    flexDirection:'row',
    borderWidth:1,
    alignItems:'center',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius:5,

  },
  tagItemText:{
    fontSize: 16,
  }
})
export default NewDreamTagForm;
