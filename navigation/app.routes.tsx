/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import Inicio from '~/screens/Inicio';


const Stack = createStackNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#1d1d2e" style="light" translucent={false} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Inicio" component={Inicio}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}