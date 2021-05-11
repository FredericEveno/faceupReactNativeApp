import React from 'react';
import {Text, View, Button} from 'react-native';

function HomeScreen(props) {
  return(
    <View>
      <Text>HomeScreen</Text>
      <Button title='To SnapScreen' onPress={ () => props.navigation.navigate('SnapScreen') } />
    </View>
  )
}

export default HomeScreen;