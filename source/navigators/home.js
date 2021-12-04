import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import DetailMovie from '../screens/DetailMovie';
import Seats from '../screens/Seats';
import Payment from '../screens/Payment';
import Ticket from '../screens/Ticket';
import Profile from '../screens/Profile';

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
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Ticket"
        component={Ticket}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
