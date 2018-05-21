import React,{Component} from 'react'
import {Text, View, TouchableHighlight, StyleSheet, Image,Alert, Animated} from 'react-native'
import Bubble from './Bubble'
class BubbleProfile extends Component {
  constructor(props){
    super(props)
    this.fuzzyBorder = this.fuzzyBorder.bind(this)
    this.initBubbles = this.initBubbles.bind(this)
    this.state = {
      bubblePropsArr: [],
      circleOpacity: new Animated.Value(0),
      circleBorder: new Animated.Value(1)
    }
  }

  componentWillMount(){
    this.fuzzyBorder()
  }

  componentDidMount(){
    this.setState({ bubblePropsArr: this.initBubbles(20) })
  }

  initBubbles = (count) => {
    //Will be multiplied by bubble x/y pos for up/bott/left/right movement
    var propsArr = [];

    var bubbleProps = [{
        left: 0,
        up: 1
      },{
        left: 1,
        up: 1
      },{
        left: 1,
        up: -0
      },{
        left: 0,
        up: 0
      }];

    for( var i=0; i<count; i++ ){
      propsArr.push(bubbleProps[i%4])
    }
    return propsArr
  }


  fuzzyBorder =  () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.circleOpacity,{
          duration: 2000,
          toValue: 1
        }),
        Animated.timing(this.state.circleBorder, {
          duration: 2000,
          toValue: 1.09
        })
      ]),
      Animated.parallel([
        Animated.timing(this.state.circleOpacity, {
          duration: 2000,
          toValue: 0
        }),
        Animated.timing(this.state.circleBorder, {
          duration: 2000,
          toValue:1
        })
      ])
    ]).start(()=>{
      this.fuzzyBorder()
    })
}

  render(){
    return (
      <View style={styles.bubbleContainer}>
        <Animated.View style={[this.props.getDimensions(10), styles.profileCircle ,{ transform: [{scale:this.state.circleBorder}] }]} />
         {this.state.bubblePropsArr.map((item, i)=> {
           return ( <Bubble key={i} left={item.left} up={item.up} />)
         })}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  bubbleContainer: {
    position:'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  profileCircle: {
    // backgroundColor: '#FFFFFF',
    borderWidth:1,
    justifyContent: 'center',
    alignItems:'center',
    shadowOffset: {width: 0, height: 0},
    borderColor: '#FFFFFF'
  },
})
export default BubbleProfile;
