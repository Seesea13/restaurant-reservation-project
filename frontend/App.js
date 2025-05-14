import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantListScreen from './screens/RestaurantListScreen';
import CreateReservationScreen from './screens/CreateReservationScreen';
import MyReservationsScreen from './screens/MyReservationsScreen';
import AdminReservationsScreen from './screens/AdminReservationsScreen';
import CreateRestaurantScreen from './screens/CreateRestaurantScreen';
import EditRestaurantScreen from './screens/EditRestaurantScreen';

import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Restaurants" component={RestaurantListScreen} />
        <Stack.Screen name="CreateReservation" component={CreateReservationScreen} />
        <Stack.Screen
          name="MyReservations"
          component={MyReservationsScreen}
          options={{ title: 'My Reservations' }}
        />
        <Stack.Screen name="AdminReservations" component={AdminReservationsScreen} />
        <Stack.Screen name="CreateRestaurant" component={CreateRestaurantScreen} />
        <Stack.Screen name="EditRestaurant" component={EditRestaurantScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
