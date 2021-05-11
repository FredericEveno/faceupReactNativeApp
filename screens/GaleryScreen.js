import React from 'react';
import {Text, View, Button} from 'react-native';

function GaleryScreen(props) {
  return(
    <View>
      <Text>GaleryScreen</Text>
      <Button title='Back to HomeScreen' onPress={ () => props.navigation.navigate('HomeScreen') } />
    </View>
  )
}

export default GaleryScreen;