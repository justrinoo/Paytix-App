import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import DetailMovie from '../screens/DetailMovie';
import Seats from '../screens/Seats';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={DetailMovie}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Seat"
        component={Seats}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
