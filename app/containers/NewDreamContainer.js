import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollViewn} from 'react-native';
import {NavigationActions} from 'react-navigation'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as DreamActions from '../actions/DreamActions';

import NewDreamForm from '../components/NewDream/NewDreamForm';

class NewDreamContainer extends Component {
  constructor(props) {
    super(props)
    this._handleDream = this._handleDream.bind(this)
  }

  /*
    Dispatch create Dream
  */
  _handleDream = (title, entry, tags) => {
    this.props.Dream.createDream(title, entry, tags)
  }

  render() {

    return (<View style={styles.newDreamContainer}>
      <NewDreamForm isAuthenticating={this.props.user.isAuthenticating} onDream={this._handleDream}/>
    </View>)
  }
}

const styles = StyleSheet.create({
  newDreamContainer: {
    flex: .9,
    marginHorizontal: 16,
    backgroundColor: 'white',
    width: '90%',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: .3
  }
})

function mapDispatchToProps(dispatch) {
  return {
    Dream: bindActionCreators(DreamActions, dispatch)
  }
}
function mapStateToProps(state) {
  return {user: state.user, dreams: state.dreams}
}
export default connect(mapStateToProps, mapDispatchToProps)(NewDreamContainer);
