import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, ScrollView} from 'react-native';
import { Actions as RouteActions } from 'react-native-router-flux';
import {NavigationActions} from 'react-navigation'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DreamActions from 'actions/DreamActions';

import NewDreamForm from 'components/NewDreamForm';

class NewDreamContainer extends Component{
  constructor(props){
    super(props)
    this._handleDream = this._handleDream.bind(this)
  }
  componentWillMount(){
  }
  _handleDream = (title , entry, tags) => {
    if (title !== "" && entry !== ""){
      console.log('asdf');
      this.props.navigation.dispatch(NavigationActions.navigate({
         routeName:'Login',
         params:{}
       }))
      // this.props.Dream.createDream(title, entry, tags)
    }
  }

  render(){

    return(
      <View style={styles.newDreamContainer}>
          <NewDreamForm onDream={this._handleDream}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
