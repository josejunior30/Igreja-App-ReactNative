import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AuthStackParamList } from './navigationTypes';

import LoginScreen from '~/screens/Login';
import Welcome from '~/screens/Login/bem-vindo';

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AuthRoutes;
