import React, {Component} from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
  Alert,
  Animated
} from 'react-native'

class Bubble extends Component {
  constructor(props) {
    super(props)
    this.getAnimationInitials = this.getAnimationInitials.bind(this)
    this.animateBubble = this.animateBubble.bind(this)
    this.state = {
      bubbleX: new Animated.Value((Math.random() * 2 + 4) * 10),
      bubbleY: new Animated.Value((Math.random() * 2 + 4) * 10),
      bubbledX: 1.6,
      bubbledY: 0,
      bubbleScale: new Animated.Value(1)
    }
  }

  /*
    Start Bubble Animation.
  */
  componentDidMount() {
    this.animateBubble(this.getAnimationInitials())
  }

  /*
    Randomly get destination x,y based on props their timing,
    start bubble position and delay
  */
  getAnimationInitials = () => {
    var {
      up,
      left
    } = this.props
    return {

      //Duration of movement in dirction
      t1: Math.random() * 5 + 5 * 1000,
      t2: Math.random() * 5 + 5 * 1000,

      //Position limit (0-100%) left right up down
      p1: up * 100 - Math.random() * 20,
      p2: left * 100 - Math.random() * 20,

      // Starting bubble position.
      x1: (Math.random() * 2 + 4) * 10,
      x2: (Math.random() * 2 + 4) * 10,

      delay: (Math.random() * 3) * 1000
    }
  }

  /*
    Animate bubble from starting position off the screen recusively
  */
  animateBubble = ({
    x1,
    x2,
    t1,
    t2,
    p1,
    p2,
    delay
  }) => {
    // console.log(delay);
    let scaleSpeed = Math.min(t1, t2);
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(this.state.bubbleX, {
          duration: t1,
          toValue: p1
        }),
        Animated.timing(this.state.bubbleY, {
          duration: t2,
          toValue: p2
        }),
        Animated.timing(this.state.bubbleScale, {
          duration: scaleSpeed,
          toValue: .5
        })
      ]),
      Animated.parallel([
        Animated.timing(this.state.bubbleX, {
          duration: 0,
          toValue: x1
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
    ]).start(() => {
      // console.log('animating.');
      this.animateBubble(this.getAnimationInitials())
    })
  }

  render() {
    return (<Animated.View style={[
        styles.bubble, {
          transform: [
            {
              scale: this.state.bubbleScale
            }
          ],
          left: this.state.bubbleX.interpolate({
            inputRange: [
              0, 100
            ],
            outputRange: ['-10%', '110%']
          }),
          top: this.state.bubbleY.interpolate({
            inputRange: [
              0, 100
            ],
            outputRange: ['-10%', '110%']
          })
        }
      ]}></Animated.View>)
  }
}
const styles = StyleSheet.create({
  bubble: {
    top: '50',
    width: 15,
    height: 15,
    zIndex: -1,
    borderRadius: 7.5,
    position: 'absolute',
    backgroundColor: 'white',
    top: '50%'
  }
})
export default Bubble;
