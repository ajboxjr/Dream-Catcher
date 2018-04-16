import React,{ Component } from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import {NavigationActions} from 'react-navigation'
import DreamList from 'components/DreamList'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as DreamActions from 'actions/DreamActions';
import * as AuthActions from 'actions/AuthActions';

class DreamListContainer extends Component{
  constructor(props){
    super(props)
    this._handleDreamEntry = this._handleDreamEntry.bind(this);
  }

  componentWillMount(){
    console.log(this.props.dreams);
    if (this.props.dreams.shouldPopulate){
      this.props.Dream.populateDreams()
    }
  }

  _handleDreamEntry = (id) => {
    console.log("this is the id",id);
    this.props.navigation.replace('DreamEntry', {dreamId: id})
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}> Dreams </Text>
          </View>
          {this.props.dreams.items ?
            <DreamList
            dreams={this.props.dreams.items}
            onDreamSelect={this._handleDreamEntry}
            isPopulating={this.props.dreams.isPopulating}
            populateDreams={this.props.Dream.populateDreams} /> :
          null}
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#3B4EE3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 3},

  },
  listContainer:{
    flex:.9,
    width: '90%',
    backgroundColor: 'white'
  },
  header:{
    flex: .15,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '800'
  },

})

function mapStateToProps(state){
  return {  dreams: state.dreams, user: state.user  }
}

function mapDispatchToProps(dispatch){
  return { Dream: bindActionCreators(DreamActions, dispatch),
          Auth: bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DreamListContainer);
