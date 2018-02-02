import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, ScrollView} from 'react-native';
import { Actions as RouteActions } from 'react-native-router-flux';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DreamActions from 'actions/DreamActions';

import NewDreamForm from 'components/NewDreamForm';

class NewDreamContainer extends Component{
  constructor(props){
    super(props)
    this._handleDream = this._handleDream.bind(this)
  }

  _handleDream = (title , entry, tags) => {
    if (title !== "" && entry !== ""){
      this.props.Dream.createDream(title, entry, tags)
    }
  }

  render(){

    return(
      <View style={styles.newDreamContainer}>
        <View style={styles.newDreamHeader}>
          <Text style={styles.newDreamHeaderText}> New Dream </Text>
        </View>
          <NewDreamForm onDream={this._handleDream}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Header: {
    backgroundColor: 'red',
    borderWidth: 1,
  },
  newDreamHeader: {
    position: 'absolute',
    top: '-4%',
    left: '1%',
    backgroundColor: '#3ED67F',
    padding: '2%',
    borderRadius: 4,
    justifyContent: 'center',
  },
  newDreamHeaderText: {
    textAlign: 'center'
  },
  newDreamContainer: {
    flex: .9,
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#FFFAFA',
    width: null,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: .3,
  },
})


function mapDispatchToProps(dispatch){
  return { Dream: bindActionCreators(DreamActions, dispatch) }
}
function mapStateToProps(state){
  return { user: state.user }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewDreamContainer);
//export default NewDreamContainer;
