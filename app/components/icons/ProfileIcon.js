import React from 'react'
import {View, StyleSheet, Image} from 'react-native'


class ProfileIcon extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View style={styles.IconContainer}>
       <Image style={styles.IconImage} source={require('assets/profile.png')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
IconContainer: {
    position: 'absolute',
    top: -20,
  },
  IconImage: {
    resizeMode: 'cover'
  }

})

export default ProfileIcon;
