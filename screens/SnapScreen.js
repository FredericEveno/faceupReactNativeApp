import React from 'react';
import {Text, View, Button} from 'react-native';

function SnapScreen(props) {
  return(
    <View style={{flex:1, marginTop:30}}>
      <Text>This is SnapScreen</Text>
      <Button title='To GalleryScreen' 
            onPress={ () => props.navigation.navigate('BottomNavigator', {screen: 'Gallery'}) } />
    </View>
  )
}

export default SnapScreen;