import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Card, Badge} from 'react-native-elements';

import { connect } from 'react-redux';

const users = [
  {
     name: 'Bob',
     pic: require('../assets/picture-1.jpg'),
     gender: 'Male',
     age: '70 years',
     style: 'Barb',
     hair: 'Grey',
     smile: 'Happy'
  },
  {
    name: 'Cynthia',
    pic: require('../assets/picture-2.jpg'),
    gender: 'Female',
    age: '30 years',
    style: 'Glasses',
    hair: 'Brown',
    smile: 'Happy'
 },
 {
  name: 'Ali',
  pic: require('../assets/picture-3.jpg'),
  gender: 'Male',
  age: '30 years',
  style: 'Dandy',
  hair: 'Black',
  smile: 'Stoned'
},
{
 name: 'Nicole',
 pic: require('../assets/picture-4.jpg'),
 gender: 'Female',
 age: '60 years',
 style: 'Glasses',
 hair: 'Grey',
 smile: 'Happy'
}
 ]

let cardsList1 = users.map( (user, index) => {
    return (
      <Card key={index}>
        <Card.Image
          style={{width:'100%', height:150, marginBottom:10}}
          resizeMode="cover"
          source={ user.pic }
          >
          </Card.Image>
          <Badge value={user.name} status="success" />
          <Badge value={user.gender} status="success" />
          <Badge value={user.style} status="success" />
          <Badge value={user.hair} status="success" />
          <Badge value={user.age} status="success" />
          <Badge value={user.smile} status="success" />
      </Card>
    );
  })

function GalleryScreen(props) {

    console.log('props.imagesList : ', props.imagesList);
 
    let cardsList = props.imagesList.map((data, i) => {

      var badgeGlasses;
      if (data.glasses) {
        badgeGlasses = <Badge status="success" value="lunette" />
      }
      var badgeBeard;
      if (data.beard) {
        badgeBeard = <Badge status="success" value="barbe" />;
      }
      var badgeHappy;
      if (data.happy) {
        badgeHappy = <Badge status="success" value="joyeux" />;
      }
      var badgeHair;
      if (data.hairColor) {
        badgeHair = <Badge status="success" value={data.hairColor} />
      }
  
      return (
        <Card key={i}>
          <Card.Image
            style={{ width: '100%', height: 170, marginBottom: 10 }}
            source={{ uri: data.url }}
          />
          <Badge status="success" value={data.gender} />
          <Badge status="success" value={data.age} />
          {badgeGlasses}
          {badgeBeard}
          {badgeHappy}
          {badgeHair}
        </Card>
      );
    });

  return(
    
    <View style={{flex:1, marginTop:10}}>
      <Text style={{textAlign:'center', fontWeight:'bold', fontSize:20, marginBottom:10}}
      >
        {props.pseudo}'s Gallery
      </Text>

      <ScrollView>

        {cardsList1}

      </ScrollView>

    </View>

  )
}

function mapStateToProps (state) {
	return {imagesList: state.imageslist, pseudo: state.pseudo};
}

export default connect(mapStateToProps, null)(GalleryScreen)