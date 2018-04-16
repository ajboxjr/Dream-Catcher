import React, { Component} from 'react'
import { Modal, View, TouchableWithoutFeedback, Text, TextInput, StyleSheet } from 'react-native'


class DeleteAccountModal extends Component {
    constructor(props){
      super(props)
      this.state={
        password: '',
      }
    }
  render(){
    return (
      <View>
      <Modal transparent={true}
      visible={this.props.visible}
      onRequestClose={this.closeModal}>
        <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        borderWidth:1,
        shadowOffset:{width: 3,height: 4},
        shadowOpacity: .2,
        alignItems: 'center'}}>
          <View style={{
          backgroundColor: 'white',
          borderRadius: 10,
          width: 300,
          height: 230}}>
          <TouchableWithoutFeedback onPress={()=> this.props.onClose()}>
            <View style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>X</Text>
            </View>
          </TouchableWithoutFeedback>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}> Are you sure you want to remove your accout?</Text>
              <Text style={styles.modalSubText}> It's permanent... </Text>
                {this.props.error ?
                  <Text style={styles.modalErr}>...{this.props.error}</Text>
                  :null}
            </View>
            <View style={styles.modalContent}>
              <View style={styles.removeForm}>
                <Text style={styles.removeFormHeader}> Input your Password to continue</Text>
                <TextInput secureTextEntry={true} onChangeText={(text) => this.setState({password: text})} value={this.state.password} style={styles.passwordInput} placeholder="password"/>
                <TouchableWithoutFeedback onPress={() => this.props.onDelete(this.state.password)}>
                  <View style={styles.submitButton}>
                    <Text style={styles.submitButtonText}> Confirm </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  deleteButton: {
    position:'absolute',
    right: -10,
    top: -10,
    width:30,
    height: 30,
    borderRadius: 100,
    borderWidth:1,
    backgroundColor: 'black',
    justifyContent:'center'
  },
  deleteButtonText:{
    textAlign:'center',
    color: 'white',
    fontWeight: "900",
  },
  modalHeader:{
    flex:.3,
  },
  modalHeaderText:{
    textAlign:'center',
    fontSize: 24,
  },
  modalSubText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'rgba(0,0,0,.8)',
  },
  modalErr:{
    textAlign: 'right',
    marginRight: 10,
    fontSize: 13,
  },
  modalContent: {
    flex:.7,
    justifyContent:'center',
    alignItems:'center',
  },
  removeForm: {
    width: "90%",
    height:"70%",
    borderWidth:1,
    alignItems: 'center',
    justifyContent:'space-between'
  },
  removeFormHeader: {
    fontSize: 18,
    textAlign: 'center',
  },
  passwordInput:{
    backgroundColor: "#EFEFEF",
    width: "90%",
    textAlign:'center',
    fontSize: 16,
    height: 35,
    borderRadius: 5,
  },
  submitButton: {
    borderWidth:1,
    width: 100,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#272932',
    justifyContent:'center',
    alignItems:'center'
  },
  submitButtonText: {
    fontSize: 16,
    color: "#E7ECEF"
  }



})
export default DeleteAccountModal;
