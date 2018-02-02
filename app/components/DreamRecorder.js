import React,{Component} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Animated, Text, TouchableWithoutFeedback, Vibration, StyleSheet} from 'react-native'


const DURATION = 10000
const PATTERN = [1000, 2000, 3000]

class DreamRecorder extends Component{
  constructor(props){
    super(props)
    this.state= {
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0)
    }

    this._handleMicPress = this._handleMicPress.bind(this)
  }

    _handleMicPress = () => {
      Vibration.vibrate(DURATION)
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.opacity, {
              duration: 600,
              toValue: .15
          }),
          Animated.timing(this.state.scale, {
              duration: 600,
              toValue: 80
          })
        ]),
        Animated.parallel([
          Animated.timing(this.state.opacity, {
              duration: 600,
              toValue: 0
          }),
          Animated.timing(this.state.scale, {
              duration: 600,
              toValue: 0
          })
        ])
      ]).start();
    }

  render(){
    return(
      <View style={{width: '100%', height: '100%', position: 'absolute'}}>
        <TouchableWithoutFeedback onPressIn={this._handleMicPress}>
          <View style={styles.RecordMicContainer}>
            <Animated.View style={[styles.circle, styles.innerCircle, { opacity: this.state.opacity, transform:[{scale: this.state.scale}]}]} />
            <Icon style={styles.RecordIcon} name='mic' size={50} color="black" />
            <Text style={styles.RecordText}> Long Tap To Record </Text>
          </View>
        </TouchableWithoutFeedback>
        <Text> </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  RecordMicContainer: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '40%',
    left: '40%',
    opacity: .3,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  RecordText: {
    textAlign: 'center',
    fontSize: 20,
  },
  circle: {
    position: 'relative',
    width:1,
    height: 1,
    backgroundColor: 'red',
    borderRadius: 2
  },
})
export default DreamRecorder;
