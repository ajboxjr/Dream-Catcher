import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';

class LoginHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {isLogin} = this.props
    return (<View style={styles.authHeaderContainer}>

      <TouchableHighlight style={[
          styles.headerTouch, {
            opacity: isLogin
              ? 1
              : .2
          }
        ]} onPress={() => this.props.switchLogin(true)}>
        <View style={styles.loginHeaderContainer}>
          <Text style={styles.authHeader}>Login</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight style={[
          styles.headerTouch, {
            opacity: isLogin
              ? .2
              : 1
          }
        ]} onPress={() => this.props.switchLogin(false)}>
        <View style={styles.signUpHeaderContainer}>
          <Text style={styles.authHeader}>Sign Up</Text>
        </View>
      </TouchableHighlight>
    </View>)
  }
}

const styles = StyleSheet.create({
  authHeaderContainer: {
    flex: .2,
    flexDirection: 'row'
  },
  headerTouch: {
    flex: .5,
    justifyContent: 'center'
  },
  loginHeaderContainer: {
    borderBottomWidth: 3
  },
  signUpHeaderContainer: {
    borderBottomWidth: 3,
    borderBottomColor: 'white',
    alignItems: 'flex-end'
  },
  authHeader: {
    fontSize: 26
  }
});

export default LoginHeader
