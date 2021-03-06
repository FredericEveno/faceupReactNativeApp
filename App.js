// desactivation des warnings
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

import HomeScreen from './screens/HomeScreen';
import SnapScreen from './screens/SnapScreen';
import GalleryScreen from './screens/GalleryScreen';

import imageslist from './reducers/imageslist'
import pseudo from './reducers/pseudo';

const store = createStore(combineReducers({imageslist, pseudo}));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: '#111224',
      inactiveBackgroundColor: '#111224',
      activeTintColor: '#009788',
      inactiveTintColor: 'white',
    }}
    
    screenOptions={ ({ route }) => ({

      tabBarIcon: ({ color }) => {
        let iconName;

        if (route.name === 'Snap') {
          iconName = 'camera';
        } else if (route.name === 'Gallery') {
          iconName = 'images';
        } 

        return <Ionicons name={iconName} size={24} color={color} />;

      }

    }) }

    >
      <Tab.Screen name="Gallery" component={GalleryScreen} />
      <Tab.Screen name="Snap" component={SnapScreen} />
    </Tab.Navigator>
  )}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown: true}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
