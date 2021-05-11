import React from 'react';
import {Text, View, Button} from 'react-native';

function GalleryScreen(props) {
  return(
    <View style={{flex:1, marginTop:30}}>
      <Text>This is GalleryScreen</Text>
      <Button title='Go to SnapScreen' onPress={ () => props.navigation.navigate('BottomNavigator', {screen: 'Snap'}) } />
    </View>
  )
}

export default GalleryScreen;