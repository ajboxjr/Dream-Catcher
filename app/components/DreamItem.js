import React,{ Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';

class DreamItem extends Component{
  constructor(props){
    super(props)
    this._singlePage = this._singlePage.bind(this)

  }

  _singlePage(){
    this.props.onTap()
  }


  render(){
    const ItemColors = ["#CF7474", "#2D9CDB", "#EBB617", "#3ED67F", "#1FD2DE"]
    const { _id, author, title, entry, tags, createdDate, lastEdited } = this.props.dream
    return (

        <View style={styles.DreamItem}>
          <TouchableWithoutFeedback style={{flex:1}} onPress={this._singlePage}>
            <View style={styles.DreamItemContentContainer}>
              <View style={styles.DreamItemTitleContainer}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.DreamItemTitleText}>
                {title}
                </Text>
              </View>

              <View style={styles.DreamItemEntryContainer}>
                <Text numberOfLines={4} ellipsizeMode='tail' style={styles.DreamItemEntryText}>
                {entry}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.DreamItemTagContainer}>
            <Image style={styles.DreamItemGutterImage} source={require('assets/tag_gutter.png')} />
            <ScrollView
              style={{flex:1}}
              horizontal={true}
              contentContainerStyle={{paddingVertical: '1%'}}
              onScroll={this.onscroll}>
              {tags.map((tag, i)=> {
                return (
                  <View  key={i} style={ [styles.DreamItemTagItem, {backgroundColor: ItemColors[i]}] }>
                    <Text style={styles.DreamItemTagItemText}>
                      {tag}
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
    backgroundColor: '#F2F2F2',
    shadowOpacity: .6,
    shadowOffset: {width: 0, height: 3},
  },
  DreamItemContentContainer:{
    flex: 1,
  },
  DreamItemTitleContainer: {
    flex: .2,
    width: '100%',
    justifyContent: 'center',
    paddingLeft: '2%',
    marginVertical:'2%'
  },
  DreamItemTitleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
    resizeMode: 'cover',
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