import { Assets } from '@react-navigation/stack';
import React from 'react';
import {Text, View, Button, ImageBackground} from 'react-native';

const background = require('../assets/home.jpg')

function HomeScreen(props) {
  return(
    <ImageBackground
      source={background}
      style={{flex:1, justifyContent:'center', alignItems:'center'}}
    >
      <Text>This is HomeScreen</Text>
      <Button title='Go to gallery'
          onPress={ () => props.navigation.navigate('BottomNavigator', {screen: 'GalleryScreen'}) } />
    </ImageBackground>
  )
}

export default HomeScreen;