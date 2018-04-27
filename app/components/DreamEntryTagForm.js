import React,{Component} from 'react'
import { Text, InputField, TextInput, View, ScrollView, Image, StyleSheet, TouchableWithoutFeedback, Alert, Animated} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

class DreamEntryTagForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      tagInput: '',
      scrollX: new Animated.Value(0)
    }
    this._handleTags = this._handleTags.bind(this)
    this.addTag = this.addTag.bind(this)
    this.openForm = this.openForm.bind(this)
    this.closeForm = this.closeForm.bind(this)
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
      // this.setState({toggleTagForm: false})
    })
  }
  addTag = () =>{
    const { tags, tagInput } = this.state
    if (tagInput){
        this.props.onAddTag(tagInput)
        this.setState({ tagInput:''})
    }
  }
  _handleTags = ()=> {
    this.props.onSubmit()
  }

  render(){

    const { tagInput } = this.state
    const { tags }  =this.props
    return(
      <Animated.View style={[styles.TagFormContainer, {top: this.state.scrollX.interpolate({
        inputRange: [0, 1],
        outputRange: ['-50%','0%']
      }),}]}>
        <View style={{flex:1, flexDirection:'column', borderWidth:1}}>
          <View style={styles.TagInputContainer}>
            <View style={styles.TagInputLeft}>
            </View>
            <View style={styles.TagInputCenter}>
              <TextInput
                style={styles.TagInput}
                value={tagInput}
                onSubmitEditing={this.addTag}
                blurOnSubmit={false}
                placeholderTextColor={'rgba(255,255,255,.4)'}
                onChangeText={(text) => this.setState({tagInput: text})}
                placeholder="Add Tags"/>
            </View>
            <View style={styles.TagInputRight}>
            <TouchableWithoutFeedback onPress={this.props.onClose}>
              <Icon style={styles.CloseIcon} name="cancel" size={20} />
            </TouchableWithoutFeedback>
            </View>
          </View>
          <ScrollView
            style={styles.TagScroll}>
            <View style={styles.TagListContainer}>
              {tags.map((tag,i) => {
                return (
                  <View key={i} style={styles.TagItem}>
                    <Text style={styles.TagItemText}>{tag}</Text>
                    <TouchableWithoutFeedback onPress={() =>  this.props.onDelete(i)}>
                      <Icon style={styles.DeleteTagIcon} name="cancel" size={17} />
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
  TagFormContainer:{
    overflow: 'hidden',
    position:'absolute',
    zIndex: 1,
    height: '20%',
    width:'100%',
    borderRadius: 2,
    backgroundColor: "#1B4782",
  },
  TagInputContainer: {
    flex:.6,
    flexDirection: 'row'
  },
  CloseIcon:{
    alignSelf:'center'
  },
  SubmitIcon:{
    alignSelf:'center'
  },
  TagInputLeft : {
    flex: .1,
    marginTop: 10,
    justifyContent:'flex-start',

  },
  TagInputCenter: {
    flex:.8,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  TagInput: {
    width:'80%',
    textAlign:'right',
    fontSize: 24,
    color: 'white',
    borderBottomColor:'white',
    borderBottomWidth: 1,
    marginHorizontal: 5,
  },
  TagInputRight: {
    flex: .1,
    marginTop: 5,
    justifyContent:'flex-start',
    justifyContent:'center',
  },
  TagScroll: {
    width:'100%',
    flex:.5,
  },
  TagListContainer: {
    marginHorizontal: '2%',
    flex:1,
    flexWrap: 'wrap',
    flexDirection:'row',
  },
  TagItem:{
    height: 25,
    padding: 3,
    flexDirection:'row',
    borderWidth:1,
    alignItems:'center',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius:5,

  },
  TagItemText:{
    fontSize: 16,
  }
})
export default DreamEntryTagForm;
