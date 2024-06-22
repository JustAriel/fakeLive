import React,{ useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera } from 'expo-camera';
import Start from './components/Start';
import Live from './components/Live';
import Profile from './components/Profile';
import Privacy from './components/Privacy';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        console.log('Camera permission granted!');
      } else {
        console.log('Camera permission denied!');
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Live" component={Live} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Privacy" component={Privacy} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
