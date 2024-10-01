import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './signin';
import SignUpScreen from './signup';
import HomeScreen from './home';
import MenuScreen from './menu'; // Importing the MenuScreen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen 
          name="SignIn" 
          component={SignInScreen} 
          options={{ headerShown: false }} // No header for SignIn screen
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{ headerShown: false }} // No header for SignUp screen
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} // No header for Home screen
        />
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen} 
          options={{ headerShown: true, title: 'Menu' }} // Header shown for Menu screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
