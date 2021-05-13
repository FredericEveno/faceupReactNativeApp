import React, { useState } from 'react';
import {Text, View, Button, ImageBackground} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';

const background = require('../assets/home.jpg')

function HomeScreen(props) {

  const [pseudo, setPseudo] = useState('');

  return(
    <ImageBackground
      source={background}
      style={{flex:1, justifyContent:'center', alignItems:'center'}}
    >

      <Input
        placeholder="Type your pseudo"
        containerStyle = {{marginBottom: 25, width: '70%'}}
        inputStyle={{marginLeft: 10}}
        leftIcon={<Icon
          name='person'
          style={{marginLeft:10}}
          size={24}
          color='#009788'
        />}
        value={pseudo}
        onChangeText={ (text) => setPseudo(text) }
      />

      <Button 
        title='Go to gallery'
        color="#009788"
        onPress={ () => {props.onSubmitPseudo(pseudo); props.navigation.navigate('BottomNavigator', {screen: 'Gallery'})}}
      />

    </ImageBackground>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitPseudo: function(pseudo) { 
      dispatch( {type: 'savePseudo', pseudo: pseudo }) 
    }
  }
}

export default connect(null, mapDispatchToProps) (HomeScreen);