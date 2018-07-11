import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback} from 'react-native';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    //Profile Content
    this.totalTags = this.totalTags.bind(this)

  }

  /*
    Return accumlative dream tags
  */
  totalTags = () => {
    const {dreams} = this.props
    let tagArr = []
    dreams.forEach((dream) => {
      dream.tags.forEach((tag) => {
        tagArr.push(tag)
      })
    })
    return tagArr.length
  }

  render() {
    const {_id, dreamCount, dreams} = this.props
    return (<View style={styles.profileInfoContainer}>
      <View style={styles.profileUsernameContainer}>
        <Text style={styles.username}>{_id}</Text>
      </View>

      <View style={styles.profileInnerContainer}>
        <View style={styles.profileItem}>
          <Text>Dreams</Text>
          <Text>{this.props.dreams.length}</Text>
        </View>

        <View style={styles.profileItem}>
          <Text>Tags</Text>
          <Text>{this.totalTags()}</Text>
        </View>
      </View>

      <TouchableHighlight style={styles.logoutButton} onPress={this.props.onLogout}>
        <View>
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </View>
      </TouchableHighlight>
    </View>)
  }
}
const styles = StyleSheet.create({
  profileInfoContainer: {
    flex: .7,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 1,
    width: '100%'
  },
  profileUsernameContainer: {
    position: 'absolute',
    backgroundColor: '#373737',
    top: '-4%',
    width: 200,
    height: 50,
    opacity: .95,
    justifyContent: 'center',
    borderRadius: 4
  },
  username: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  profileInnerContainer: {
    width: '100%',
    justifyContent: 'center'
  },
  profileItem: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D1D1CD',
    width: '105%',
    height: '22%',
    paddingHorizontal: '5%',
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: .4
  },
  logoutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '12%',
    backgroundColor: '#EB5C87',
    borderRadius: 3,
    shadowOffset: {
      width: 2,
      height: 3
    },
    shadowOpacity: .4
  },
  logoutText: {
    fontSize: 30,
    color: 'white'

  }
});
export default UserInfo
