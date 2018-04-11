import React from 'react'
import {View, StyleSheet, Image} from 'react-native'


class NewDreamIcon extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View style={styles.IconContainer}>
       <Image style={styles.IconImage} source={require("assets/new_dream.png")} />
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
    resizeMode: 'contain',
  }

})

export default NewDreamIcon;
