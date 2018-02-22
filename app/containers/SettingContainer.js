import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

class SettingContainer extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View style={styles.Container}>
        <View style={styles.SettingHeaderContainer}>
          <Icon name="arrow-back" size={25}/>
          <Text style={styles.SettingsHeader}>Settings</Text>
        </View>
        <View style={styles.SettingContainer}>
        <View style={styles.SettingItemContainer}>
          <View style={styles.SettingItem}>
            <Text> User Settings</Text>
          </View>
        </View>
        <View style={styles.SettingItemContainer}>
          <View style={styles.SettingItemHeader}>
            <Text style={styles.SettingItemHeaderText}> Social </Text>
          </View>
          <View style={styles.SettingItem}>
            <Image style={styles.GoogleIcon} source={require('assets/Google_Icon.png')} />
          </View>
        </View>

        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  Container:{
    flex:.9,
    backgroundColor: "white",
    width: '90%',
    alignItems:'center'
  },
  SettingHeaderContainer:{
    flex:.1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  SettingsHeader:{
    fontSize: 24,
    fontWeight: '600',
  },
  SettingItemHeaderText:{
    fontSize: 24,
    textDecorationLine: 'underline'
  },
  SettingContainer:{
    flex: .9,
    width: '100%',
    borderWidth:1,
  },
  SettingItem:{
    height: 50,
    backgroundColor: '#E0e0e0',
    marginBottom: 20,
  },
  GoogleIcon: {
    justifyContent:'center',
    height: 30,
    width: 30,
  }

})

export default SettingContainer;
