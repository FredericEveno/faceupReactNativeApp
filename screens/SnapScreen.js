import React from 'react';
import {Text, View, Button} from 'react-native';

function SnapScreen(props) {
  return(
    <View>
      <Text>SnapScreen</Text>
      <Button title='To GaleryScreen' onPress={ () => props.navigation.navigate('GaleryScreen') } />
    </View>
  )
}

export default SnapScreen;