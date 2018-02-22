import React,{ Component } from 'react'
import { Text, InputField, TextInput, View, ScrollView, Image, StyleSheet, TouchableWithoutFeedback, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions as RouteActions } from 'react-native-router-flux';
import DreamEntryForm from 'components/DreamEntryForm'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as DreamActions from 'actions/DreamActions';
import * as AuthActions from 'actions/AuthActions';

class DreamEntryContainer extends Component{
  constructor(props){
    super(props)
    this._handleEntryDelete = this._handleEntryDelete.bind(this)
    this._handleEditSubmit = this._handleEditSubmit.bind(this)
  }

  _handleEntryDelete(){
    const { title, _id } = this.props.dream
    Alert.alert(
      'Are you sure you want to delete:',
      title,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Delete', onPress: () => {
          this.props.Dream.deleteDream(_id)
        },}
      ],
      { cancelable: false }
    )
  }

  _handleEditSubmit(title, entry, tags){
    const {_id} = this.props.dream
    if(this.props.dream.title !== title ||  this.props.dream.tags !== tags || this.props.dream.entry !== entry){
      this.props.Dream.editDream(_id, title, entry, tags)
      // TODO: Have async routing...
      // RouteActions.tab2_scene2({dreamId:_id})
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <DreamEntryForm dream={this.props.dream}
        onEdit={this._handleEditSubmit}
        onDeleteEntry={this._handleEntryDelete} />
      </View>
    )
  }
}
DreamEntryContainer.defaultProps ={
  dream: {
    _id: 'asdfb0a0639231asdf92136',
    author: 'ads243qsawer',
    title:"i like tomoatoes",
    entry: 'This is where we will put and entry.',
    tags:['green', 'underwear', 'thisle','hammer','waterhole'],
    createdDate:'2018-02-01T11:41:48.865Z',
    lastEdited:'2018-02-02T02:08:50.511Z'
  }
}

const styles = StyleSheet.create({
  container: {
    flex: .9,
    width: "90%",
    backgroundColor: 'white',
  },
})

function mapStateToProps(state,ownProps){
  return { user: state.user,
    dream: state.dreams.items.filter((dream) => {
     return dream._id === ownProps.dreamId})[0]
   }
}

function mapDispatchToProps(dispatch){
  return { Dream: bindActionCreators(DreamActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(DreamEntryContainer);
// export default DreamEntryContainer;
