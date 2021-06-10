import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {Text, View, TouchableOpacity} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';


function CameraFocus(props) {

  const [type, setType] = useState(Camera.Constants.Type.front);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [visible, setVisible] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('not yet ...');

  var cameraRef = useRef(null);

  useEffect( () => {

    return () => { console.log("Component Camera is destroyed") } ;
    
  }, [] );

  return(

    <View style={{flex:1}}>

      <Overlay isVisible={visible}  width='auto' height='auto'>
        <Text>{loadingMessage}</Text>
      </Overlay>

      <Camera style={{flex:1, marginTop:30}} 
              type={type} 
              flashMode={flash} 
              ref={ref => (cameraRef = ref)}
      >

        <View    
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>

          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
          <Icon
            name='camera-reverse-outline'
            style={{marginRight:10}}
            size={24}
            color='white'
          />
          <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.torch
                    ? Camera.Constants.FlashMode.off
                    : Camera.Constants.FlashMode.torch
                );
              }}
            >
              <Icon
                name='flash-outline'
                style={{marginRight:10}}
                size={24}
                color='white'
              />
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flash </Text>
            </TouchableOpacity>

          </View>

          <Button
            icon={<Icon
              name='save-outline'
              style={{marginRight:10}}
              size={24}
              color='white'
            />}
            title='Snap'
            buttonStyle={{backgroundColor:"#009788"}}
            onPress={async () => {
              setLoadingMessage('Image is uploading...');
              setVisible(true);
              if (cameraRef) {
                let photo = await cameraRef.takePictureAsync({
                  quality : 0.7,
                  base64: true,
                  exif: true
                });
                console.log('photo.uri : ', photo.uri);
                // console.log(photo.width);  
                // console.log(photo.height);
                // console.log(photo.exif);
                // console.log(photo.base64);

                var imageData = new FormData();
                imageData.append('image', {
                  uri: photo.uri,
                  type: 'image/jpeg',
                  name: 'userPicture.jpeg'
                });
                var backendResponse = await fetch("http://192.168.0.155:3000/upload", {
                method: 'post',
                body: imageData
                })

                var responseToJson = await backendResponse.json();

                console.log('responseToJson : ', responseToJson)
                console.log('responseToJson.url : ', responseToJson.url)

                if (responseToJson.result) {
                  setLoadingMessage('OK !');
                  props.addImageToList(responseToJson.url); 
                  /* je récupère ma props addImageToList fournie par le parent SnapScreen, 
                  à travers le composant <CameraFocus>*/
                  setVisible(false);
                } else {
                  setLoadingMessage('NOK !');
                  setVisible(false);
                }

              }
            }}
          />

      </Camera>

    </View>
    
  )
}

function SnapScreen(props) {

  const [hasPermission, setHasPermission] = useState(false);

  const isFocused = useIsFocused();
  console.log('isFocused', isFocused);
  console.log('hasPermission', hasPermission);

  useEffect( () => {

    (async () => {
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted')
    })(); // fonction auto-appelante

  }, [] );

  var CameraIfFocused;
  if (isFocused) {
    
    CameraIfFocused = <CameraFocus addImageToList={props.storeImagesList}/>; 
    /* On envoie la props au composant enfant CameraFocus, 
    qui contient l'Url de l'image dans le bouton */
  }

  if (hasPermission) {
    return(

      <View style={{ flex: 1 }}>

        {CameraIfFocused}

      </View>
      
    )
  } else {
    return (

    <View style={{ flex: 1, justifyContent:'center', alignItems:'center' }}>

      <Text>Loading ... (or not)</Text>

    </View>

    )
  }

}

function mapDispatchToProps(dispatch) {
  return {
    storeImagesList: function (url) {
      console.log('coucou !')
      console.log('redux#2 url : ', url);
      dispatch( {type: 'addUrl', url: url} )
    }
  }
}

export default connect(null, mapDispatchToProps)(SnapScreen);