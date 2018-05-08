import React,{Component} from 'react'
import {Text, View, TouchableHighlight, StyleSheet, Image,Alert, Animated} from 'react-native'
import Bubble from '../components/Bubble'
class BubbleProfile extends Component {
  render(){
    let bubbleArr = [];
    for(var i =0; i < 5; i++){
      bubbleArr.push(<Bubble />)
    }
    return (
      <View style={styles.bubbleContainer}>
        <Bubble />
          <Bubble />
            <Bubble />
          <Bubble />
        <Bubble />
        <Bubble />
        <Bubble />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  bubbleContainer: {
    position:'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  }
})
export default BubbleProfile;
