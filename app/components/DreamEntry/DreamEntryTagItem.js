import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class DreamEntryTagItem extends Component {
  constructor(props) {
    super(props);
    // this.deleteButton = this.deleteButton.bind(this)
    this.state = {
      tagRotation: new Animated.Value(0)
    }
  }

  /*
    Display delete button when entry isEditable
  */
  deleteButton = (isEditable) => {
    return (
      isEditable
      ? <View style={[styles.DeleteTagIcon, styles.circle]}>
        <Icon name="close" size={13}/></View>
      : <View></View>)
  }

  render() {
    const {color, isEditable, tag, scrollUp} = this.props

    return (<View style={[
        {
          backgroundColor: color
        },
        styles.TagItem
      ]}>
      <TouchableWithoutFeedback editable={isEditable} onPress={() => this.props.onDelete(tag)}>
        {this.deleteButton(isEditable)}
      </TouchableWithoutFeedback>

      <TextInput onFocus={() => scrollUp()} editable={isEditable} value={this.props.tag} onChangeText={(text) => this.props.onEdit(text)} style={styles.TagItemText}/>
    </View>);
  }
}
const styles = StyleSheet.create({
  TagItem: {
    width: '29%',
    height: 40,
    marginHorizontal: 6,
    marginBottom: 15,
    borderRadius: 3,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: .3,
    alignSelf: 'flex-start',
    justifyContent: 'center'
  },
  TagItemText: {
    fontSize: 16,
    textAlign: 'center'
  },
  DeleteTagIcon: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: '-10%',
    right: '-5%'
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: .9
  }
});
export default DreamEntryTagItem;
