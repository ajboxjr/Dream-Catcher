import React,{ Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';

import DreamList from 'components/DreamList'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as DreamActions from 'actions/DreamActions';
import * as AuthActions from 'actions/AuthActions';

class DreamListContainer extends Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.Dream.populateDreams()
  }
  componentDidMount(){
    console.log(this.props.dreams)
  }


  render(){
    return(
      <View style={styles.container}>
        <View style={styles.ListContainer}>
          <View style={styles.Header}>
            <Text style={styles.HeaderText}> Dreams </Text>
          </View>
          {this.props.dreams ?
            <DreamList dreams={this.props.dreams.items} /> :
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
    alignItems: 'center'
  },
  ListContainer:{
    flex:.9,
    width: '90%',
    backgroundColor: 'white',
  },
  Header:{
    flex: .15,
    justifyContent: 'center',
  },
  HeaderText: {
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
