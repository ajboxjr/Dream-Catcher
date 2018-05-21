import React,{ Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback, Animated } from 'react-native';
import { Colors } from '../../utils/utils'

class DreamItem extends Component{
  constructor(props){
    super(props)
    this.mapColorsToTags = this.mapColorsToTags.bind(this)
    this.deleteIcon = this.deleteIcon.bind(this)
    this.showDeleteButton = this.showDeleteButton.bind(this)
    this.hideDeleteButton = this.hideDeleteButton.bind(this)
    this.state = {
      deleteButtonScale: new Animated.Value(0),
      deleteButtonOpacity: new Animated.Value(0)
    }
  }
  componentDidUpdate(){
    if(this.props.isDelete){
      this.showDeleteButton()
    }
    else {
      this.hideDeleteButton()
    }
  }
  showDeleteButton = () => {
    console.log('showing'
    );
    Animated.parallel([
      Animated.spring(this.state.deleteButtonScale, {
        duration: 500,
        toValue: 1,
      }),
      Animated.timing(this.state.deleteButtonOpacity, {
        duration: 500,
        toValue: 1,
      })
    ]).start()
  }
  hideDeleteButton = () => {
    Animated.parallel([
      Animated.spring(this.state.deleteButtonScale, {
        duration: 600,
        toValue: 0,
      }),
      Animated.timing(this.state.deleteButtonOpacity, {
        duration: 600,
        toValue: 0,
      })
    ]).start()
  }
  deleteIcon = () => {
    if(this.props.isDelete){
      return (
        <TouchableWithoutFeedback onPress={() => this.props.onDelete(this.props.dream._id)}>
          <Animated.View style={[styles.deleteButtonContainer, { opacity: this.state.deleteButtonOpacity, transform: [{scale: this.state.deleteButtonScale}] }]}>
            <Image style={{resizeMode:'contain', width:'100%', height: '100%'}} source={require('../../assets/close_button_red.png')}/>
          </Animated.View>
        </TouchableWithoutFeedback>)
    }
    else {
      return;
    }
  }

  mapColorsToTags = () =>{
    const {tags} = this.props.dream
    const colors = Colors()
    // console.log(colors);
    return tags.map((tag,i) =>{ return [tag, colors[i]]})
  }


  render(){
    const ItemColors = ["#CF7474", "#2D9CDB", "#3ED67F", "#1FD2DE", "#12FF2A", "#EB5757", "#08FFE1", "#FF7E08"]
    const { _id, author, title, entry, tags, createdDate, lastEdited } = this.props.dream
    return (

        <View style={styles.DreamItem}>
          <TouchableWithoutFeedback style={{flex:1}} onPress={this.props.onTap}>
            <View style={styles.DreamItemContentContainer}>
              <View style={[styles.DreamItemTitleContainer, {borderWidth:1}]}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.DreamItemTitleText}>
                {title}
                </Text>
                {this.deleteIcon()}
              </View>

              <View style={styles.DreamItemEntryContainer}>
                <Text numberOfLines={4} ellipsizeMode='tail' style={styles.DreamItemEntryText}>
                {entry}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.DreamItemTagContainer}>
            <Image style={styles.DreamItemGutterImage} source={require('../../assets/tag_gutter.png')} />
            <ScrollView
              style={{flex:1}}
              horizontal={true}
              contentContainerStyle={{paddingVertical: '1%'}}
              onScroll={this.onscroll}>
              {
                this.mapColorsToTags().map((item, i)=> {
                  return (
                    <View key={i} style={ [styles.DreamItemTagItem, {backgroundColor: item[1]}] }>
                      <Text style={styles.DreamItemTagItemText}>
                        {item[0]}
                      </Text>
                    </View>)
                })}
            </ScrollView>
          </View>
        </View>


    )
  }
}
const styles = StyleSheet.create({
  DreamItem: {
    flex: 1,
    marginBottom: '3%',
    height: 225,
    width: '100%',
    backgroundColor: '#F6F6F6',
    shadowOpacity: .6,
    shadowOffset: {width: 0, height: 3},
  },
  DreamItemContentContainer:{
    flex: 1,
  },
  DreamItemTitleContainer: {
    flex: .2,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection:'row',
    paddingHorizontal: '2%',
    marginVertical:'2%'
  },
  DreamItemTitleText: {
    fontSize: 25,
    width: '90%',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  deleteButtonContainer: {
    width: 35,
    height: 35
  },
  DreamItemEntryContainer: {
    flex: .7,
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  DreamItemEntryText:{
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  DreamItemTagContainer:{
    position: 'relative',
    bottom: '10%',
    flex: .18,
    justifyContent: 'center',
    marginHorizontal: '2.2%'
  },
  DreamItemGutterImage :{
    flex:1,
    alignSelf: 'center',
    justifyContent:'center',
    position: 'absolute',
    resizeMode: 'stretch',
    width: '100%'
  },
  DreamItemTagList: {
    flex: 1,
    borderRadius: 3,
    width: null,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  DreamItemTagItem:{
    flex:1,
    width: 65,
    marginHorizontal: 2,
    overflow: 'hidden',
    borderRadius: 2,
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: .6,
  },
  DreamItemTagItemText:{
    textAlign: 'center'
  }
})
export default DreamItem;
