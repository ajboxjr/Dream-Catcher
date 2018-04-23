import React,{Component} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Animated, Text, TouchableWithoutFeedback, Vibration, StyleSheet} from 'react-native'
import Voice from 'react-native-voice';
import {
  NativeModules,
  NativeEventEmitter,
  Platform,
} from 'react-native'

const DURATION = 10000
const PATTERN = [1000, 2000, 3000]

class DreamRecorder extends Component{
  constructor(props){
    super(props)
    this.state = {
      recognized: '',
      pitch: '',
      error: '',
      end: '',
      started: '',
      results: [],
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0)
    }

    animateMic = this.animateMic.bind(this)
    resetState = this.resetState.bind(this)
    this._stopRecording = this._stopRecording.bind(this)
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  resetState = () => {
    this.setState({
      recognized: false,
      pitch: '',
      error: '',
      started: false,
      results: [],
      end: false,
      shouldAnimate: false,
    });
  }

  animateMic = () =>{
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
    ]).start(() => {
      if(this.state.shouldAnimate == true){
          this.animateMic()
      }
    });
  }

  onSpeechStart(e) {
    this.props.setRecording(true);
    this.setState({
      started: true,
      shouldAnimate: true
    });
  }

  onSpeechRecognized(e) {
    this.setState({
      recognized: true,
    });
  }


  onSpeechEnd(e) {
    this.props.setRecording(false)
    this.props.clearRecording()
    this.setState({
      end: true,
      shouldAnimate: false
    });
  }

  onSpeechError(e) {
    this.setState({
      error: JSON.stringify(e.error),
    });
  }

  onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
    this.props.updateDreamText(e.value[0]);
  }

  _startRecording(e) {
      try {
        resetState();
        Voice.start('en-US');
        animateMic();
      } catch (e) {
        console.error(e);
    }
  }

  _destroyRecognizer(e) {
    console.log('destroying');
    try {
      Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    resetState();
  }

  _stopRecording(e) {
    const { recognized } = this.state
    try {
      if (recognized){
        Voice.stop();
      }
      else {
        Voice.cancel();
      }
    } catch (e){
      console.error(e);
    }
    resetState()
    Voice.destroy()
  }

  render(){
    return(
      <View style={{width: '100%', height: '100%', position: 'absolute'}}>
        <TouchableWithoutFeedback onPressIn={this._startRecording} onPressOut={this._stopRecording}>
          <View style={styles.RecordMicContainer}>
            <Animated.View style={[styles.circle, styles.innerCircle, { opacity: this.state.opacity, transform:[{scale: this.state.scale}] }]} />
            <Icon style={styles.RecordIcon} name='mic' size={50} color="black" />
            <Text style={styles.RecordText}>Press & Hold To Record</Text>
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
    top: 20,
    width:1,
    height: 1,
    backgroundColor: 'red',
    borderRadius: 2
  },
})
export default DreamRecorder;
