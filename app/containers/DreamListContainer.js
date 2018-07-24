import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, TouchableWithoutFeedback} from 'react-native';
import {NavigationActions} from 'react-navigation'
import PropTypes from 'prop-types'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as DreamActions from '../actions/DreamActions';
import * as AuthActions from '../actions/AuthActions';

import DreamList from '../components/DreamList/DreamList'

class DreamListContainer extends Component {
  constructor(props) {
    super(props)
    this._handleDreamEntry = this._handleDreamEntry.bind(this);
    this._handleToggleDelete = this._handleToggleDelete.bind(this)
    this.toggleAnimation = this.toggleAnimation.bind(this)
    this.deleteView = this.deleteView.bind(this)
    this.state = {
      isDelete: false,
      deleteViewWidth: new Animated.Value(30),
      deleteViewColor: new Animated.Value(0)
    }
  }

  /*
    Populate new dreams on login, do nothing on token login
  */
  componentWillMount() {
    if (this.props.dreams.shouldPopulate) {
      this.props.Dream.populateDreams()
    }
  }

  /*
    Navigate to Dream Entry with ID
  */
  _handleDreamEntry = (id) => {
    console.log("this is the id", id);
    this.props.navigation.navigate('DreamEntry', {dreamId: id})
  }

  /*
     toggle Deletion State and Call animation
  */
  _handleToggleDelete = () => {
    this.setState({
      isDelete: !this.state.isDelete
    })
    this.toggleAnimation()

  }
  /*
    Toggle deleteView animation
  */
  toggleAnimation = () => {
    let width,
      color;

    this.state.isDelete
      ? (width = 30, color = 0)
      : (width = 70, color = 1)

    Animated.parallel([
      Animated.timing(this.state.deleteViewColor, {toValue: color}),
      Animated.spring(this.state.deleteViewWidth, {
        duration: 700,
        toValue: width
      })
    ]).start()
  }

  deleteView = () => {
    const {isDelete} = this.state
    let result = null

    isDelete
      ? result = <Text style={[
            styles.deleteViewText, {
              color: 'white'
            }
          ]}>Cancel</Text>
      : result = <Text style={styles.deleteViewText}>
        -
      </Text>

    return (<TouchableWithoutFeedback onPress={this._handleToggleDelete}>
      <Animated.View style={[
          styles.deleteView, {
            width: this.state.deleteViewWidth,
            backgroundColor: this.state.deleteViewColor.interpolate({
              inputRange: [
                0, 1
              ],
              outputRange: ['#FF6C6C', '#585858']
            })
          }
        ]}>
        {result}
      </Animated.View>
    </TouchableWithoutFeedback>)
  }

  render() {
    return (<View style={styles.listContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Dreams
        </Text>

        {
          this.props.dreams.items.length
            ? this.deleteView()
            : null
        }
      </View>
      <DreamList isDelete={this.state.isDelete} deleteDream={(id) => {
          this.props.Dream.deleteDream(id)
        }}
        dreams={this.props.dreams.items}
        onDreamSelect={this._handleDreamEntry}
        isPopulating={this.props.dreams.isPopulating}
        populateDreams={this.props.Dream.populateDreams}/>
    </View>)
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: .9,
    width: '90%',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: .3
  },
  header: {
    flex: .15,
    // justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1
  },
  deleteView: {
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    position: 'relative',
    overflow: 'scroll',
    flexDirection: 'row',
    // justifyContent:'center',
    alignItems: 'center',
    height: 30
  },
  deleteViewText: {
    marginLeft: 5,
    textAlign: 'center',
    fontSize: 20
  },
  headerText: {
    marginLeft: 5,
    fontSize: 30,
    fontWeight: '800'
  }
})

function mapStateToProps(state) {
  return {dreams: state.dreams, user: state.user}
}

function mapDispatchToProps(dispatch) {
  return {
    Dream: bindActionCreators(DreamActions, dispatch),
    Auth: bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DreamListContainer);
