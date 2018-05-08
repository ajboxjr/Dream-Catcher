import React,{Component} from 'react'
import {Text, View, TouchableHighlight, StyleSheet, Image,Alert, Animated} from 'react-native'


class Bubble extends Component {
  constructor(props){
    super(props)
    this.animateBubble = this.animateBubble.bind(this)
    this.getAnimationInitials = this.getAnimationInitials.bind(this)
    this.getSign = this.getSign.bind(this)
    this.state = {
      bubbleX: new Animated.Value(50),
      bubbleY: new Animated.Value(50),
      bubbledX: 1.6,
      bubbledY: 0,
      bubbleScale: new Animated.Value(1),

    }
  }

  componentWillMount(){
    this.setState({bubbledX: 50, bubbledY: 50})
  }

  componentDidUpdate(){
    this.animateBubble(this.getAnimationInitials())
  }
  getSign = (number) => {
    var plusOrMinus = [-1,1][Math.random()*2|0]
      console.log(plusOrMinus * number);
      return plusOrMinus * number;
  }

  getAnimationInitials = () => {
    return {
      t1: Math.random()*9+1 * 10000,
      t2: Math.random()*9+1 * 10000,
      v1: this.getSign(150),
      v2: this.getSign(150),
      x1: Math.random()*2+4 * 10,
      x2: Math.random()*2+4 *10,
    }
  }

  //change duration from
  //Y 40-60
  //X 40-60
  //two random times
  //timing 90000-1000000

  animateBubble = ({x1, x2, t1, t2, v1,v2}) => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.bubbleX,{
          duration: t1,
          toValue: v1
        }),
        Animated.timing(this.state.bubbleY, {
          duration: t2,
          toValue: v2
        }),
        Animated.timing(this.state.bubbleScale,{
          duration: 10000,
          toValue: .3
        }),
      ]),
    Animated.parallel([
      Animated.timing(this.state.bubbleX, {
        duration: 0,
        toValue: x1,
      }),
      Animated.timing(this.state.bubbleY, {
        duration: 0,
        toValue: x2
      }),
      Animated.timing(this.state.bubbleScale, {
        duration: 0,
        toValue: 1
      })
      ])
    ]).start(()=>{
      this.animateBubble(this.getAnimationInitials())
    })
  }
  render(){

    return (
      <Animated.View style={[styles.bubble , { transform:[{scale: this.state.bubbleScale}], left: this.state.bubbleX.interpolate({
        inputRange: [-150,150],
        outputRange: ['-150%', '150%']
      }),
      top: this.state.bubbleY.interpolate({
        inputRange: [-100,100],
        outputRange: ['-105%', '105%']
      })
    }]}>
      </Animated.View>
    )
  }
}
const styles = StyleSheet.create({
  bubble: {
    // left: '90%',
    top: '50',
    width: 10,
    height: 10,
    zIndex: -1,
    borderRadius: 5,
    position:'absolute',
    backgroundColor: 'white',
    top: '50%',
  }
})
export default Bubble;
